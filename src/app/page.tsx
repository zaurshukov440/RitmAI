import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRightIcon,
  ActivityIcon,
  BoltIcon,
  BarChart3Icon,
  CheckCircleIcon,
  ZapIcon,
  HeartIcon,
  TrendingUpIcon,
  ShieldIcon,
  BrainCircuitIcon,
  DumbbellIcon,
  AppleIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react"

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 pt-24 pb-20 md:pt-28 md:pb-24 flex-grow">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 border border-blue-100 shadow-sm animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
              Персональный AI-тренер для достижения ваших целей
            </div>

            <h1 className="heading-xl max-w-4xl mb-5">
              <div className="animate-fadeIn">
                <span className="text-foreground">Трансформируйте</span>
              </div>
              <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                <span className="text-gradient">Свое Тело и Здоровье</span>
              </div>
              <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                <span className="text-foreground">С Помощью</span>
              </div>
              <div className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                <span className="text-foreground">Искусственного</span>
                <span className="text-gradient"> Интеллекта</span>
              </div>
            </h1>

            <p className="text-base max-w-2xl mx-auto mb-8 font-body animate-fadeIn" style={{ animationDelay: "0.8s" }}>
              RitmAI анализирует ваши цели, физические особенности и предпочтения, чтобы создать идеально подходящую
              программу тренировок и питания, которая меняется вместе с вашим прогрессом
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fadeIn" style={{ animationDelay: "1s" }}>
              <Button size="lg" asChild className="btn-primary text-lg px-8 py-6 rounded-xl hover-glow-primary">
                <Link href={"/generate-program"} className="flex items-center">
                  Создать персональный план
                  <ArrowRightIcon className="ml-2 size-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              >
                <Link href="#how-it-works">Узнать больше</Link>
              </Button>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fadeIn"
              style={{ animationDelay: "1s" }}
            >
              <div className="stat-card hover-lift">
                <div className="text-xl text-gradient-primary font-display mb-2">Персонализация</div>
                <div className="text-sm text-muted-foreground">Индивидуальный подход к каждому пользователю</div>
                <div className="absolute top-3 right-3 opacity-10">
                  <UserIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="stat-card hover-lift">
                <div className="text-xl text-gradient-primary font-display mb-2">Эффективность</div>
                <div className="text-sm text-muted-foreground">Оптимальные программы для быстрых результатов</div>
                <div className="absolute top-3 right-3 opacity-10">
                  <BoltIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="stat-card hover-lift">
                <div className="text-xl text-gradient-primary font-display mb-2">Доступность</div>
                <div className="text-sm text-muted-foreground">Тренировки и питание для любого уровня подготовки</div>
                <div className="absolute top-3 right-3 opacity-10">
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section-alt relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4 border border-teal-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-600 mr-2"></span>
              Почему выбирают RitmAI
            </div>
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">Преимущества</span> нашей платформы
            </h2>
            <p className="text-lg">
              Мы объединили передовые технологии искусственного интеллекта с экспертизой профессиональных тренеров и
              диетологов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="feature-card hover-lift animate-fadeIn" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow-primary">
                <BoltIcon className="text-white w-7 h-7" />
              </div>
              <h3 className="heading-sm mb-3">Персонализация</h3>
              <p className="text-md">
                Индивидуальные программы, учитывающие ваш возраст, вес, рост, уровень физической подготовки и
                медицинские особенности
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-blue-600">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  <span>Учет ваших предпочтений в питании</span>
                </div>
                <div className="flex items-center text-sm text-blue-600 mt-2">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  <span>Адаптация под ваш график и образ жизни</span>
                </div>
              </div>
            </div>

            <div className="feature-card hover-lift animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 rounded-2xl gradient-secondary flex items-center justify-center mb-6 shadow-glow-secondary">
                <BarChart3Icon className="text-white w-7 h-7" />
              </div>
              <h3 className="heading-sm mb-3">Детальные планы</h3>
              <p className="text-md">
                Получите полноценный план тренировок с конкретными упражнениями, подходами и повторениями, а также
                детальный план питания
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-teal-600">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  <span>Точное расписание тренировок</span>
                </div>
                <div className="flex items-center text-sm text-teal-600 mt-2">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  <span>Расчет калорий и состав блюд</span>
                </div>
              </div>
            </div>

            <div className="feature-card hover-lift animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mb-6 shadow-glow-accent">
                <ActivityIcon className="text-white w-7 h-7" />
              </div>
              <h3 className="heading-sm mb-3">Целевые программы</h3>
              <p className="text-md">
                Специализированные программы для разных целей: снижение веса, набор мышечной массы, улучшение
                выносливости или общее оздоровление
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-violet-600">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  <span>Фокус на ваших приоритетах</span>
                </div>
                <div className="flex items-center text-sm text-violet-600 mt-2">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  <span>Учет ограничений и особенностей</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-4 border border-violet-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-violet-600 mr-2"></span>
              Простой процесс
            </div>
            <h2 className="heading-lg mb-4">
              Как <span className="text-gradient">работает</span> RitmAI
            </h2>
            <p className="text-lg">
              Всего три простых шага отделяют вас от персонализированной программы тренировок и питания
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 hover-lift text-center">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-glow-primary">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                  <ZapIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="heading-sm mb-4">Расскажите о себе</h3>
                <p className="text-md">
                  Поделитесь своими целями, предпочтениями и физическими параметрами с нашим ИИ-ассистентом в простом
                  голосовом разговоре
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12">
                <ArrowRightIcon className="w-12 h-12 text-blue-100" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 hover-lift text-center">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full gradient-secondary flex items-center justify-center shadow-glow-secondary">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
                  <BrainCircuitIcon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="heading-sm mb-4">Получите план</h3>
                <p className="text-md">
                  Наш ИИ создаст персонализированную программу тренировок и питания, адаптированную под ваши потребности
                  и возможности
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12">
                <ArrowRightIcon className="w-12 h-12 text-teal-100" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 hover-lift text-center">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full gradient-accent flex items-center justify-center shadow-glow-accent">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mx-auto mb-6">
                  <TrendingUpIcon className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="heading-sm mb-4">Достигайте целей</h3>
                <p className="text-md">
                  Следуйте рекомендациям, отслеживайте прогресс и наблюдайте, как меняется ваше тело и улучшается
                  самочувствие
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section-alt relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4 border border-blue-100 shadow-sm">
              <ShieldIcon className="w-4 h-4 mr-2" />
              Инновации и технологии
            </div>
            <h2 className="heading-lg mb-4">
              Инновационные <span className="text-gradient">возможности</span> платформы
            </h2>
            <p className="text-lg">RitmAI использует передовые технологии для создания оптимальных фитнес-решений</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <DumbbellIcon className="w-6 h-6 text-blue-600" />,
                title: "Персональные тренировки",
                description: "Программы с учетом вашего уровня подготовки и доступного оборудования",
              },
              {
                icon: <AppleIcon className="w-6 h-6 text-teal-600" />,
                title: "Планы питания",
                description: "Сбалансированные рационы с учетом ваших предпочтений и ограничений",
              },
              {
                icon: <CalendarIcon className="w-6 h-6 text-violet-600" />,
                title: "Гибкое расписание",
                description: "Адаптация под ваш график и доступное время для тренировок",
              },
              {
                icon: <HeartIcon className="w-6 h-6 text-red-600" />,
                title: "Забота о здоровье",
                description: "Учет медицинских особенностей и ограничений при составлении программ",
              },
              {
                icon: <ClockIcon className="w-6 h-6 text-yellow-600" />,
                title: "Экономия времени",
                description: "Оптимальные по длительности и эффективности тренировки",
              },
              {
                icon: <BrainCircuitIcon className="w-6 h-6 text-blue-600" />,
                title: "Нейросетевой анализ",
                description: "Использование ИИ для создания оптимальных программ",
              },
              {
                icon: <ShieldIcon className="w-6 h-6 text-teal-600" />,
                title: "Безопасность данных",
                description: "Полная конфиденциальность ваших персональных данных",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="section relative z-10">
        <div className="container mx-auto">
          <div className="glass-dark rounded-2xl p-12 border border-white/20 shadow-card relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[50px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[50px]"></div>

            <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-blue-200 opacity-20"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border border-teal-200 opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-violet-200 opacity-10 animate-slow-spin"></div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="heading-lg mb-6">
                Готовы начать свой путь к <span className="text-gradient">идеальной форме</span>?
              </h2>
              <p className="text-lg mb-8">
                Создайте свою персонализированную программу тренировок и питания прямо сейчас и получите первые
                результаты уже через 2 недели
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="btn-primary text-lg px-8 py-6 rounded-xl hover-glow-primary">
                  <Link href={"/generate-program"} className="flex items-center">
                    Создать персональный план
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                >
                  <Link href="#features">Узнать о возможностях</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
