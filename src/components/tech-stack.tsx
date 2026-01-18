import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const languages = [
    { name: "Python", src: "/assets/python.svg" },
    { name: "Java", src: "/assets/java.svg" },
    { name: "C++", src: "/assets/C++.svg" },
    { name: "C", src: "/assets/C.svg" },
    { name: "JavaScript", src: "/assets/javascript.svg" },
    { name: "TypeScript", src: "/assets/typescript.svg" },
    { name: "PHP", src: "/assets/PHP.svg" },
    { name: "R", src: "/assets/R.svg" },
    { name: "HTML5", src: "/assets/HTML5.svg" }
]

const frameworks = [
    { name: "React", src: "/assets/React.svg" },
    { name: "Next.js", src: "/assets/nextjs.svg" },
    { name: "Laravel", src: "/assets/laravel.svg" },
    { name: "Vite", src: "/assets/vite.svg" },
    { name: "Tailwind", src: "/assets/tailwind.svg" },
    { name: "Shadcn UI", src: "/assets/ShadcnUI.svg" },
]

const tools = [
    { name: "AWS", src: "/assets/AWS.svg" },
    { name: "Vercel", src: "/assets/Vercel.svg" },
    { name: "Figma", src: "/assets/Figma.svg" },
    { name: "Rive", src: "/assets/Rive.svg" },
    { name: "n8n", src: "/assets/n8n.png" }
]

type MarqueeItem = {
    name: string
    src: string
}

type MarqueeRowProps = {
    items: MarqueeItem[]
    reverse?: boolean
}

function MarqueeRow({ items, reverse }: MarqueeRowProps) {
    const rowClasses = cn(
        "flex w-max gap-3 pr-3 md:gap-4 md:pr-4",
        reverse ? "marquee-reverse" : "marquee"
    )

    return (
        <div className="marquee-fade relative overflow-hidden py-3 group">
            <div className={rowClasses}>
                {[...items, ...items].map((item, index) => (
                    <div
                    key={`${item.name}-${index}`}
                    className="flex h-20 w-32 items-center justify-center rounded-2xl border border-border/70 bg-background/60 shadow-sm backdrop-blur md:h-24 md:w-40"
                    >
                        <img
                        src={item.src}
                        alt={item.name}
                        className="h-9 w-9 grayscale sepia saturate-200 hue-rotate-[330deg] md:h-11 md:w-11"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

type TechStackShowcaseProps = {
    onExplore?: () => void
}

export default function TechStackShowcase({ onExplore }: TechStackShowcaseProps){
    return (
        <section className="flex w-full flex-col gap-10 px-4 py-16 md:px-8 md:py-20">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 text-center">
                <p className="title text-sm lowercase tracking-[0.2em] text-muted-foreground">
                    Tech Stack
                </p>
                <h2 className="subtitle text-4xl font-[Hedvig Sans] leading-tight text-foreground md:text-5xl lg:text-6xl">
                    Tech and frameworks I have picked up over the years.
                </h2>
                <p className="description max-w-2xl text-base text-muted-foreground md:text-lg">
                    My past, present and future. 
                </p>
                <Button
                type="button"
                variant="ghost"
                className="description group rounded-full border-border/70 bg-background/70 px-4 py-2 text-sm font-medium transition-colors"
                onClick={onExplore}
                >
                    <span><p className="title hover:underline">Explore the knowledge tree</p></span>
                    
                    <span className="title ml-3 flex items-center">
                        <span className="h-px w-0 origin-left bg-current transition-all duration-300 group-hover:w-10" />
                        <span className="h-3 w-3 translate-x-[-6px] rotate-45 border-t border-r border-current transition-transform duration-300 group-hover:translate-x-0" />
                    </span>
                </Button>
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="subtitle text-xl font-semibold text-foreground md:text-2xl">Languages</h3>
                        <span className="title text-xs lowercase tracking-[0.2em] text-muted-foreground">Core</span>
                    </div>
                    <MarqueeRow items={languages} />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="subtitle text-xl font-semibold text-foreground md:text-2xl">Frameworks</h3>
                        <span className="title text-xs lowercase tracking-[0.2em] text-muted-foreground">Toolkit</span>
                    </div>
                    <MarqueeRow items={frameworks} reverse />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="subtitle text-xl font-semibold text-foreground md:text-2xl">Tools</h3>
                        <span className="title text-xs lowercase tracking-[0.2em] text-muted-foreground">Platform</span>
                    </div>
                    <MarqueeRow items={tools} />
                </div>
            </div>
        </section>
    )
}
