import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-serif text-lg font-semibold">
            <Image src="/center_logo.png" alt="마음 쉼 상담센터" width={36} height={36} className="object-contain" />
            <span>마음 쉼 상담센터</span>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© 2025 마음 쉼 상담센터. All rights reserved.</p>
            <p className="mt-1">숲처럼 편안한 마음의 안식처</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
