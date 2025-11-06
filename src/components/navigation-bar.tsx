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
            <div className="grid grid-cols-3 items-center w-full p-2">
                <div className='flex items-center'>
                    <a href="/">
                        <img className="w-7 " src="/assets/postmanlogo.svg" alt="Postman logo" />
                    </a>
                </div>
                
                <div className='flex justify-center'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'home' ||undefined}
                                className="data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    onClick={()=>onChangeView('home')}
                                    >home</Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'tech' ||undefined}
                                className="data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    onClick={()=>onChangeView('tech')}
                                    >
                                    tech-stack</Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'portfolio' ||undefined}
                                className="data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    onClick={()=>onChangeView('portfolio')}
                                    >
                                    portfolio
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink
                                asChild
                                data-active={currentView === 'links' ||undefined}
                                className="data-[active]:underline underline-offset-8 data-[active]:decoration-[#F76F53] data-[active]:decoration-4"
                                > 
                                    <Button
                                    onClick={()=>onChangeView('links')}
                                    >
                                    links
                                    </Button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className='flex justify-end'>
                    <ModeToggle />
                </div>
            </div>
        </header>
        </>
    )
}
