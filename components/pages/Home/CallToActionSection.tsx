import Link from "next/link";

export default function CallToActionSection() {
    return (
        <section className="bg-primary-foreground py-12 px-4 sm:px-6 lg:px-8 rounded-xl text-center shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                ¡Comenzá a explorar productos cerca tuyo!
            </h2>
            <p className="mt-2 text-base sm:text-lg text-gray-600">
                Encontrá lo que buscás, al mejor precio y en tu zona.
            </p>
            <div className="mt-6">
                <Link
                    href="#search"
                    className="inline-block bg-black text-white font-medium py-3 px-6 rounded-full hover:bg-gray-900 transition"
                >
                    Buscar productos
                </Link>
            </div>
        </section>
    );
}
