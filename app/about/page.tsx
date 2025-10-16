"use client"

import { useEffect, useState } from "react"
import { getContent, type AboutContent } from "@/lib/data-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null)

  useEffect(() => {
    setContent(getContent().about)
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-6">센터 소개</h1>
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            마음 쉼 상담센터를 소개합니다
          </p>
        </div>
      </section>

      {/* Center Description */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-6 text-center">우리 센터</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{content.centerDescription}</p>
            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="font-semibold text-lg mb-2">우리의 미션</h3>
              <p className="text-muted-foreground leading-relaxed">{content.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-4">전문 상담사</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            풍부한 경험과 전문성을 갖춘 상담사들이 함께합니다
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {content.therapists.map((therapist) => (
              <Card key={therapist.id} className="overflow-hidden">
                <div className="aspect-[4/3] relative bg-muted">
                    <Image
                    src={therapist.image || "/placeholder.svg"}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                    />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-1">{therapist.name}</h3>
                  <p className="text-primary font-medium mb-4">{therapist.title}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">자격 및 경력</h4>
                    <ul className="space-y-1">
                      {therapist.credentials.map((credential, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{credential}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{therapist.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">전문 분야</h4>
                    <div className="flex flex-wrap gap-2">
                      {therapist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
