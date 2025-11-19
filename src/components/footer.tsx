import flowerGraphic from "/assets/flower.svg"
import zenGraphic from "/assets/zen.svg"
import darkFlowerGraphic from "/assets/darkFlower.svg"
import darkZenGraphic from "/assets/darkPillars.svg"

export default function Footer(){

    return(
        <footer className="pointer-events-none relative w-full pb-15 md:pb-6">
            <div className='pointer-events-auto relative z-10 flex w-full items-start gap-2 px-3 py-4 md:gap-3 md:px-4 md:py-6 lg:px-0 lg:py-10'>
                <div className='p-1 md:p-2'>
                    <img className='w-12 md:w-16 lg:w-20 dark:hidden' src={flowerGraphic} alt="hydrangea graphic"/>
                    <img className='w-12 md:w-16 lg:w-20 hidden dark:block' src={darkFlowerGraphic} alt="hydrangea graphic"/>
                </div>
                <div className='p-1 md:p-2'>
                    <img className='w-12 md:w-16 lg:w-20 dark:hidden' src={zenGraphic} alt="pillars" />
                    <img className='w-12 md:w-16 lg:w-20 hidden dark:block' src={darkZenGraphic} alt="hydrangea graphic"/>
                </div>
            </div>
        </footer>
    )
}
