"use client"

import { useEffect, useState } from "react"
import { getContent, type HomeContent } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Trees, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const iconMap = {
  heart: Heart,
  tree: Trees,
  user: User,
}

export default function HomePage() {
  const [content, setContent] = useState<HomeContent | null>(null)

  useEffect(() => {
    setContent(getContent().home)
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
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/peaceful-forest-path-sunlight.jpg" alt="Forest healing" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-balance">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 text-balance max-w-2xl mx-auto">{content.subtitle}</p>
          <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">{content.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/reservation">상담 예약하기</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Link href="/about">센터 소개</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">마음 쉼만의 특별함</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            전문성과 자연의 치유력이 조화를 이루는 공간
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.features.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap] || Heart
              return (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">마음의 평화를 찾아보세요</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              숲처럼 편안한 공간에서 전문 상담사와 함께 당신의 이야기를 나눠보세요. 첫 상담은 언제나 환영합니다.
            </p>
            <Button asChild size="lg" className="text-lg">
              <Link href="/reservation">지금 예약하기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
