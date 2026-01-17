export default function Home() {
    return (
        <div className="relative isolate flex flex-col items-center gap-6 px-4 py-20 text-center md:mx-auto md:max-w-5xl md:items-center md:px-8 md:py-20 lg:py-24">
            <div className="subtitle">
                <h2 className="text-md font-medium md:text-left md:text-2xl">a small side project,</h2>
            </div>
            <div className="title w-full">
                <h1 className="text-5xl font-[Hedvig Sans] leading-tight md:text-6xl lg:text-8xl">postman.</h1>
            </div>
            <div className="subtitle w-full sm:py-10">
                <h3 className="text-base leading-relaxed md:text-2xl">
                    here to deliver <em>all</em> things Joshua Chan
                </h3>
            </div>
        </div>
    )
}
