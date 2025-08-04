export default function MobileMapPanel() {
    return (
        <div className="h-[90vh] w-full">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3420.524731437716!2d-65.2352177848722!3d-26.83320218316185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c3c2e6b7e4d%3A0x662a961f1a31388!2sTucum%C3%A1n%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1689623385687!5m2!1ses-419!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    )
}
