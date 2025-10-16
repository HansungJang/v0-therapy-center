// Data management system using localStorage for CRUD operations

export interface HomeContent {
  title: string
  subtitle: string
  description: string
  heroImage: string
  features: {
    title: string
    description: string
    icon: string
  }[]
}

export interface Therapist {
  id: string
  name: string
  title: string
  credentials: string[]
  bio: string
  image: string
  specialties: string[]
}

export interface AboutContent {
  centerDescription: string
  mission: string
  therapists: Therapist[]
}

export interface ReservationContent {
  email: string
  kakaoTalkId: string
  phone: string
  hours: string
  description: string
}

export interface LocationContent {
  address: string
  addressEnglish: string
  mapUrl: string
  latitude: number
  longitude: number
  directions: string
}

export interface SiteContent {
  home: HomeContent
  about: AboutContent
  reservation: ReservationContent
  location: LocationContent
}

// Default content
const defaultContent: SiteContent = {
  home: {
    title: "마음 쉼 상담센터",
    subtitle: "숲처럼 편안한 마음의 안식처",
    description: "자연의 치유력과 전문 상담이 만나는 곳, 마음 쉼 상담센터에서 당신의 마음에 평화를 찾아보세요.",
    heroImage: "/peaceful-forest-path-sunlight.jpg",
    features: [
      {
        title: "전문 심리 상담",
        description: "경험 많은 전문 상담사들이 함께합니다",
        icon: "heart",
      },
      {
        title: "자연 치유 환경",
        description: "숲을 테마로 한 편안한 상담 공간",
        icon: "tree",
      },
      {
        title: "맞춤형 프로그램",
        description: "개인의 상황에 맞는 상담 프로그램 제공",
        icon: "user",
      },
    ],
  },
  about: {
    centerDescription:
      "마음 쉼 상담센터는 2020년에 설립되어 많은 분들의 마음 건강을 돌보고 있습니다. 숲의 평화로움을 담은 공간에서 전문적인 심리 상담 서비스를 제공합니다.",
    mission: "우리는 모든 사람이 마음의 평화를 찾고 건강한 삶을 살 수 있도록 돕는 것을 목표로 합니다.",
    therapists: [
      {
        id: "1",
        name: "김지은",
        title: "센터장 / 임상심리전문가",
        credentials: ["임상심리전문가 자격증", "서울대학교 심리학 박사", "15년 이상 상담 경력"],
        bio: "개인 상담 및 가족 상담 전문가로, 다양한 심리적 어려움을 겪는 내담자들과 함께 해왔습니다.",
        image: "/professional-korean-female-therapist.jpg",
        specialties: ["우울증", "불안장애", "가족상담"],
      },
      {
        id: "2",
        name: "박민수",
        title: "상담심리사",
        credentials: ["상담심리사 1급", "연세대학교 상담심리학 석사", "10년 이상 상담 경력"],
        bio: "청소년 및 성인 상담을 전문으로 하며, 인지행동치료를 중심으로 상담을 진행합니다.",
        image: "/professional-korean-male-therapist.jpg",
        specialties: ["청소년상담", "스트레스관리", "대인관계"],
      },
    ],
  },
  reservation: {
    email: "contact@maumshim.com",
    kakaoTalkId: "maumshim_center",
    phone: "02-1234-5678",
    hours: "평일 10:00 - 20:00 / 토요일 10:00 - 17:00 / 일요일 휴무",
    description:
      "상담 예약은 이메일, 카카오톡, 전화로 가능합니다. 편하신 방법으로 연락 주시면 친절히 안내해 드리겠습니다.",
  },
  location: {
    address: "서울특별시 강남구 테헤란로 123",
    addressEnglish: "123 Teheran-ro, Gangnam-gu, Seoul",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4037634949!2d127.02859431559384!3d37.49794997981108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15a1f3b7b5f%3A0x7a1d6c8b0c5e5e5e!2sGangnam-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1234567890123!5m2!1sen!2skr",
    latitude: 37.497949,
    longitude: 127.028593,
    directions: "강남역 3번 출구에서 도보 5분 거리입니다. 건물 2층에 위치해 있습니다.",
  },
}

// Storage keys
const STORAGE_KEY = "therapy_center_content"
const ADMIN_KEY = "therapy_center_admin"

// Get content from localStorage or return default
export function getContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error("Failed to parse stored content:", e)
      return defaultContent
    }
  }
  return defaultContent
}

// Save content to localStorage
export function saveContent(content: SiteContent): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

// Update specific section
export function updateHomeContent(content: HomeContent): void {
  const current = getContent()
  saveContent({ ...current, home: content })
}

export function updateAboutContent(content: AboutContent): void {
  const current = getContent()
  saveContent({ ...current, about: content })
}

export function updateReservationContent(content: ReservationContent): void {
  const current = getContent()
  saveContent({ ...current, reservation: content })
}

export function updateLocationContent(content: LocationContent): void {
  const current = getContent()
  saveContent({ ...current, location: content })
}

// Admin authentication (simple password-based)
export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false
  const auth = localStorage.getItem(ADMIN_KEY)
  return auth === "authenticated"
}

export function setAdminAuth(password: string): boolean {
  if (typeof window === "undefined") return false
  // Simple password check (in production, use proper authentication)
  if (password === "admin123") {
    localStorage.setItem(ADMIN_KEY, "authenticated")
    return true
  }
  return false
}

export function clearAdminAuth(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(ADMIN_KEY)
}
