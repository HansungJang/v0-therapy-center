"use client"

import { useEffect, useState } from "react"
import { getContent, type LocationContent } from "@/lib/data-store"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

export default function LocationPage() {
  const [content, setContent] = useState<LocationContent | null>(null)

  useEffect(() => {
    setContent(getContent().location)
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-6">오시는 길</h1>
          <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            마음 쉼 상담센터를 찾아오시는 방법을 안내해 드립니다
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            {/* Google Map */}
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-8">
              <iframe
                src={content.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="마음 쉼 상담센터 위치"
              />
            </div>

            {/* Location Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Address Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">주소</h3>
                      <p className="text-muted-foreground mb-1">{content.address}</p>
                      <p className="text-sm text-muted-foreground">{content.addressEnglish}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Directions Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">찾아오시는 길</h3>
                      <p className="text-muted-foreground leading-relaxed">{content.directions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Info */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4 text-center">주차 안내</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  건물 지하 주차장을 이용하실 수 있습니다. 주차 공간이 제한적이므로 가급적 대중교통을 이용해 주시면
                  감사하겠습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
