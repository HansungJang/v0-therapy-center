"use client"

import { useEffect, useState } from "react"
import { getContent, updateReservationContent, type ReservationContent } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ReservationEditor() {
  const [content, setContent] = useState<ReservationContent | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setContent(getContent().reservation)
  }, [])

  const handleSave = () => {
    if (content) {
      updateReservationContent(content)
      toast({
        title: "저장 완료",
        description: "예약 안내 내용이 성공적으로 저장되었습니다.",
      })
    }
  }

  if (!content) return <div>로딩 중...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>예약 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={content.email}
              onChange={(e) => setContent({ ...content, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kakaoTalkId">카카오톡 ID</Label>
            <Input
              id="kakaoTalkId"
              value={content.kakaoTalkId}
              onChange={(e) => setContent({ ...content, kakaoTalkId: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              value={content.phone}
              onChange={(e) => setContent({ ...content, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours">운영 시간</Label>
            <Input
              id="hours"
              value={content.hours}
              onChange={(e) => setContent({ ...content, hours: e.target.value })}
            />
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
