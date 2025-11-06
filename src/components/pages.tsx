import { ReactFlow, ReactFlowProvider, type Node, type Edge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap } from '@xyflow/react';
import { useState, useCallback } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { BaseNode, ContentNode } from '@/components/base-node'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

import '@xyflow/react/dist/style.css';

function Home(){
    return(
        <div className="relative isolate px-8 py-20 m-20 pt-14 lg:px-8">
            <div className="subtitle flex text-left">
                <h2 className="text-3xl">a small side project,</h2>
            </div>
            <div className="title text-center p-5">
                <h1 className="text-9xl font-[Hedvig Sans]">postman.</h1>
            </div>
            <div className="subtitle text-center p-20">
                <h3 className="text-2xl">informing you of <em>all</em> things Joshua Chan</h3>
            </div>
        </div>
    )
}

const nodeTypes = {
    base: BaseNode,
    content: ContentNode
};

const initialNodes: Node[] = [
    // Base categories
    { id: 'n1', type: 'base', position: { x: 0, y: 900 },    data: { label: 'Knowledge Base' } },
    { id: 'n2', type: 'base', position: { x: 300, y: -180 }, data: { label: 'Languages' } },
    { id: 'n3', type: 'base', position: { x: -300, y: 100 }, data: { label: 'Frameworks' } },
    { id: 'n4', type: 'base', position: { x: 700, y: 300 },  data: { label: 'Design' } },
    { id: 'n5', type: 'base', position: { x: -650, y: 700 }, data: { label: 'Hosting' } },
  
    // Frameworks
    { id: 'n6',  type: 'content', position: { x: -100, y: -210 },  data: { label: 'Laravel', image: 'laravel.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n7',  type: 'content', position: { x: -520, y: -240 },  data: { label: 'React',   image: 'React.svg',   proficiency: "4", xp: "2 years" } },
    { id: 'n8',  type: 'content', position: { x: -900, y: -220 },  data: { label: 'Next.js', image: 'nextjs.svg',  proficiency: "5", xp: "2 years" } },
    { id: 'n9',  type: 'content', position: { x: -1300, y: -200 }, data: { label: 'Vite',    image: 'vite.svg',    proficiency: "3", xp: "2 years" } },
  
    // Languages
    { id: 'n10', type: 'content', position: { x: 100, y: -580 },   data: { label: 'C++',        image: 'C++.svg',        proficiency: "2", xp: "2 years" } },
    { id: 'n11', type: 'content', position: { x: 500, y: -580 },   data: { label: 'C',          image: 'C.svg',          proficiency: "2", xp: "2 years" } },
    { id: 'n12', type: 'content', position: { x: 900, y: -580 },   data: { label: 'Python',     image: 'python.svg',     proficiency: "5", xp: "2 years" } },
    { id: 'n13', type: 'content', position: { x: 1300, y: -580 },  data: { label: 'Java',       image: 'java.svg',       proficiency: "5", xp: "2 years" } },
    { id: 'n14', type: 'content', position: { x: 1700, y: -580 },  data: { label: 'Javascript', image: 'javascript.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n15', type: 'content', position: { x: 2100, y: -580 },  data: { label: 'Typescript', image: 'typescript.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n16', type: 'content', position: { x: -300, y: -580 },  data: { label: 'R',          image: 'R.svg',          proficiency: "2", xp: "2 years" } },
    { id: 'n17', type: 'content', position: { x: -700, y: -580 },  data: { label: 'PHP',        image: 'PHP.svg',        proficiency: "4", xp: "2 years" } },
    { id: 'n18', type: 'content', position: { x: -1100, y: -580 }, data: { label: 'HTML 5',     image: 'HTML5.svg',      proficiency: "5", xp: "2 years" } },
  
    // Design
    { id: 'n19', type: 'content', position: { x: 450, y: 0 },    data: { label: 'Figma',    image: 'Figma.svg',    proficiency: "5", xp: "2 years" } },
    { id: 'n20', type: 'content', position: { x: 910, y: -80 },  data: { label: 'Rive',     image: 'Rive.svg',     proficiency: "2", xp: "2 years" } },
    { id: 'n21', type: 'content', position: { x: 1300, y: -50 }, data: { label: 'ShadcnUI', image: 'ShadcnUI.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n22', type: 'content', position: { x: 1750, y: 200 }, data: { label: 'Tailwind', image: 'tailwind.svg', proficiency: "3", xp: "2 years" } },
  
    // Hosting
    { id: 'n23', type: 'content', position: { x: -1300, y: 350 }, data: { label: 'AWS',    image: 'AWS.svg',    proficiency: "4", xp: "1 year" } },
    { id: 'n24', type: 'content', position: { x: -900, y: 350 },  data: { label: 'Vercel', image: 'Vercel.svg', proficiency: "2", xp: "2 years" } },
  ];

  const initialEdges = [
    { id: 'e1', source: 'n1', target: 'n2' },
    { id: 'e2', source: 'n1', target: 'n3' },
    { id: 'e3', source: 'n1', target: 'n4' },
    { id: 'e4', source: 'n1', target: 'n5' },
  
    // Frameworks
    { id: 'e5', source: 'n3', target: 'n6' },
    { id: 'e6', source: 'n3', target: 'n7' },
    { id: 'e7', source: 'n3', target: 'n8' },
    { id: 'e8', source: 'n3', target: 'n9' },
  
    // Languages
    { id: 'e9',  source: 'n2', target: 'n10' },
    { id: 'e10', source: 'n2', target: 'n11' },
    { id: 'e11', source: 'n2', target: 'n12' },
    { id: 'e12', source: 'n2', target: 'n13' },
    { id: 'e13', source: 'n2', target: 'n14' },
    { id: 'e14', source: 'n2', target: 'n15' },
    { id: 'e15', source: 'n2', target: 'n16' },
    { id: 'e16', source: 'n2', target: 'n17' },
    { id: 'e17', source: 'n2', target: 'n18' },
  
    // Design
    { id: 'e18', source: 'n4', target: 'n19' },
    { id: 'e19', source: 'n4', target: 'n20' },
    { id: 'e20', source: 'n4', target: 'n21' },
    { id: 'e21', source: 'n4', target: 'n22' },
  
    // Hosting
    { id: 'e22', source: 'n5', target: 'n23' },
    { id: 'e23', source: 'n5', target: 'n24' },
  ];

function Stack(){
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const onNodesChange = useCallback(
        (changes: Parameters<typeof applyNodeChanges>[0]) => setNodes((ns) => applyNodeChanges(changes, ns)),
        [],
      );
    const onEdgesChange = useCallback(
        (changes: Parameters<typeof applyEdgeChanges>[0]) => setEdges((es) => applyEdgeChanges(changes, es)),
        [],
    );
    return(
        <div className="h-full w-full border">
            <div className="h-full w-full rounded-xl">
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Background className="rounded-xl" />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </div>
    )
}

function Portfolio(){
    const Skeleton = () => (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
      );
    const items = [
    {
        title: "Monogrid",
        description: "an AWS cloud based video transcoding app.",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "VIRA",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton />,
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "7 Manning's RSVP",
        description: "Discover the beauty of thoughtful and functional design.",
        header: <Skeleton />,
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Power of Communication",
        description:
        "Understand the impact of effective communication in our lives.",
        header: <Skeleton />,
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Pursuit of Knowledge",
        description: "Join the quest for understanding and enlightenment.",
        header: <Skeleton />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Joy of Creation",
        description: "Experience the thrill of bringing ideas to life.",
        header: <Skeleton />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Spirit of Adventure",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Skeleton />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
    ];

    return(
    <div className="h-full flex items-center justify-center">
        <ScrollArea className="h-full w-full rounded-md border">
            <div className="p-4">
                <BentoGrid className="max-w-4xl mx-auto">
                    {items.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid> 
            </div>
        </ScrollArea>
    </div>
    )
}

function Links(){
    return(
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <p>Links</p>
        </div>
    )
}

export {
    Home,
    Stack,
    Portfolio,
    Links
}