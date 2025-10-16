"use client"

import { useEffect, useState } from "react"
import { getContent, type ReservationContent } from "@/lib/data-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Phone, Clock } from "lucide-react"

export default function ReservationPage() {
  const [content, setContent] = useState<ReservationContent | null>(null)

  useEffect(() => {
    setContent(getContent().reservation)
  }, [])

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-6">예약 안내</h1>
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">연락 방법</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Email */}
              <Card className="text-center hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">이메일</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{content.email}</p>
                  <Button asChild className="w-full">
                    <a href={`mailto:${content.email}`}>이메일 보내기</a>
                  </Button>
                </CardContent>
              </Card>

              {/* KakaoTalk */}
              <Card className="text-center hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">카카오톡</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{content.kakaoTalkId}</p>
                  <Button asChild className="w-full" variant="secondary">
                    <a href={`https://pf.kakao.com/${content.kakaoTalkId}`} target="_blank" rel="noopener noreferrer">
                      카카오톡 상담
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="text-center hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">전화</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{content.phone}</p>
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <a href={`tel:${content.phone.replace(/[^0-9]/g, "")}`}>전화 걸기</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Operating Hours */}
            <Card className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">운영 시간</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{content.hours}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">예약 안내</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              상담 예약은 최소 1일 전에 해주시면 감사하겠습니다. 긴급한 경우 전화로 문의해 주시면 최대한 빠르게
              도와드리겠습니다.
            </p>
            <p className="text-sm text-muted-foreground">
              초회 상담은 약 50분 정도 소요되며, 상담 내용은 철저히 비밀이 보장됩니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
