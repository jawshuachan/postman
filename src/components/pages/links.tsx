import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { IconBrandLinkedin, IconBrandGithub, IconBrandWhatsapp, IconMail, IconBrandInstagram, IconCopy, IconBrandFacebook } from "@tabler/icons-react"
import { CircleFlag } from "react-circle-flags"
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi"
import { SiGmail } from "react-icons/si"

export default function Links() {
    const iconButtonClasses = "rounded-2xl border px-6 py-7 sm:px-8 sm:py-8"
    const iconSizeClasses = "size-8 sm:size-10"
    const contactRowClasses = "flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-5 sm:text-left"
    const rotatingWords = ["create", "design", "make", "build"]
    const [wordIndex, setWordIndex] = useState(0)

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setWordIndex((prev) => (prev + 1) % rotatingWords.length)
        }, 1800)
        return () => window.clearInterval(intervalId)
    }, [rotatingWords.length])

    return (
        <div className="flex h-full items-center justify-center">
            <ScrollArea className="h-full w-full rounded-md">
                <div className="pt-10 sm:pt-12">
                    <div className="relative isolate mx-auto max-w-5xl px-4 py-6 sm:px-8 lg:py-8">
                        <div className="text-center">
                            <h1 className="title text-4xl font-[Hedvig Sans] sm:text-6xl lg:text-8xl pb-8">signing off,</h1>
                            <div className="subtitle text-sm md:text-2xl text-left pb-5">
                                <p>
                                    Let&rsquo;s{" "}
                                    <motion.span
                                        key={rotatingWords[wordIndex]}
                                        initial={{ y: 12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -12, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="inline-block"
                                    >
                                        {rotatingWords[wordIndex]}
                                    </motion.span>
                                </p>
                                <p>incredible work together.</p>
                            </div>
                            <div className="description text-center">
                                <img src="/assets/Signature.png" className="mx-auto w-1/2 dark:invert" alt="Signature" />
                                <p className="text-md md:text-lg text-right">Joshua Chan</p>
                                <div className="text-sm md:text-sm text-right text-muted-foreground">
                                    <p>Full Stack Engineer +</p>
                                    <p>Solutions Architecture</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex max-w-3xl justify-center px-4">
                        <span className="description rounded-3xl border bg-card px-6 py-2 text-sm sm:px-10 sm:text-base">
                            professional enquiries
                        </span>
                    </div>
                    <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 px-4 py-6 sm:gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Button variant="ghost" className={iconButtonClasses} asChild>
                                <a href="https://www.linkedin.com/in/joshua-chan-bp37/" target="_blank" rel="noreferrer">
                                    <IconBrandLinkedin className={iconSizeClasses} />
                                </a>
                            </Button>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Button variant="ghost" className={iconButtonClasses} asChild>
                                <a href="https://github.com/jawshuachan" target="_blank" rel="noreferrer">
                                    <IconBrandGithub className={iconSizeClasses} />
                                </a>
                            </Button>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="ghost" className={iconButtonClasses}>
                                        <IconBrandWhatsapp className={iconSizeClasses} />
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <div className="mx-auto w-full max-w-sm px-4 pt-5">
                                        <DrawerHeader>
                                            <DrawerTitle>Contact Numbers</DrawerTitle>
                                            <DrawerDescription>Please contact me for professional enquiries only.</DrawerDescription>
                                        </DrawerHeader>
                                    </div>
                                    <div className="px-4 pb-6 pt-3">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className={`${contactRowClasses} pb-2`}>
                                                <span className="inline-block overflow-hidden w-5 h-5 rounded-xs">
                                                    <CircleFlag countryCode="my" className="h-full w-full object-cover" />
                                                </span>
                                                <p>+60-12-891-8936</p>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    navigator.clipboard
                                                                        .writeText("+60128918936")
                                                                        .then(() => {
                                                                            toast.success("Copied to clipboard!")
                                                                        })
                                                                        .catch(() => {
                                                                            toast.error("Failed to copy!")
                                                                        })
                                                                }}
                                                            >
                                                                <IconCopy />
                                                            </Button>
                                                        </motion.button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Copy!</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <div className={contactRowClasses}>
                                                <span className="inline-block overflow-hidden w-5 h-5 rounded-xs">
                                                    <CircleFlag countryCode="au" className="h-full w-full object-cover" />
                                                </span>
                                                <p>+61-45-235-8936</p>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    navigator.clipboard
                                                                        .writeText("+61452358936")
                                                                        .then(() => {
                                                                            toast.success("Copied to clipboard!")
                                                                        })
                                                                        .catch(() => {
                                                                            toast.error("Failed to copy!")
                                                                        })
                                                                }}
                                                            >
                                                                <IconCopy />
                                                            </Button>
                                                        </motion.button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Copy!</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose>
                                            <div className="pb-8">
                                                <Button variant="outline" className="w-full max-w-xs">Close</Button>
                                            </div>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="ghost" className={iconButtonClasses}>
                                        <IconMail className={iconSizeClasses} />
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <div className="mx-auto w-full max-w-sm px-4 pt-5">
                                        <DrawerHeader>
                                            <DrawerTitle>Email</DrawerTitle>
                                            <DrawerDescription>Please contact me for professional enquiries only.</DrawerDescription>
                                        </DrawerHeader>
                                    </div>
                                    <div className="px-4 pb-6 pt-3">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className={`${contactRowClasses} pb-2`}>
                                                <span className="inline-block overflow-hidden w-5 h-5 rounded-xs">
                                                    <SiGmail />
                                                </span>
                                                <p>joshuawjchan@gmail.com</p>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    navigator.clipboard
                                                                        .writeText("joshuawjchan@gmail.com")
                                                                        .then(() => {
                                                                            toast.success("Copied to clipboard!")
                                                                        })
                                                                        .catch(() => {
                                                                            toast.error("Failed to copy!")
                                                                        })
                                                                }}
                                                            >
                                                                <IconCopy />
                                                            </Button>
                                                        </motion.button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Copy!</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <div className={contactRowClasses}>
                                                <span className="inline-block overflow-hidden w-5 h-5 rounded-xs">
                                                    <PiMicrosoftOutlookLogoFill />
                                                </span>
                                                <p>joshuawjchan@hotmail.com</p>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    navigator.clipboard
                                                                        .writeText("joshuawjchan@hotmail.com")
                                                                        .then(() => {
                                                                            toast.success("Copied to clipboard!")
                                                                        })
                                                                        .catch(() => {
                                                                            toast.error("Failed to copy!")
                                                                        })
                                                                }}
                                                            >
                                                                <IconCopy />
                                                            </Button>
                                                        </motion.button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Copy!</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose>
                                            <div className="pb-8">
                                                <Button variant="outline" className="w-full max-w-xs">Close</Button>
                                            </div>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </motion.button>
                    </div>
                    <div className="mx-auto flex max-w-3xl justify-center px-4">
                        <span className="description rounded-3xl border bg-card px-6 py-2 text-sm sm:px-10 sm:text-base">
                            socials
                        </span>
                    </div>
                    <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 px-4 py-6 sm:gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="ghost" className={iconButtonClasses} asChild>
                                <a href="https://www.instagram.com/joshuaachan/" target="_blank" rel="noreferrer">
                                    <IconBrandInstagram className={iconSizeClasses} />
                                </a>
                            </Button>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <Button variant="ghost" className={iconButtonClasses} asChild>
                                <a href="https://www.facebook.com/37.JoshuaChan" target="_blank" rel="noreferrer">
                                    <IconBrandFacebook className={iconSizeClasses} />
                                </a>
                            </Button>
                        </motion.button>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
