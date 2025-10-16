"use client"

import { useEffect, useState } from "react"
import { getContent, updateHomeContent, type HomeContent } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HomeEditor() {
  const [content, setContent] = useState<HomeContent | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setContent(getContent().home)
  }, [])

  const handleSave = () => {
    if (content) {
      updateHomeContent(content)
      toast({
        title: "저장 완료",
        description: "홈 페이지 내용이 성공적으로 저장되었습니다.",
      })
    }
  }

  const addFeature = () => {
    if (content) {
      setContent({
        ...content,
        features: [...content.features, { title: "", description: "", icon: "heart" }],
      })
    }
  }

  const removeFeature = (index: number) => {
    if (content) {
      setContent({
        ...content,
        features: content.features.filter((_, i) => i !== index),
      })
    }
  }

  const updateFeature = (index: number, field: string, value: string) => {
    if (content) {
      const newFeatures = [...content.features]
      newFeatures[index] = { ...newFeatures[index], [field]: value }
      setContent({ ...content, features: newFeatures })
    }
  }

  if (!content) return <div>로딩 중...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>메인 콘텐츠</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">부제목</Label>
            <Input
              id="subtitle"
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>특징</CardTitle>
          <Button onClick={addFeature} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">특징 {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeFeature(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>제목</Label>
                  <Input value={feature.title} onChange={(e) => updateFeature(index, "title", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>설명</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, "description", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>아이콘</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={feature.icon}
                    onChange={(e) => updateFeature(index, "icon", e.target.value)}
                  >
                    <option value="heart">하트</option>
                    <option value="tree">나무</option>
                    <option value="user">사용자</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg" className="w-full">
        <Save className="w-4 h-4 mr-2" />
        저장
      </Button>
    </div>
  )
}
