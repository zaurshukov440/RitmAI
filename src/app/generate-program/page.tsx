"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { vapi } from "@/lib/vapi"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  MicIcon,
  PhoneOffIcon,
  AudioWaveformIcon as WaveformIcon,
  BrainCircuitIcon,
  UserIcon,
  ArrowRightIcon,
} from "lucide-react"

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [callEnded, setCallEnded] = useState(false)

  const { user } = useUser()
  const router = useRouter()

  const messageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const originalError = console.error
    console.error = (msg, ...args) => {
      if (msg && (msg.includes("Meeting has ended") || (args[0] && args[0].toString().includes("Meeting has ended")))) {
        console.log("Ignoring known error: Meeting has ended")
        return 
      }

      return originalError.call(console, msg, ...args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile")
      }, 1500)

      return () => clearTimeout(redirectTimer)
    }
  }, [callEnded, router])

  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started")
      setConnecting(false)
      setCallActive(true)
      setCallEnded(false)
    }

    const handleCallEnd = () => {
      console.log("Call ended")
      setCallActive(false)
      setConnecting(false)
      setIsSpeaking(false)
      setCallEnded(true)
    }

    const handleSpeechStart = () => {
      console.log("AI started Speaking")
      setIsSpeaking(true)
    }

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking")
      setIsSpeaking(false)
    }
    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role }
        setMessages((prev) => [...prev, newMessage])
      }
    }

    const handleError = (error: any) => {
      console.log("Vapi Error", error)
      setConnecting(false)
      setCallActive(false)
    }

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError)


    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError)
    }
  }, [])

  const toggleCall = async () => {
    if (callActive) vapi.stop()
    else {
      try {
        setConnecting(true)
        setMessages([])
        setCallEnded(false)

        const fullName = user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Пользователь"

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        })
      } catch (error) {
        console.log("Failed to start call", error)
        setConnecting(false)
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-16">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="heading-lg mb-4">
            <span>Создайте Свой </span>
            <span className="text-gradient">Фитнес-План</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Пообщайтесь с нашим ИИ-ассистентом, чтобы создать персонализированный план тренировок и питания
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="animate-fadeIn relative overflow-hidden" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>
            <div className="aspect-video flex flex-col items-center justify-center p-8 relative">
              <div
                className={`absolute inset-0 ${
                  isSpeaking ? "opacity-30" : "opacity-0"
                } transition-opacity duration-300`}
              >
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`mx-1 h-16 w-1 bg-blue-500 rounded-full ${isSpeaking ? "animate-sound-wave" : ""}`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative size-32 mb-6">
                <div
                  className={`absolute inset-0 bg-blue-500 opacity-20 rounded-full blur-xl ${
                    isSpeaking ? "animate-pulse-slow" : ""
                  }`}
                />

                <div className="relative w-full h-full rounded-full flex items-center justify-center border border-blue-200 overflow-hidden hover-lift shadow-glow-primary">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white"></div>
                  <Image 
                    src="/ai-avatar.png" 
                    alt="RitmAI Assistant" 
                    className="w-full h-full object-cover relative z-10" 
                    width={128}
                    height={128}
                    unoptimized
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground font-display mb-1">RitmAI</h2>
              <p className="text-sm text-muted-foreground mb-4">Персональный фитнес-тренер</p>

              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full glass border ${
                  isSpeaking ? "border-blue-300 shadow-glow-primary" : "border-gray-200"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-blue-500 animate-pulse" : "bg-muted"}`} />

                <span className="text-sm">
                  {isSpeaking
                    ? "Говорит..."
                    : callActive
                      ? "Слушает..."
                      : callEnded
                        ? "Перенаправление в профиль..."
                        : "Ожидание..."}
                </span>
              </div>
            </div>
          </Card>


          <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-8 relative">
              <div className="relative size-32 mb-6">
                <Image
                  src={user?.imageUrl || "/placeholder.svg"}
                  alt="User"
                  className="size-full object-cover rounded-full"
                  width={128}
                  height={128}
                  unoptimized
                />
              </div>

              <h2 className="text-2xl font-bold text-foreground font-display mb-1">Вы</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {user ? (user.firstName + " " + (user.lastName || "")).trim() || "Пользователь" : "Пользователь"}
              </p>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-gray-200">
                <UserIcon className="w-4 h-4 text-teal-600" />
                <span className="text-sm">Готов к разговору</span>
              </div>
            </div>
          </Card>
        </div>


        {messages.length > 0 ? (
          <Card
            ref={messageContainerRef}
            className="max-h-[350px] overflow-y-auto mb-12 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <CardContent className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 animate-slideIn ${
                      message.role === "user"
                        ? "bg-teal-50 border border-teal-100 text-gray-800"
                        : "bg-blue-50 border border-blue-100 text-gray-800"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {callEnded && (
                <div className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-primary mb-1">Система:</div>
                  <p className="text-foreground">Ваша фитнес-программа создана! Перенаправление в профиль...</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-12 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <CardContent>
              <div className="text-center py-8">
                <BrainCircuitIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Начните разговор с ИИ-ассистентом, чтобы создать персонализированный фитнес-план
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          <Button
            size="lg"
            onClick={toggleCall}
            disabled={connecting || callEnded}
            className={`rounded-xl px-8 py-6 text-lg font-medium shadow-card flex items-center gap-3 ${
              callActive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : callEnded
                  ? "bg-green-600 hover:bg-green-700"
                  : "btn-primary hover-glow-primary"
            }`}
          >
            {connecting && (
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
            )}

            {connecting ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Подключение...
              </>
            ) : callActive ? (
              <>
                <PhoneOffIcon className="w-5 h-5" />
                Завершить разговор
              </>
            ) : callEnded ? (
              <>Перейти в профиль</>
            ) : (
              <>
                <MicIcon className="w-5 h-5" />
                Начать разговор
              </>
            )}
          </Button>
        </div>

        <Card className="mt-16 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          <CardHeader>
            <CardTitle className="text-center">Как это работает:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4 hover-lift">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-glow-primary">
                  <MicIcon className="text-white w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3">Шаг 1</h4>
                <p className="text-md">Нажмите кнопку &quot;Начать разговор&quot; и расскажите о своих целях и предпочтениях</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 hover-lift">
                <div className="w-14 h-14 rounded-xl gradient-secondary flex items-center justify-center mb-6 shadow-glow-secondary">
                  <WaveformIcon className="text-white w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3">Шаг 2</h4>
                <p className="text-md">Ответьте на вопросы ИИ-ассистента для создания персонализированного плана</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 hover-lift">
                <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6 shadow-glow-accent">
                  <ArrowRightIcon className="text-white w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3">Шаг 3</h4>
                <p className="text-md">Получите готовый план и начните свой путь к идеальной форме</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GenerateProgramPage
