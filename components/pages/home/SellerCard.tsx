import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function SellerCard() {
  return (
    <section className="w-full max-w-5xl mx-auto">
      <Card className="relative overflow-hidden border-0 shadow-2xl rounded-3xl">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bannerCTA.jpeg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-medium text-white mb-6 text-balance drop-shadow-2xl">
              ¿Tienes productos para vender?
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed text-pretty drop-shadow-xl">
              Únete a nuestra plataforma y llega a miles de compradores locales
            </p>

            <Button
            size="lg"
            className="bg-[#e81b77] text-white drop-shadow-2xl px-8 py-3 text-lg font-semibold rounded-[10px] transition-all duration-200 hover:-translate-y-[3px] hover:bg-[#e81b77] hover:text-white border-2 border-[#e81b77]"
            >
              Comenzar a vender
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
