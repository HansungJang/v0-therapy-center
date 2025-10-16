"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAdminAuth } from "@/lib/data-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeEditor } from "@/components/admin/home-editor"
import { AboutEditor } from "@/components/admin/about-editor"
import { ReservationEditor } from "@/components/admin/reservation-editor"
import { LocationEditor } from "@/components/admin/location-editor"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { clearAdminAuth } from "@/lib/data-store"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = checkAdminAuth()
    setIsAuthenticated(auth)
    setIsLoading(false)

    if (!auth) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    clearAdminAuth()
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">관리자 대시보드</h1>
          <p className="text-muted-foreground">웹사이트 콘텐츠를 관리하세요</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          로그아웃
        </Button>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="home">홈</TabsTrigger>
          <TabsTrigger value="about">센터 소개</TabsTrigger>
          <TabsTrigger value="reservation">예약 안내</TabsTrigger>
          <TabsTrigger value="location">오시는 길</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <HomeEditor />
        </TabsContent>

        <TabsContent value="about">
          <AboutEditor />
        </TabsContent>

        <TabsContent value="reservation">
          <ReservationEditor />
        </TabsContent>

        <TabsContent value="location">
          <LocationEditor />
        </TabsContent>
      </Tabs>
    </div>
  )
}
