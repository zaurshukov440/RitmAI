<h1 align="center">💪 Ritm AI — персональный фитнес-ассистент</h1>

> Инновационное приложение, где голосовой ИИ и большие модели создают уникальные планы тренировок и питания.

---

## 🌟 Что внутри?

| 🔹 Возможность             | 📖 Описание                                  |
|-----------------------------|-----------------------------------------------|
| 🗣 Голосовой помощник       | Диалог с ИИ на естественном языке             |
| 🏋️ Персональные тренировки  | Подбор упражнений по уровню и целям           |
| 🥗 Сбалансированное питание | Ежедневные меню с учётом предпочтений         |
| 🔒 Авторизация и безопасность| Безопасный вход через Clerk                 |
| ⚡️ Реальное время          | Синхронизация данных мгновенно с Convex       |
| 🧠 LLM-интеллект           | Качественные рекомендации от Google Gemini AI |

---

## 🚀 Технологии

- **Next.js** (App Router, серверные и клиентские компоненты)
- **React** + **Convex** (база данных в реальном времени)
- **Tailwind CSS** & **Shadcn UI** (гибкие стили и компоненты)
- **Clerk** (управление пользователями и авторизация)
- **Vapi** (голосовой AI-сервер)
- **Google Gemini AI** (генерация фитнес-программ)

---

## ⚡ Быстрый старт

1. Склонируйте проект:
   ```bash
   git clone https://github.com/zaurshukov440/RitmAI.git
   cd RitmAI
   ```
2. Установите зависимости:
   ```bash
   npm ci
   ```
3. Создайте файл `.env.local` и добавьте:
   ```env
   # Авторизация (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Голосовой AI (Vapi)
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=...
   NEXT_PUBLIC_VAPI_API_KEY=...

   # Convex
   CONVEX_DEPLOYMENT=...
   NEXT_PUBLIC_CONVEX_URL=...
   ```
4. Запустите локальный сервер:
   ```bash
   npm run dev
   ```
5. Откройте в браузере: `http://localhost:3000`

---

## 📦 Продакшн и деплой

- Сборка:
  ```bash
  npm run build
  ```
- Запуск:
  ```bash
  npm start
  ```
- Рекомендуем деплой на **Vercel** для автоматических CI/CD.

---

## 🔗 Полезные ресурсы

- 📝 [Next.js](https://nextjs.org/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🔐 [Clerk](https://clerk.com/docs)
- 🗣 [Vapi](https://docs.vapi.ai)
- 🗄 [Convex](https://docs.convex.dev)
- 🤖 [Google Gemini AI](https://ai.google.dev/gemini-api)

---

© 2025 **Ritm AI™**. Все права защищены.
