import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageWithSkeleton } from "../image-skeleton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  variant,
  icon,
  image,
  content
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  variant?: "large" | "small",
  icon?: React.ReactNode,
  image?: string;
  content?: React.ReactNode;

}) => {
  if (variant === "large") {
    return (
      <Dialog>
        <DialogTrigger className={cn(
              "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-card p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none relative overflow-hidden",
              className,
            )}>
          <div>
            {/* Background Image */}
            {image && (
              <ImageWithSkeleton 
                src={image} 
                alt="" 
                className="absolute inset-0 h-full w-full object-cover z-0" 
              />
            )}
              
            {/* Clip-path Overlay */}
            <div 
              className="absolute inset-0 z-10"
              style={{ 
                clipPath: "polygon(0 0, 30% 0, 100% 80%, 100% 100%, 0 100%)",
                background: "var(--card)"
              }} 
            >
              
            {/* Content */}
            <div className="transition duration-200 group-hover/bento:translate-x-2 relative z-20 px-10 pt-8 my-5 md:pt-12 text-left max-w-[60%]">
              {header}
              {icon}
              <div className="mt-2 subtitle text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
                {title}
              </div>
              <div className="mt-3 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
                {description}
              </div>
            </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h2 className="subtitle px-5">{title}</h2>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <ScrollArea className="h-[calc(66vh-6rem)] px-5">
              <div className="mx-auto max-w-2xl space-y-10">
                {content}
              </div>
            </ScrollArea>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      
    );
  }
  return (
    <Dialog>
      <DialogTrigger className={cn(
            "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-card p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none relative overflow-hidden",
            className,
      )}>
        <div>
          {/* Background Image for small variant */}
          {image && (
            <ImageWithSkeleton 
              src={image} 
              alt="" 
              className="absolute inset-0 h-full w-full object-cover z-0" 
            />
          )}
          
          {/* Content */}
          <div className="transition duration-200 group-hover/bento:translate-x-2 relative z-20 px-8 pt-8 md:pt-12 text-left max-w-[60%]">
            {header}
            {icon}
            <div className="mt-2 subtitle text-3xl md:text-4xl text-white">
              {title}
            </div>
            <div className="mt-3 text-sm md:text-base text-neutral-800 dark:text-neutral-200">
              {description}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="subtitle px-5">{title}</h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ScrollArea className="h-[calc(66vh-6rem)] px-5">
            <div className="mx-auto max-w-2xl space-y-10">
              {content}
            </div>
            </ScrollArea>
        </DialogDescription>
      </DialogContent>
    </Dialog>
    
  );
};
