import * as React from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type ImageWithSkeletonProps = {
    src: string;
    alt: string;
    className?: string,
    aspect?: string;
}

export function ImageWithSkeleton({ src, alt, className, aspect = "aspect-[16/9]" }: ImageWithSkeletonProps) {
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(false)

    return(
        <div className={cn("relative w-full overflow-hidden rounded-md", aspect, className)}>
            {!loaded && !error && (
                <Skeleton className="absolute inset-0 h-full w-full" />
            )}

            <img
                src={src}
                alt={alt}
                className={cn(
                "h-full w-full object-cover transition-opacity",
                loaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                loading="lazy"
            />

            {error && (
                <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
                Image failed to load
                </div>
            )}
        </div>
    );
}