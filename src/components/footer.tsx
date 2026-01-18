import { ProgressiveBlur } from "./ui/progressive-blur"

export default function Footer(){

    return(
        <footer className="relative h-[16vh] overflow-hidden w-full px-4 pt-3 sm:h-[16vh] sm:pt-4 md:h-[10vh] md:px-6 md:pt-0">
            <div className="pointer-events-none flex h-full w-full items-end justify-center text-center">
                <span className="title block translate-y-[50%] text-[20vw] leading-[0.9] text-foreground/20">postman</span>
            </div>
            <ProgressiveBlur height="50%" />
        </footer>
    )
}
