import { useCallback, useState } from "react"
import { Button } from "../ui/button"
import { BaseNode, ContentNode } from "@/components/base-node"
import TechStackShowcase from "../tech-stack"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ReactFlow, ReactFlowProvider, type Node, type Edge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap, type ReactFlowInstance } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

const nodeTypes = {
    base: BaseNode,
    content: ContentNode
}

const initialNodes: Node[] = [
    { id: "n1", type: "base", position: { x: 0, y: 900 }, data: { label: "Knowledge Base" } },
    { id: "n2", type: "base", position: { x: 300, y: -180 }, data: { label: "Languages" } },
    { id: "n3", type: "base", position: { x: -300, y: 100 }, data: { label: "Frameworks" } },
    { id: "n4", type: "base", position: { x: 700, y: 300 }, data: { label: "Design" } },
    { id: "n5", type: "base", position: { x: -650, y: 700 }, data: { label: "Hosting" } },

    { id: "n6", type: "content", position: { x: -100, y: -210 }, data: { label: "Laravel", image: "/assets/laravel.svg", proficiency: "3", xp: "6 months" } },
    { id: "n7", type: "content", position: { x: -520, y: -240 }, data: { label: "React", image: "/assets/React.svg", proficiency: "4", xp: "3 years" } },
    { id: "n8", type: "content", position: { x: -900, y: -220 }, data: { label: "Next.js", image: "/assets/nextjs.svg", proficiency: "5", xp: "1 year" } },
    { id: "n9", type: "content", position: { x: -1300, y: -200 }, data: { label: "Vite", image: "/assets/vite.svg", proficiency: "3", xp: "2 month" } },

    { id: "n10", type: "content", position: { x: 100, y: -580 }, data: { label: "C++", image: "/assets/C++.svg", proficiency: "2", xp: "3 years" } },
    { id: "n11", type: "content", position: { x: 500, y: -580 }, data: { label: "C", image: "/assets/C.svg", proficiency: "2", xp: "6 months" } },
    { id: "n12", type: "content", position: { x: 900, y: -580 }, data: { label: "Python", image: "/assets/python.svg", proficiency: "5", xp: "4 years" } },
    { id: "n13", type: "content", position: { x: 1300, y: -580 }, data: { label: "Java", image: "/assets/java.svg", proficiency: "5", xp: "4 years" } },
    { id: "n14", type: "content", position: { x: 1700, y: -580 }, data: { label: "Javascript", image: "/assets/javascript.svg", proficiency: "3", xp: "1 year" } },
    { id: "n15", type: "content", position: { x: 2100, y: -580 }, data: { label: "Typescript", image: "/assets/typescript.svg", proficiency: "3", xp: "3 months" } },
    { id: "n16", type: "content", position: { x: -300, y: -580 }, data: { label: "R", image: "/assets/R.svg", proficiency: "2", xp: "2 years" } },
    { id: "n17", type: "content", position: { x: -700, y: -580 }, data: { label: "PHP", image: "/assets/PHP.svg", proficiency: "4", xp: "3 years" } },
    { id: "n18", type: "content", position: { x: -1100, y: -580 }, data: { label: "HTML 5", image: "/assets/HTML5.svg", proficiency: "5", xp: "4 years" } },

    { id: "n19", type: "content", position: { x: 450, y: 0 }, data: { label: "Figma", image: "/assets/Figma.svg", proficiency: "5", xp: "1.5 years" } },
    { id: "n20", type: "content", position: { x: 910, y: -80 }, data: { label: "Rive", image: "/assets/Rive.svg", proficiency: "2", xp: "1 month" } },
    { id: "n21", type: "content", position: { x: 1300, y: -50 }, data: { label: "ShadcnUI", image: "/assets/ShadcnUI.svg", proficiency: "3", xp: "3 months" } },
    { id: "n22", type: "content", position: { x: 1750, y: 200 }, data: { label: "Tailwind", image: "/assets/tailwind.svg", proficiency: "3", xp: "6 months" } },

    { id: "n23", type: "content", position: { x: -1300, y: 350 }, data: { label: "AWS", image: "/assets/AWS.svg", proficiency: "4", xp: "1 year" } },
    { id: "n24", type: "content", position: { x: -900, y: 350 }, data: { label: "Vercel", image: "/assets/Vercel.svg", proficiency: "2", xp: "3 months" } }
]

const initialEdges: Edge[] = [
    { id: "e1", source: "n1", target: "n2" },
    { id: "e2", source: "n1", target: "n3" },
    { id: "e3", source: "n1", target: "n4" },
    { id: "e4", source: "n1", target: "n5" },

    { id: "e5", source: "n3", target: "n6" },
    { id: "e6", source: "n3", target: "n7" },
    { id: "e7", source: "n3", target: "n8" },
    { id: "e8", source: "n3", target: "n9" },

    { id: "e9", source: "n2", target: "n10" },
    { id: "e10", source: "n2", target: "n11" },
    { id: "e11", source: "n2", target: "n12" },
    { id: "e12", source: "n2", target: "n13" },
    { id: "e13", source: "n2", target: "n14" },
    { id: "e14", source: "n2", target: "n15" },
    { id: "e15", source: "n2", target: "n16" },
    { id: "e16", source: "n2", target: "n17" },
    { id: "e17", source: "n2", target: "n18" },

    { id: "e18", source: "n4", target: "n19" },
    { id: "e19", source: "n4", target: "n20" },
    { id: "e20", source: "n4", target: "n21" },
    { id: "e21", source: "n4", target: "n22" },

    { id: "e22", source: "n5", target: "n23" },
    { id: "e23", source: "n5", target: "n24" }
]

export default function Stack() {
    const [isMapOpen, setIsMapOpen] = useState(false)
    const [nodes, setNodes] = useState<Node[]>(initialNodes)
    const [edges, setEdges] = useState<Edge[]>(initialEdges)
    const onNodesChange = useCallback(
        (changes: Parameters<typeof applyNodeChanges>[0]) => setNodes((ns) => applyNodeChanges(changes, ns)),
        []
    )
    const onEdgesChange = useCallback(
        (changes: Parameters<typeof applyEdgeChanges>[0]) => setEdges((es) => applyEdgeChanges(changes, es)),
        []
    )
    const handleInit = (instance: ReactFlowInstance) => {
        instance.fitView({
            padding: 0.2,
            minZoom: 0.05,
            maxZoom: 2,
            includeHiddenNodes: true
        })
        setTimeout(() => {
            const n1 = instance.getNodes
                ? instance.getNodes().find((n) => n.id === "n1")
                : nodes.find((n) => n.id === "n1")

            if (!n1) return

            const width = (n1 as any).measured?.width ?? 0
            const height = (n1 as any).measured?.height ?? 0

            const centerX = n1.position.x + width / 2
            const centerY = n1.position.y + height / 2

            instance.setCenter(centerX, centerY, {
                zoom: 1,
                duration: 800
            })
        }, 100)
    }

    return (
        <div className="flex w-full flex-col gap-10">
            <TechStackShowcase onExplore={() => setIsMapOpen(true)} />
            <Drawer open={isMapOpen} onOpenChange={setIsMapOpen} handleOnly>
                <DrawerContent className="mx-auto w-full max-w-6xl">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>The Knowledge Tree</DrawerTitle>
                        <DrawerDescription>
                            An interactive view of tools and relationships across my stack.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-6 md:px-6">
                        <div className="h-[70vh] w-full overflow-hidden rounded-xl border border-border/40 md:h-[75vh]">
                            <ReactFlowProvider>
                                <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    nodeTypes={nodeTypes}
                                    onInit={handleInit}
                                >
                                    <Background className="rounded-xl" />
                                    <Controls className="hidden sm:block" />
                                    <MiniMap className="hidden sm:block" />
                                </ReactFlow>
                            </ReactFlowProvider>
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
