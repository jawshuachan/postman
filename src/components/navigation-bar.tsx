import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink
  } from "@/components/ui/navigation-menu"
import { useEffect, useState } from "react"
import { LayoutGroup, motion } from "framer-motion"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button";

type View = 'home' | 'tech' | 'portfolio' | 'links';
type Props = {
    currentView: View;
    onChangeView: (v: View) => void;
}

export default function NavigationBar({currentView, onChangeView}:Props){
    const [hoveredView, setHoveredView] = useState<View | null>(null);
    const targetView = hoveredView ?? currentView;
    const navButtonClassName = "relative bg-transparent-sm px-3 py-1 text-xs font-medium text-foreground transition-colors duration-200 hover:bg-transparent md:text-sm";
    const indicatorClassName = "pointer-events-none absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-[#F76F53]";
    useEffect(() => {
        setHoveredView(null);
    }, [currentView]);
    return (
        <>
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
            <div className="flex flex-col gap-3 px-4 py-5 text-center md:grid md:grid-cols-3 md:items-center md:gap-4 md:px-6 md:py-4 md:text-left">
                <div className='flex items-center justify-center md:justify-start'>
                    <a href="/" className="ml-5 inline-flex items-center">
                        <img className="w-6 md:w-7" src="/assets/postmanlogo.svg" alt="Postman logo" />
                    </a>
                </div>
                
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    <NavigationMenu viewport={false} className="w-full justify-center">
                        <LayoutGroup id="nav-underline">
                            <NavigationMenuList
                            className="flex-wrap gap-2 md:gap-3"
                            onMouseLeave={() => setHoveredView(null)}
                            >
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'home' || undefined}
                                className="no-underline hover:no-underline"
                                > 
                                    <Button
                                    size="sm"
                                    variant="ghost"
                                    className={navButtonClassName}
                                    onMouseEnter={() => setHoveredView('home')}
                                    onFocus={() => setHoveredView('home')}
                                    onBlur={() => setHoveredView(null)}
                                    onClick={()=>onChangeView('home')}
                                    >
                                        home
                                        {targetView === 'home' ? (
                                            <motion.span
                                            layoutId="nav-underline"
                                            className={indicatorClassName}
                                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                            />
                                        ) : null}
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'tech' || undefined}
                                className="no-underline hover:no-underline"
                                > 
                                    <Button
                                    size="sm"
                                    variant="ghost"
                                    className={navButtonClassName}
                                    onMouseEnter={() => setHoveredView('tech')}
                                    onFocus={() => setHoveredView('tech')}
                                    onBlur={() => setHoveredView(null)}
                                    onClick={()=>onChangeView('tech')}
                                    >
                                        tech-stack
                                        {targetView === 'tech' ? (
                                            <motion.span
                                            layoutId="nav-underline"
                                            className={indicatorClassName}
                                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                            />
                                        ) : null}
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'portfolio' || undefined}
                                className="no-underline hover:no-underline"
                                > 
                                    <Button
                                    size="sm"
                                    variant="ghost"
                                    className={navButtonClassName}
                                    onMouseEnter={() => setHoveredView('portfolio')}
                                    onFocus={() => setHoveredView('portfolio')}
                                    onBlur={() => setHoveredView(null)}
                                    onClick={()=>onChangeView('portfolio')}
                                    >
                                    portfolio
                                        {targetView === 'portfolio' ? (
                                            <motion.span
                                            layoutId="nav-underline"
                                            className={indicatorClassName}
                                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                            />
                                        ) : null}
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'links' || undefined}
                                className="no-underline hover:no-underline"
                                > 
                                    <Button
                                    size="sm"
                                    variant="ghost"
                                    className={navButtonClassName}
                                    onMouseEnter={() => setHoveredView('links')}
                                    onFocus={() => setHoveredView('links')}
                                    onBlur={() => setHoveredView(null)}
                                    onClick={()=>onChangeView('links')}
                                    >
                                    links
                                        {targetView === 'links' ? (
                                            <motion.span
                                            layoutId="nav-underline"
                                            className={indicatorClassName}
                                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                            />
                                        ) : null}
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            </NavigationMenuList>
                        </LayoutGroup>
                    </NavigationMenu>
                </div>

                <div className='hidden items-center gap-3 md:flex md:justify-end'>
                    <ModeToggle />
                </div>
            </div>
        </header>
        </>
    )
}
