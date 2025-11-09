import flowerGraphic from "/assets/flower.svg"
import zenGraphic from "/assets/zen.svg"
import darkFlowerGraphic from "/assets/darkFlower.svg"
import darkZenGraphic from "/assets/darkPillars.svg"

export default function Footer(){

    return(
        <footer className="relative w-full pb-5 pointer-events-none">
            <div className='relative z-10 flex items-left gap-3 py-12 w-full pointer-events-auto'>
                <div className='p-2'>
                    <img className='w-20 dark:hidden' src={flowerGraphic} alt="hydrangea graphic"/>
                    <img className='w-20 hidden dark:block' src={darkFlowerGraphic} alt="hydrangea graphic"/>
                </div>
                <div className='p-2'>
                    <img className='w-20 dark:hidden' src={zenGraphic} alt="pillars" />
                    <img className='w-20 hidden dark:block' src={darkZenGraphic} alt="hydrangea graphic"/>
                </div>
            </div>
        </footer>
    )
}