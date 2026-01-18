import { ProgressiveBlur } from "./ui/progressive-blur"

export default function Footer(){

    return(
        <footer className="relative h-[16vh] w-full overflow-hidden px-4 sm:h-[16vh] md:h-[10vh] md:px-6">
            <div className="pointer-events-none absolute left-1/2 top-1/2 w-[120%] -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="title block text-[20vw] leading-[0.9] text-foreground/20">postman</span>
            </div>
            <ProgressiveBlur height="10%" />
        </footer>
    )
}
