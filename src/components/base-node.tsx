import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";
import { Separator } from "@/components/ui/separator";
import { Position, Handle } from '@xyflow/react';

export function BaseNode(props: any) {
  const data = props?.data as { label?: string } | undefined;
  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card text-card-foreground",
        "hover:ring-1",
        "[.react-flow\\_\\_node.selected_&]:border-muted-foreground",
        "[.react-flow\\_\\_node.selected_&]:shadow-lg",
        "px-10 py-3 min-w-[120px] min-h-[48px]"
      )}
      tabIndex={0}
    >
      {data?.label}
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
    </div>
  );
}

export function ContentNode(props: any) {
  const data = props?.data as { label?: string, image?:string, proficiency?: string, xp?: string } | undefined;
  const profNum = Math.max(0, Math.min(10, Number(data?.proficiency ?? 0)));
  const percent = (profNum / 5) * 100;
  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card text-card-foreground",
        "hover:ring-1",
        "[.react-flow\\_\\_node.selected_&]:border-muted-foreground",
        "[.react-flow\\_\\_node.selected_&]:shadow-lg",
        "px-7 py-3 min-w-[120px] min-h-[48px]"
      )}
      tabIndex={0}
    >
      <BaseNodeHeader>
        <img
        className="w-7"
        src={`../src/assets/${data?.image}`}
        />
        <BaseNodeHeaderTitle className="subtitle text-right text-2xl">
          {data?.label}
        </BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <Separator className="my-3 w-full self-stretch" />

      <BaseNodeContent>
    <div className="grid grid-cols-[auto_auto_minmax(0,1fr)] grid-rows-[auto_auto] items-center gap-x-6">
      <div className="col-[1] row-[1] text-left">experience</div>
      <div className="col-[1] row-[2] text-left">proficiency</div>
      <Separator
        orientation="vertical"
        className="col-[2] row-[1/3] self-stretch mx-2"
      />
      <div className="col-[3] row-[1] text-left">{data?.xp}</div>
      <div className="col-[3] row-[2]">
        <div className="w-full h-2 rounded-full bg-neutral-200">
          <div
            className="h-2 rounded-full"
            style={{ width: `${percent}%`, backgroundColor: "#F76F53" }}
          />
        </div>
      </div>
    </div>
  </BaseNodeContent>
      <Handle type="target" position={Position.Bottom} />
    </div>
  )
}

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export const BaseNodeHeader = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    {...props}
    className={cn(
      "mx-0 my-0 -mb-1 flex flex-row items-center justify-between gap-2 px-3 py-2",
      // Remove or modify these classes if you modify the padding in the
      // `<BaseNode />` component.
      className,
    )}
  />
));
BaseNodeHeader.displayName = "BaseNodeHeader";

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const BaseNodeHeaderTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="base-node-title"
    className={cn("user-select-none flex-1 font-semibold", className)}
    {...props}
  />
));
BaseNodeHeaderTitle.displayName = "BaseNodeHeaderTitle";

export const BaseNodeContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="base-node-content"
    className={cn("flex flex-col gap-y-2 p-3", className)}
    {...props}
  />
));
BaseNodeContent.displayName = "BaseNodeContent";

export const BaseNodeFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="base-node-footer"
    className={cn(
      "flex flex-col items-center gap-y-2 border-t px-3 pb-3 pt-2",
      className,
    )}
    {...props}
  />
));
BaseNodeFooter.displayName = "BaseNodeFooter";
