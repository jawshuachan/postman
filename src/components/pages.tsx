import { ReactFlow, ReactFlowProvider, type Node, type Edge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap } from '@xyflow/react';
import { useState, useCallback } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { BaseNode, ContentNode } from '@/components/base-node'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from './ui/button';
import { motion } from 'framer-motion'

import { IconBrandLinkedin, IconBrandGithub, IconBrandWhatsapp, IconBrandGmail, IconBrandInstagram, IconBrandX } from '@tabler/icons-react'

import '@xyflow/react/dist/style.css';

//--------------------------------------------------------------- home ---------------------------------------------------------------

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

//--------------------------------------------------------------- techstack ---------------------------------------------------------------

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
    { id: 'n6',  type: 'content', position: { x: -100, y: -210 },  data: { label: 'Laravel', image: '/assets/laravel.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n7',  type: 'content', position: { x: -520, y: -240 },  data: { label: 'React',   image: '/assets/React.svg',   proficiency: "4", xp: "2 years" } },
    { id: 'n8',  type: 'content', position: { x: -900, y: -220 },  data: { label: 'Next.js', image: '/assets/nextjs.svg',  proficiency: "5", xp: "2 years" } },
    { id: 'n9',  type: 'content', position: { x: -1300, y: -200 }, data: { label: 'Vite',    image: '/assets/vite.svg',    proficiency: "3", xp: "2 years" } },
  
    // Languages
    { id: 'n10', type: 'content', position: { x: 100, y: -580 },   data: { label: 'C++',        image: '/assets/C++.svg',        proficiency: "2", xp: "2 years" } },
    { id: 'n11', type: 'content', position: { x: 500, y: -580 },   data: { label: 'C',          image: '/assets/C.svg',          proficiency: "2", xp: "2 years" } },
    { id: 'n12', type: 'content', position: { x: 900, y: -580 },   data: { label: 'Python',     image: '/assets/python.svg',     proficiency: "5", xp: "2 years" } },
    { id: 'n13', type: 'content', position: { x: 1300, y: -580 },  data: { label: 'Java',       image: '/assets/java.svg',       proficiency: "5", xp: "2 years" } },
    { id: 'n14', type: 'content', position: { x: 1700, y: -580 },  data: { label: 'Javascript', image: '/assets/javascript.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n15', type: 'content', position: { x: 2100, y: -580 },  data: { label: 'Typescript', image: '/assets/typescript.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n16', type: 'content', position: { x: -300, y: -580 },  data: { label: 'R',          image: '/assets/R.svg',          proficiency: "2", xp: "2 years" } },
    { id: 'n17', type: 'content', position: { x: -700, y: -580 },  data: { label: 'PHP',        image: '/assets/PHP.svg',        proficiency: "4", xp: "2 years" } },
    { id: 'n18', type: 'content', position: { x: -1100, y: -580 }, data: { label: 'HTML 5',     image: '/assets/HTML5.svg',      proficiency: "5", xp: "2 years" } },
  
    // Design
    { id: 'n19', type: 'content', position: { x: 450, y: 0 },    data: { label: 'Figma',    image: '/assets/Figma.svg',    proficiency: "5", xp: "2 years" } },
    { id: 'n20', type: 'content', position: { x: 910, y: -80 },  data: { label: 'Rive',     image: '/assets/Rive.svg',     proficiency: "2", xp: "2 years" } },
    { id: 'n21', type: 'content', position: { x: 1300, y: -50 }, data: { label: 'ShadcnUI', image: '/assets/ShadcnUI.svg', proficiency: "3", xp: "2 years" } },
    { id: 'n22', type: 'content', position: { x: 1750, y: 200 }, data: { label: 'Tailwind', image: '/assets/tailwind.svg', proficiency: "3", xp: "2 years" } },
  
    // Hosting
    { id: 'n23', type: 'content', position: { x: -1300, y: 350 }, data: { label: 'AWS',    image: '/assets/AWS.svg',    proficiency: "4", xp: "1 year" } },
    { id: 'n24', type: 'content', position: { x: -900, y: 350 },  data: { label: 'Vercel', image: '/assets/Vercel.svg', proficiency: "2", xp: "2 years" } },
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

//--------------------------------------------------------------- portfolio ---------------------------------------------------------------

function Portfolio(){
    const items = [
    {
        title: "University Projects",
        image: "/assets/header_cab202.png"
    },
    {
        title: "VIRA",
        image: "/assets/header_vira.png"
    },
    {
        title: "7 Manning's RSVP",
        image: "/assets/header_housewarming.jpg"
    },
    {
        title: "Monogrid",
        description:
        "a cloud based video transcoding app hosted and powered by AWS services",
        image: "/assets/header_aws.png"
    },
    {
        title: "Udemy Certificates",
        image: "/assets/header_udemy.png"
    },
    {
        title: "Minor Projects",
        image: "/assets/header_minor_projects.jpg"
    },
    {
        title: "Experian",
        description: "my first internship.",
        image: "/assets/header_experian.png"
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
                        image={item.image}
                        variant={i === 3 || i === 6 ? "large" : "small"}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid> 
            </div>
        </ScrollArea>
    </div>
    )
}

//--------------------------------------------------------------- links ---------------------------------------------------------------

// function openNewBackgroundTab(){    
//     var a = document.createElement("a");    
//     a.href = "http://www.google.com/";    
//     var evt = document.createEvent("MouseEvents");    

//     //the tenth parameter of initMouseEvent sets ctrl key    
//     evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,true, false, false, false, 0, null);    
//     a.dispatchEvent(evt);
// }

function Links(){
    return(
        <div className="h-full flex items-center justify-center">
            <div className="h-full w-full rounded-md">
                <div className="relative isolate px-8 py-5 m-15 pt-15 lg:px-8">
                    <div className="title text-center p-5">
                        <h1 className="text-9xl font-[Hedvig Sans]">that's all folks!</h1>
                    </div>
                </div>
                <div className="mt-8 m-10">
                    <span className="description p-2 px-10 rounded-3xl text-md border bg-card">professional enquiries</span>
                </div>
                <div className="mt-8 m-10">
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Button variant="ghost" className="p-10 m-2 rounded-2xl border">
                            <a className="p-0" href="https://www.linkedin.com/in/joshua-chan-bp37/" target="_blank">
                                <IconBrandLinkedin className="size-10" />
                            </a>
                        </Button>
                    </motion.button>
                    
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Button variant="ghost" className="p-10 m-2 rounded-2xl border">
                            <a className="p-0" href="https://github.com/jawshuachan" target="_blank">
                                <IconBrandGithub className="size-10" />
                            </a>
                        </Button>
                    </motion.button>

                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Button variant="ghost" className="p-10 m-2 rounded-2xl border">
                            <a className="p-0" href="https://www.linkedin.com/in/joshua-chan-bp37/" target="_blank">
                                <IconBrandWhatsapp className="size-10" />
                            </a>
                        </Button>
                    </motion.button>
                    
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Button variant="ghost" className="p-10 m-2 rounded-2xl border">
                            <a className="p-0" href="https://www.linkedin.com/in/joshua-chan-bp37/" target="_blank">
                                <IconBrandGmail className="size-10" />
                            </a>
                        </Button>
                    </motion.button>
                    
                </div>
                <div className="mt-8 m-10">
                    <span className="description p-2 px-10 rounded-3xl text-md border bg-card">socials</span>
                </div>
                <div className="mt-8 m-10">
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Button variant="ghost" className="p-10 m-2 rounded-2xl border">
                            <a className="p-0" href="https://www.instagram.com/joshuaachan/" target="_blank">
                                <IconBrandInstagram className="size-10" />
                            </a>
                        </Button>
                    </motion.button>
                    
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Button variant="ghost" className="p-10 m-2 rounded-2xl border">
                            <a className="p-0" href="https://www.x.com/jawshuachan/" target="_blank">
                                <IconBrandX className="size-10" />
                            </a>
                        </Button>
                    </motion.button>
                    
                </div>
            </div>
        </div>
    )
}

export {
    Home,
    Stack,
    Portfolio,
    Links
}
