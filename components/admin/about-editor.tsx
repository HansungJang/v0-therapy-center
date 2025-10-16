"use client"

import { useEffect, useState } from "react"
import { getContent, updateAboutContent, type AboutContent, type Therapist } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AboutEditor() {
  const [content, setContent] = useState<AboutContent | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setContent(getContent().about)
  }, [])

  const handleSave = () => {
    if (content) {
      updateAboutContent(content)
      toast({
        title: "저장 완료",
        description: "센터 소개 내용이 성공적으로 저장되었습니다.",
      })
    }
  }

  const addTherapist = () => {
    if (content) {
      const newTherapist: Therapist = {
        id: Date.now().toString(),
        name: "",
        title: "",
        credentials: [""],
        bio: "",
        image: "/placeholder.svg?key=n6qmi",
        specialties: [""],
      }
      setContent({
        ...content,
        therapists: [...content.therapists, newTherapist],
      })
    }
  }

  const removeTherapist = (id: string) => {
    if (confirm("이 상담사를 삭제하시겠습니까? 이 작업은 저장 버튼을 누르기 전까지 취소할 수 있습니다.")) {
      if (content) {
        setContent({
          ...content,
          therapists: content.therapists.filter((t) => t.id !== id),
        })
        toast({
          title: "상담사 삭제됨",
          description: "변경사항을 저장하려면 하단의 저장 버튼을 클릭하세요.",
        })
      }
    }
  }

  const updateTherapist = (id: string, field: keyof Therapist, value: any) => {
    if (content) {
      setContent({
        ...content,
        therapists: content.therapists.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
      })
    }
  }

  const handleImageUpload = (therapistId: string, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      updateTherapist(therapistId, "image", base64String)
      toast({
        title: "이미지 업로드 완료",
        description: "이미지가 성공적으로 업로드되었습니다.",
      })
    }
    reader.readAsDataURL(file)
  }

  const addCredential = (therapistId: string) => {
    if (content) {
      setContent({
        ...content,
        therapists: content.therapists.map((t) =>
          t.id === therapistId ? { ...t, credentials: [...t.credentials, ""] } : t,
        ),
      })
    }
  }

  const updateCredential = (therapistId: string, index: number, value: string) => {
    if (content) {
      setContent({
        ...content,
        therapists: content.therapists.map((t) => {
          if (t.id === therapistId) {
            const newCredentials = [...t.credentials]
            newCredentials[index] = value
            return { ...t, credentials: newCredentials }
          }
          return t
        }),
      })
    }
  }

  const removeCredential = (therapistId: string, index: number) => {
    if (content) {
      setContent({
        ...content,
        therapists: content.therapists.map((t) => {
          if (t.id === therapistId) {
            return { ...t, credentials: t.credentials.filter((_, i) => i !== index) }
          }
          return t
        }),
      })
    }
  }

  const addSpecialty = (therapistId: string) => {
    if (content) {
      setContent({
        ...content,
        therapists: content.therapists.map((t) =>
          t.id === therapistId ? { ...t, specialties: [...t.specialties, ""] } : t,
        ),
      })
    }
  }

  const updateSpecialty = (therapistId: string, index: number, value: string) => {
    if (content) {
      setContent({
        ...content,
        therapists: content.therapists.map((t) => {
          if (t.id === therapistId) {
            const newSpecialties = [...t.specialties]
            newSpecialties[index] = value
            return { ...t, specialties: newSpecialties }
          }
          return t
        }),
      })
    }
  }

  const removeSpecialty = (therapistId: string, index: number) => {
    if (content) {
      setContent({
        ...content,
        therapists: content.therapists.map((t) => {
          if (t.id === therapistId) {
            return { ...t, specialties: t.specialties.filter((_, i) => i !== index) }
          }
          return t
        }),
      })
    }
  }

  if (!content) return <div>로딩 중...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>센터 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="centerDescription">센터 설명</Label>
            <Textarea
              id="centerDescription"
              value={content.centerDescription}
              onChange={(e) => setContent({ ...content, centerDescription: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">미션</Label>
            <Textarea
              id="mission"
              value={content.mission}
              onChange={(e) => setContent({ ...content, mission: e.target.value })}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>상담사</CardTitle>
          <Button onClick={addTherapist} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            추가
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.therapists.map((therapist) => (
            <Card key={therapist.id} className="relative">
              <CardContent className="pt-6 space-y-4">
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    onClick={() => removeTherapist(therapist.id)}
                    className="bg-red-600 hover:bg-red-700 text-white shadow-md"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    삭제
                  </Button>
                </div>

                <div className="pr-20">
                  <h4 className="font-semibold text-lg mb-4">{therapist.name || "새 상담사"}</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>이름</Label>
                    <Input
                      value={therapist.name}
                      onChange={(e) => updateTherapist(therapist.id, "name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>직함</Label>
                    <Input
                      value={therapist.title}
                      onChange={(e) => updateTherapist(therapist.id, "title", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>소개</Label>
                  <Textarea
                    value={therapist.bio}
                    onChange={(e) => updateTherapist(therapist.id, "bio", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>자격 및 경력</Label>
                    <Button variant="outline" size="sm" onClick={() => addCredential(therapist.id)}>
                      <Plus className="w-3 h-3 mr-1" />
                      추가
                    </Button>
                  </div>
                  {therapist.credentials.map((credential, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={credential}
                        onChange={(e) => updateCredential(therapist.id, index, e.target.value)}
                        placeholder="자격증 또는 경력"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCredential(therapist.id, index)}
                        disabled={therapist.credentials.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>전문 분야</Label>
                    <Button variant="outline" size="sm" onClick={() => addSpecialty(therapist.id)}>
                      <Plus className="w-3 h-3 mr-1" />
                      추가
                    </Button>
                  </div>
                  {therapist.specialties.map((specialty, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={specialty}
                        onChange={(e) => updateSpecialty(therapist.id, index, e.target.value)}
                        placeholder="전문 분야"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpecialty(therapist.id, index)}
                        disabled={therapist.specialties.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
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
