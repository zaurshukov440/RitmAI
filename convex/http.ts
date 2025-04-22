import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const http = httpRouter();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("No svix headers found", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      const email = email_addresses[0].email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.log("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

    return new Response("Webhooks processed successfully", { status: 200 });
  }),
});

// validate and fix workout plan to ensure it has proper numeric types
function validateWorkoutPlan(plan: any) {
  const validatedPlan = {
    schedule: plan.schedule,
    exercises: plan.exercises.map((exercise: any) => ({
      day: exercise.day,
      routines: exercise.routines.map((routine: any) => ({
        name: routine.name,
        sets: typeof routine.sets === "number" ? routine.sets : parseInt(routine.sets) || 1,
        reps: typeof routine.reps === "number" ? routine.reps : parseInt(routine.reps) || 10,
      })),
    })),
  };
  return validatedPlan;
}

// validate diet plan to ensure it strictly follows schema
function validateDietPlan(plan: any) {
  // only keep the fields we want
  const validatedPlan = {
    dailyCalories: plan.dailyCalories,
    meals: plan.meals.map((meal: any) => ({
      name: meal.name,
      foods: meal.foods,
    })),
  };
  return validatedPlan;
}

http.route({
  path: "/vapi/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const payload = await request.json();

      const {
        user_id,
        age,
        height,
        weight,
        injuries,
        workout_days,
        fitness_goal,
        fitness_level,
        dietary_restrictions,
      } = payload;

      console.log("Payload is here:", payload);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-001",
        generationConfig: {
          temperature: 0.4, // lower temperature for more predictable outputs
          topP: 0.9,
          responseMimeType: "application/json",
        },
      });

      const workoutPrompt = `Вы - опытный фитнес-тренер, создающий персонализированный план тренировок на основе:
Возраст: ${age}
Рост: ${height}
Вес: ${weight}
Травмы или ограничения: ${injuries}
Доступные дни для тренировок: ${workout_days}
Фитнес-цель: ${fitness_goal}
Уровень подготовки: ${fitness_level}

Как профессиональный тренер:
- Учитывайте разделение мышечных групп, чтобы избежать перетренированности одних и тех же мышц в последовательные дни
- Разрабатывайте упражнения, соответствующие уровню подготовки и учитывающие любые травмы
- Структурируйте тренировки для достижения конкретной фитнес-цели пользователя
- ОБЯЗАТЕЛЬНО указывайте рекомендуемый вес для каждого упражнения (кг). Для новичков вес должен быть ниже, а для опытных - выше
- Правильно называйте упражнения, включая рабочий вес, например: "Жим штанги лежа (60 кг)", "Приседания со штангой (70 кг)"

ВАЖНЫЕ ИНСТРУКЦИИ ПО СХЕМЕ:
- Ваш вывод ДОЛЖЕН содержать ТОЛЬКО указанные ниже поля, БЕЗ ДОПОЛНИТЕЛЬНЫХ ПОЛЕЙ
- "sets" и "reps" ВСЕГДА должны быть ЧИСЛАМИ, а не строками
- Например: "sets": 3, "reps": 10
- НЕ используйте текст типа "reps": "Сколько сможете" или "reps": "До отказа"
- Вместо этого используйте конкретные числа, например "reps": 12 или "reps": 15
- Для кардио используйте "sets": 1, "reps": 1 или другое подходящее число
- НИКОГДА не включайте строки для числовых полей
- НИКОГДА не добавляйте дополнительные поля, не показанные в примере ниже
- В поле "name" ОБЯЗАТЕЛЬНО включайте рекомендуемый вес для каждого упражнения

Верните JSON-объект с ТОЧНО такой структурой:
{
  "schedule": ["Понедельник", "Среда", "Пятница"],
  "exercises": [
    {
      "day": "Понедельник",
      "routines": [
        {
          "name": "Жим штанги лежа (60 кг)",
          "sets": 3,
          "reps": 10
        }
      ]
    }
  ]
}

НЕ добавляйте никаких полей, которых нет в этом примере. Ваш ответ должен быть валидным JSON-объектом без дополнительного текста.`;

      const workoutResult = await model.generateContent(workoutPrompt);
      const workoutPlanText = workoutResult.response.text();

      // VALIDATE THE INPUT COMING FROM AI
      let workoutPlan = JSON.parse(workoutPlanText);
      workoutPlan = validateWorkoutPlan(workoutPlan);

      const dietPrompt = `Вы - опытный диетолог, создающий персонализированный план питания на основе:
Возраст: ${age}
Рост: ${height}
Вес: ${weight}
Фитнес-цель: ${fitness_goal}
Диетические ограничения: ${dietary_restrictions}

Как профессиональный диетолог:
- Рассчитайте подходящее ежедневное потребление калорий на основе параметров человека и целей
- Создайте сбалансированный план питания с правильным распределением макронутриентов
- Включите разнообразные питательные продукты с учетом диетических ограничений
- Учитывайте время приема пищи относительно тренировок для оптимальной производительности и восстановления
- ОБЯЗАТЕЛЬНО указывайте количество каждого продукта в граммах или в мерных единицах (ст. ложки, чашки и т.д.)
- Пример: "Овсянка (80 г)", "Греческий йогурт (150 г)", "Арахисовое масло (1 ст. л.)"

ВАЖНЫЕ ИНСТРУКЦИИ ПО СХЕМЕ:
- Ваш вывод ДОЛЖЕН содержать ТОЛЬКО указанные ниже поля, БЕЗ ДОПОЛНИТЕЛЬНЫХ ПОЛЕЙ
- "dailyCalories" ДОЛЖНО быть ЧИСЛОМ, а не строкой
- НЕ добавляйте поля типа "добавки", "макронутриенты", "примечания" или ЧТО-ЛИБО еще
- Включайте ТОЛЬКО ТОЧНО те поля, которые показаны в примере ниже
- Каждый прием пищи должен включать ТОЛЬКО "name" и массив "foods"
- В списке "foods" ОБЯЗАТЕЛЬНО указывайте точное количество каждого продукта

Верните JSON-объект с ТОЧНО такой структурой и без других полей:
{
  "dailyCalories": 2000,
  "meals": [
    {
      "name": "Завтрак",
      "foods": ["Овсянка (80 г) с ягодами (30 г)", "Греческий йогурт (150 г)", "Черный кофе (200 мл)"]
    },
    {
      "name": "Обед",
      "foods": ["Салат с курицей-гриль (150 г курицы, 100 г овощей)", "Цельнозерновой хлеб (2 ломтика)", "Вода (500 мл)"]
    }
  ]
}

НЕ добавляйте никаких полей, которых нет в этом примере. Ваш ответ должен быть валидным JSON-объектом без дополнительного текста.`;

      const dietResult = await model.generateContent(dietPrompt);
      const dietPlanText = dietResult.response.text();

      // VALIDATE THE INPUT COMING FROM AI
      let dietPlan = JSON.parse(dietPlanText);
      dietPlan = validateDietPlan(dietPlan);

      // save to our DB: CONVEX
      const planId = await ctx.runMutation(api.plans.createPlan, {
        userId: user_id,
        dietPlan,
        isActive: true,
        workoutPlan,
        name: `${fitness_goal} Plan - ${new Date().toLocaleDateString()}`,
      });

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            planId,
            workoutPlan,
            dietPlan,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error generating fitness plan:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;
