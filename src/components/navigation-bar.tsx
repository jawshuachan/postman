import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink
  } from "@/components/ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button";

type View = 'home' | 'tech' | 'portfolio' | 'links';
type Props = {
    currentView: View;
    onChangeView: (v: View) => void;
}

export default function NavigationBar({currentView, onChangeView}:Props){
    return (
        <>
        <header className="w-full">
            <div className="flex flex-col gap-3 px-4 py-5 text-center md:grid md:grid-cols-3 md:items-center md:gap-4 md:px-6 md:py-4 md:text-left">
                <div className='flex items-center justify-center md:justify-start'>
                    <a href="/" className="inline-flex items-center">
                        <img className="w-6 md:w-7" src="/assets/postmanlogo.svg" alt="Postman logo" />
                    </a>
                </div>
                
                <div className='flex justify-center'>
                    <NavigationMenu viewport={false} className="w-full justify-center">
                        <NavigationMenuList className="flex-wrap gap-2 md:gap-3">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'home' || undefined}
                                className="text-xs md:text-sm px-2 py-1 data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    size="sm"
                                    className="text-xs md:text-sm px-3 py-1"
                                    onClick={()=>onChangeView('home')}
                                    >home</Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'tech' || undefined}
                                className="text-xs md:text-sm px-2 py-1 data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    size="sm"
                                    className="text-xs md:text-sm px-3 py-1"
                                    onClick={()=>onChangeView('tech')}
                                    >
                                    tech-stack</Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'portfolio' || undefined}
                                className="text-xs md:text-sm px-2 py-1 data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    size="sm"
                                    className="text-xs md:text-sm px-3 py-1"
                                    onClick={()=>onChangeView('portfolio')}
                                    >
                                    portfolio
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'links' || undefined}
                                className="text-xs md:text-sm px-2 py-1 data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    size="sm"
                                    className="text-xs md:text-sm px-3 py-1"
                                    onClick={()=>onChangeView('links')}
                                    >
                                    links
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className='hidden md:flex md:justify-end'>
                    <ModeToggle />
                </div>
            </div>
        </header>
        </>
    )
}
