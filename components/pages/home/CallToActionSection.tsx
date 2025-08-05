import { Button } from "@/components/ui/button"

export default function CallToActionSection() {
    return (
        <section className="bg-gray-50 flex justify-center flex-col items-center  py-12 min-h-[40vh] px-4 sm:px-6 lg:px-8 rounded-xl text-center shadow-sm">
            <h2 className="text-xl sm:text-4xl text-black font-light mb-2 sm:mb-4">¿Tienes productos para vender?</h2>
            <p className="text-sm sm:text-gray-600 mb-4 sm:mb-6">Únete a nuestra plataforma y llega a miles de compradores locales</p>
            <Button size="lg" className="bg-dark text-white hover:bg-dark font-semibold">
                Comenzar a vender
            </Button>
        </section>
    );
}
