"use client"

import { useEffect, useState } from "react"
import { getContent, updateLocationContent, type LocationContent } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LocationEditor() {
  const [content, setContent] = useState<LocationContent | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setContent(getContent().location)
  }, [])

  const handleSave = () => {
    if (content) {
      updateLocationContent(content)
      toast({
        title: "저장 완료",
        description: "오시는 길 내용이 성공적으로 저장되었습니다.",
      })
    }
  }

  if (!content) return <div>로딩 중...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>위치 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">주소 (한글)</Label>
            <Input
              id="address"
              value={content.address}
              onChange={(e) => setContent({ ...content, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressEnglish">주소 (영문)</Label>
            <Input
              id="addressEnglish"
              value={content.addressEnglish}
              onChange={(e) => setContent({ ...content, addressEnglish: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="directions">찾아오시는 길</Label>
            <Textarea
              id="directions"
              value={content.directions}
              onChange={(e) => setContent({ ...content, directions: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">위도</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={content.latitude}
                onChange={(e) => setContent({ ...content, latitude: Number.parseFloat(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">경도</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={content.longitude}
                onChange={(e) => setContent({ ...content, longitude: Number.parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapUrl">Google Maps Embed URL</Label>
            <Textarea
              id="mapUrl"
              value={content.mapUrl}
              onChange={(e) => setContent({ ...content, mapUrl: e.target.value })}
              rows={3}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-muted-foreground">
              Google Maps에서 공유 → 지도 퍼가기 → HTML 코드의 src 값을 복사하세요
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg" className="w-full">
        <Save className="w-4 h-4 mr-2" />
        저장
      </Button>
    </div>
  )
}
