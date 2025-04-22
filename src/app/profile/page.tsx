"use client"

import React, { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppleIcon, CalendarIcon, DumbbellIcon, ClockIcon, FlameIcon, CheckCircleIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

const ProfileHeader = ({ user }: any) => {
  return (
    <div className="bg-white rounded-2xl p-8 mb-8 shadow-card border border-gray-100">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-100 shadow-glow-primary">
            <img
              src={user?.imageUrl || "/placeholder.svg?height=96&width=96"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold font-display mb-2">
            {user ? (user.firstName + " " + (user.lastName || "")).trim() || "Пользователь" : "Пользователь"}
          </h1>
          <p className="text-muted-foreground mb-4">{user?.emailAddresses[0].emailAddress || ""}</p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <div className="badge badge-primary">Активный пользователь</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NoFitnessPlan = () => {
  return (
    <div className="bg-white rounded-2xl p-12 text-center shadow-card border border-gray-100">
      <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
        <DumbbellIcon className="text-white w-10 h-10" />
      </div>
      <h2 className="heading-md mb-4">У вас пока нет фитнес-планов</h2>
      <p className="text-lg max-w-md mx-auto mb-8">
        Создайте свой первый персонализированный план тренировок и питания с помощью нашего ИИ-ассистента
      </p>
      <Button asChild className="btn-primary">
        <Link href="/generate-program">Создать программу</Link>
      </Button>
    </div>
  )
}

const ProfilePage = () => {
  const { user } = useUser()
  const userId = user?.id as string

  const allPlans = useQuery(api.plans.getUserPlans, { userId })
  const [selectedPlanId, setSelectedPlanId] = useState<null | string>(null)

  const activePlan = allPlans?.find((plan) => plan.isActive)
  const currentPlan = selectedPlanId ? allPlans?.find((plan) => plan._id === selectedPlanId) : activePlan

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
      <ProfileHeader user={user} />

      {allPlans && allPlans?.length > 0 ? (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-sm">
                <span className="text-gradient">Ваши</span> Фитнес-Планы
              </h2>
              <div className="text-sm text-muted-foreground">Всего: {allPlans.length}</div>
            </div>

            <div className="flex flex-wrap gap-3">
              {allPlans.map((plan) => (
                <Button
                  key={plan._id}
                  onClick={() => setSelectedPlanId(plan._id)}
                  className={`text-foreground border hover-lift transition-smooth ${
                    selectedPlanId === plan._id || (plan.isActive && !selectedPlanId)
                      ? "bg-blue-50 text-blue-700 border-blue-200 shadow-glow-primary"
                      : "bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {plan.name}
                  {plan.isActive && <span className="ml-2 badge badge-success">Активен</span>}
                </Button>
              ))}
            </div>
          </div>

          {currentPlan && (
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow-primary">
                  <DumbbellIcon className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="heading-sm">
                    <span className="text-gradient">{currentPlan.name}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">Создан: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="stat-card hover-lift">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Расписание</span>
                  </div>
                  <div className="text-muted-foreground">{currentPlan.workoutPlan.schedule.join(", ")}</div>
                  <div className="absolute top-3 right-3 opacity-10">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                </div>

                <div className="stat-card hover-lift">
                  <div className="flex items-center gap-2 mb-1">
                    <ClockIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Длительность</span>
                  </div>
                  <div className="text-muted-foreground">45-60 минут</div>
                  <div className="absolute top-3 right-3 opacity-10">
                    <ClockIcon className="h-6 w-6" />
                  </div>
                </div>

                <div className="stat-card hover-lift">
                  <div className="flex items-center gap-2 mb-1">
                    <FlameIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Калории</span>
                  </div>
                  <div className="text-muted-foreground">{currentPlan.dietPlan.dailyCalories} ккал/день</div>
                  <div className="absolute top-3 right-3 opacity-10">
                    <FlameIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <Tabs defaultValue="workout" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-2 bg-gray-50 border border-gray-200 p-1 rounded-xl">
                  <TabsTrigger
                    value="workout"
                    className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm hover-lift"
                  >
                    <DumbbellIcon className="mr-2 size-4" />
                    План Тренировок
                  </TabsTrigger>

                  <TabsTrigger
                    value="diet"
                    className="rounded-lg data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 data-[state=active]:shadow-sm hover-lift"
                  >
                    <AppleIcon className="mr-2 h-4 w-4" />
                    План Питания
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="workout">
                  <div className="space-y-6">
                    <Accordion type="multiple" className="space-y-4">
                      {currentPlan.workoutPlan.exercises.map((exerciseDay, index) => (
                        <AccordionItem
                          key={index}
                          value={exerciseDay.day}
                          className="border border-gray-200 rounded-xl overflow-hidden hover-lift transition-smooth"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-blue-50/50">
                            <div className="flex justify-between w-full items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-xs text-blue-700 font-medium">{index + 1}</span>
                                </div>
                                <span className="text-blue-700 font-display">{exerciseDay.day}</span>
                              </div>
                              <div className="badge badge-primary">{exerciseDay.routines.length} упражнений</div>
                            </div>
                          </AccordionTrigger>

                          <AccordionContent className="pb-4 px-4">
                            <div className="space-y-3 mt-2">
                              {exerciseDay.routines.map((routine, routineIndex) => (
                                <div
                                  key={routineIndex}
                                  className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover-lift transition-smooth"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-foreground">{routine.name}</h4>
                                    <div className="flex items-center gap-2">
                                      <div className="badge badge-primary">{routine.sets} подходов</div>
                                      <div className="badge badge-secondary">{routine.reps} повторений</div>
                                    </div>
                                  </div>
                                  {routine.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{routine.description}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="diet">
                  <div className="space-y-6">
                    <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-teal-800">Дневная норма калорий</span>
                        <div className="text-xl text-gradient-secondary font-display">
                          {currentPlan.dietPlan.dailyCalories} ккал
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentPlan.dietPlan.meals.map((meal, index) => (
                        <div
                          key={index}
                          className="bg-white p-5 rounded-xl border border-gray-200 hover-lift transition-smooth"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full gradient-secondary flex items-center justify-center shadow-sm">
                              <span className="text-xs text-white font-medium">{index + 1}</span>
                            </div>
                            <h4 className="text-lg font-display">{meal.name}</h4>
                          </div>

                          <ul className="space-y-2">
                            {meal.foods.map((food, foodIndex) => (
                              <li
                                key={foodIndex}
                                className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-lg hover:bg-teal-50 transition-smooth"
                              >
                                <CheckCircleIcon className="w-4 h-4 text-teal-600" />
                                {food}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      ) : (
        <NoFitnessPlan />
      )}
    </section>
  )
}

export default ProfilePage
