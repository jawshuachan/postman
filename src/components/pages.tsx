import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button';
import { toast } from "sonner"
import { ImageWithSkeleton } from './image-skeleton';
import LinkPill from './link-pill'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProgressiveBlur } from './ui/progressive-blur';
import { BaseNode, ContentNode } from '@/components/base-node'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { ReactFlow, ReactFlowProvider, type Node, type Edge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap, type ReactFlowInstance } from '@xyflow/react';
import { IconBrandLinkedin, IconBrandGithub, IconBrandWhatsapp, IconMail, IconBrandInstagram, IconCopy, IconBrandFacebook, IconLink } from '@tabler/icons-react'
import { CircleFlag } from "react-circle-flags";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import '@xyflow/react/dist/style.css';

//--------------------------------------------------------------- home ---------------------------------------------------------------

function Home(){
    return(
        <div className="relative isolate flex flex-col items-center gap-6 px-4 py-20 text-center md:mx-auto md:max-w-5xl md:items-start md:px-8 md:py-20 lg:py-24">
            <div className="subtitle">
                <h2 className="text-md font-medium md:text-left md:text-2xl">a small side project,</h2>
            </div>
            <div className="title w-full">
                <h1 className="text-5xl font-[Hedvig Sans] leading-tight md:text-6xl lg:text-8xl">postman.</h1>
            </div>
            <div className="subtitle w-full sm:py-10">
                <h3 className="text-base leading-relaxed md:text-2xl">
                    here to deliver <em>all</em> things Joshua Chan
                </h3>
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
    { id: 'n6',  type: 'content', position: { x: -100, y: -210 },  data: { label: 'Laravel', image: '/assets/laravel.svg', proficiency: "3", xp: "6 months" } },
    { id: 'n7',  type: 'content', position: { x: -520, y: -240 },  data: { label: 'React',   image: '/assets/React.svg',   proficiency: "4", xp: "3 years" } },
    { id: 'n8',  type: 'content', position: { x: -900, y: -220 },  data: { label: 'Next.js', image: '/assets/nextjs.svg',  proficiency: "5", xp: "1 year" } },
    { id: 'n9',  type: 'content', position: { x: -1300, y: -200 }, data: { label: 'Vite',    image: '/assets/vite.svg',    proficiency: "3", xp: "2 month" } },
  
    // Languages
    { id: 'n10', type: 'content', position: { x: 100, y: -580 },   data: { label: 'C++',        image: '/assets/C++.svg',        proficiency: "2", xp: "3 years" } },
    { id: 'n11', type: 'content', position: { x: 500, y: -580 },   data: { label: 'C',          image: '/assets/C.svg',          proficiency: "2", xp: "6 months" } },
    { id: 'n12', type: 'content', position: { x: 900, y: -580 },   data: { label: 'Python',     image: '/assets/python.svg',     proficiency: "5", xp: "4 years" } },
    { id: 'n13', type: 'content', position: { x: 1300, y: -580 },  data: { label: 'Java',       image: '/assets/java.svg',       proficiency: "5", xp: "4 years" } },
    { id: 'n14', type: 'content', position: { x: 1700, y: -580 },  data: { label: 'Javascript', image: '/assets/javascript.svg', proficiency: "3", xp: "1 year" } },
    { id: 'n15', type: 'content', position: { x: 2100, y: -580 },  data: { label: 'Typescript', image: '/assets/typescript.svg', proficiency: "3", xp: "3 months" } },
    { id: 'n16', type: 'content', position: { x: -300, y: -580 },  data: { label: 'R',          image: '/assets/R.svg',          proficiency: "2", xp: "2 years" } },
    { id: 'n17', type: 'content', position: { x: -700, y: -580 },  data: { label: 'PHP',        image: '/assets/PHP.svg',        proficiency: "4", xp: "3 years" } },
    { id: 'n18', type: 'content', position: { x: -1100, y: -580 }, data: { label: 'HTML 5',     image: '/assets/HTML5.svg',      proficiency: "5", xp: "4 years" } },
  
    // Design
    { id: 'n19', type: 'content', position: { x: 450, y: 0 },    data: { label: 'Figma',    image: '/assets/Figma.svg',    proficiency: "5", xp: "1.5 years" } },
    { id: 'n20', type: 'content', position: { x: 910, y: -80 },  data: { label: 'Rive',     image: '/assets/Rive.svg',     proficiency: "2", xp: "1 month" } },
    { id: 'n21', type: 'content', position: { x: 1300, y: -50 }, data: { label: 'ShadcnUI', image: '/assets/ShadcnUI.svg', proficiency: "3", xp: "3 months" } },
    { id: 'n22', type: 'content', position: { x: 1750, y: 200 }, data: { label: 'Tailwind', image: '/assets/tailwind.svg', proficiency: "3", xp: "6 months" } },
  
    // Hosting
    { id: 'n23', type: 'content', position: { x: -1300, y: 350 }, data: { label: 'AWS',    image: '/assets/AWS.svg',    proficiency: "4", xp: "1 year" } },
    { id: 'n24', type: 'content', position: { x: -900, y: 350 },  data: { label: 'Vercel', image: '/assets/Vercel.svg', proficiency: "2", xp: "3 months" } },
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
    const handleInit = (instance: ReactFlowInstance) => {
        instance.fitView({
          padding: 0.2,
          minZoom: 0.05,
          maxZoom: 2,
          includeHiddenNodes: true,
        });
        setTimeout(() => {
            const n1 = instance.getNodes
              ? instance.getNodes().find(n => n.id === 'n1')
              : nodes.find(n => n.id === 'n1');
      
            if (!n1) return;

            const width  = (n1 as any).measured?.width  ?? 0;
            const height = (n1 as any).measured?.height ?? 0;
      
            const centerX = n1.position.x + width / 2;
            const centerY = n1.position.y + height / 2;
      
            instance.setCenter(centerX, centerY, {
              zoom: 1,
              duration: 800,
            });
          }, 100);
      };
    
    return(
        <div className="flex w-full flex-col md:h-full md:pr-11 md:py-0">
            <div className="h-[60vh] w-full overflow-hidden rounded-xl border border-border/40 md:h-full">
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
    )
}

//--------------------------------------------------------------- portfolio ---------------------------------------------------------------

function Portfolio(){
    const [isMdUp, setIsMdUp] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const handler = (event: MediaQueryListEvent) => setIsMdUp(event.matches);
        setIsMdUp(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);
    const items = [
    {
        title: "University Projects",
        image: "/assets/header_cab202.png",
        content: 
        <div className="space-y-10">
            {/* CAB201 */}
            <div className="space-y-4">
                <p><strong>CAB201 Programming Principles — Object-Oriented CLI Detection System</strong></p>
                <ImageWithSkeleton src="/assets/content_uni_201.png" alt="project CLI view" className="rounded-md" />
                <p className="text-justify">
                    A C++, command-driven console app that models an
                    obstacle-aware “Threat-o-tron 9000” grid: users add guards, fences, sensors, and cameras; render text maps; query safe
                    directions; and compute obstacle-free paths. Features strict command parsing/validation, clean OO design, and
                    testable modules for map, entities, and pathfinding.
                </p>
                <LinkPill 
                    href="https://github.com/jawshuachan/CAB201_Obstacle_Avoidance_System"
                    icon={ <IconBrandGithub /> }
                >
                    View on GitHub
                </LinkPill>
                </div>
            
                {/* CAB202 */}
                <div className="space-y-4">
                <p><strong>CAB202 Microprocessors and Digital Systems — Simon Says Game</strong>.</p>
                <ImageWithSkeleton src="/assets/content_uni_202.png" alt="QUTy board used" className="rounded-md" />
                <p className="text-justify">
                    A bare-metal, C-based, memory-sequence game for the QUTy board with LED/BTN I/O,
                    debounced inputs, pseudo-random sequence generation, non-blocking timers, and a finite-state machine for idle →
                    playback → capture → verify → score. Tuned delays and feedback make it playable and robust on real hardware.
                </p>
                <LinkPill 
                    href="https://github.com/jawshuachan/CAB202_Simon_Says"
                    icon={ <IconBrandGithub /> }
                >
                    View on GitHub
                </LinkPill>
                </div>
            
                {/* IFB201 */}
                <div className="space-y-4">
                <p><strong>IFB201 Introduction to Enterprise Systems — Salesforce Recruitment Automation</strong></p>
                <ImageWithSkeleton src="/assets/content_uni_i201.png" alt="Dashboard view" className="rounded-md" />
                <p className="text-justify">
                    Implemented a hiring pipeline for AW Computing using Salesforce:
                    custom objects/fields for candidates and roles, validation rules, screen/record-triggered Flows for stage transitions,
                    automated notifications/approvals, and dashboards for recruiter throughput and time-to-hire. Focused on clean data
                    design and low-code automation.
                </p>
                </div>
            
                {/* CAB301 */}
                <div className="space-y-4">
                <p><strong>CAB301 Algorithms and Complexity — Algorithms</strong></p>
                <ImageWithSkeleton src="/assets/content_uni_301.png" alt="Star sequence algorithm " className="rounded-md" />
                <p className="text-justify">
                    A transportation-network console app using C#: load/save graph data, add/remove roads with
                    connectivity checks, detect connectedness, find shortest paths between suburbs (Dijkstra), and compute a minimum
                    backbone network (MST). Emphasis on asymptotic efficiency, correctness, and clean separation of data model vs. menu UI.
                </p>
                <LinkPill 
                    href="https://github.com/jawshuachan/CAB301-Algorithms-and-Complexity"
                    icon={ <IconBrandGithub /> }
                >
                    View on GitHub
                </LinkPill>
                </div>

                {/* MXB261 */}
                <div className="space-y-4">
                <p><strong>MXB261 Modelling and Simulation Science - Epidemic Simulation Research</strong></p>
                <ImageWithSkeleton src="/assets/content_uni_261.png" alt="Research paper cover page" className="rounded-md" />
                <p className="text-justify"> 
                    This project explored mathematical modelling techniques for simulating the spread of infectious diseases. 
                    Using MATLAB, we implemented compartmental models such as SIR and SEIR to study how changes in transmission 
                    rate, recovery probability, and population density influence outbreak dynamics. 
                </p>
                <LinkPill 
                    href="https://docs.google.com/document/d/1rkVwtMyElJHbScxQIu431BID562IvdWxTDpmiAuQYhs/edit?usp=sharing"
                    icon={ <IconLink /> }
                >
                    Research Paper
                </LinkPill>

                <p className="text-justify"> 
                    The simulations were visualised through interactive time-series and phase-plane plots to compare deterministic and stochastic behaviours. 
                    The work emphasised parameter sensitivity, model calibration, and critical-threshold analysis for understanding 
                    how interventions (e.g., vaccination or isolation) alter epidemic trajectories.
                </p>
                <LinkPill 
                    href="https://github.com/jawshuachan/MXB261"
                    icon={ <IconLink /> }
                >
                    View on GitHub
                </LinkPill>
            </div>
        </div>
    },
    {
        title: "VIRA",
        image: "/assets/header_vira.png",
        content: 
        <div>
            <div>
                <ImageWithSkeleton src="/assets/content_vira_header.png" alt="user testing day image" className="rounded-md" />
            </div>
            <p className="py-5 text-justify">
                VIRA (Virtual Immersion Risk Assessment) is my capstone project, a two semester-long collaboration with 
                Filigree Consulting to design a virtual-reality training prototype for Queensland’s child protection services. 
                The project’s aim is to help new child service practitioners recognise and assess environmental risk factors through 
                immersive, scenario-based learning.
            </p>

            <ImageWithSkeleton src="/assets/content_vira_designs.png" alt="Figma preview" className="rounded-md w-full" />
            <p className="py-5 text-justify">
                Our Phase 1 prototype focused on UX design, interaction flow, and scenario logic across a distinct 
                a suburban home environment while Phase 2 was pure development. I contributed to the UI/UX design 
                system, Figma mock-ups, and Unity implementation of the main hub, onboarding flow, and scenario gallery. 
                These scenes allow users to navigate through virtual spaces, adjust scenario risk toggles, and experience 
                realistic decision-making contexts.
            </p>

            <LinkPill 
                href="https://github.com/Project-VIRA-PoC/Project-VIRA-PoC-clean"
                icon={ <IconLink /> }
            >
                github.com/Project-VIRA-PoC-clean
            </LinkPill>

            <p className="pt-5 text-justify">
                For the first time ever, I experienced what it was like to facilitate a user feedback group, from preparing prototype demonstration
                to observing real user interactions and gathering insights for refinement. Seeing users engage naturally with our onboarding process and scenario 
                flow was both validating and eye-opening.
            </p>
            <div className="pt-5">
                <ImageWithSkeleton src="/assets/content_vira_end.png" alt="Thank you gifts for attending VIRA user testing day" className="rounded-md" />
            </div>
            
            <p className="py-5 text-justify">
                Our project did quite well overall, we were featured as one of the highlighted projects in our university's IT Expo Showcase. 
                It was so increadibly rewarding to demonstrate the prototype live to students, faculty and industry partners, receiving geniune interest in the portential
                of VR for training and risk assessment.
            </p>
        </div>
    },
    {
        title: "7 Manning's RSVP",
        image: "/assets/header_housewarming.jpg",
        content: 
        <div>
            <ImageWithSkeleton src="/assets/content_manning_lead.png" alt="rsvp site landing page" className="rounded-md"/>
            <p className="py-5 text-justify">
                7 Manning’s RSVP was a personal web project I built with my roommates, Rex and Jude to streamline invitations and guest responses for our housewarming! 
                It was a lightweight React application deployed via GitHub Pages, with a Firebase Database handling live reservation updates and authentication.
            </p>

            <ImageWithSkeleton src="/assets/content_manning_content.png" alt="reservation form" className="rounded-md"/>
            <p className="py-5 text-justify">
                We made sure that the UI was really simple for anyone to understand.
                People who wanted to RSVP could provide their name, a gift they'd like to give :P and a final confirmation since we needed a headcount for such a small place and food.
                We kept the site up just for fun if you'd like to take a look.
            </p>
            <LinkPill 
                href="https://rsvpmanning-8db32.web.app/"
                icon={ <IconLink /> }
            >
                rsvpmanning-8db32.web.app
            </LinkPill>
            <p className="py-5 text-justify">
                And here's us planning out some stuff together at our old place. We will miss you 7 Manning 💔.
            </p>
            <ImageWithSkeleton src="/assets/content_manning_pic.png" alt="Rex coding" className="rounded-lg" />
        </div>
    },
    {
        title: "Monogrid",
        description:
        "a cloud based video transcoding app hosted and powered by AWS services",
        image: "/assets/header_aws.png",
        content: 
        <div>
            <ImageWithSkeleton src="/assets/content_monogrid_lead.png" alt="monogrid landing page" className="rounded-md"/>
            <p className="py-5 text-justify" >
                Monogrid is a Cloud Computing project for one of my university’s units which I wanted to highlight since I had major takeaways and a really good learning experience.
            </p>
            <ImageWithSkeleton src="/assets/content_monogrid_diagram.png" alt="monogrid architecture diagram" className="rounded-md"/>
            <p className="py-5 text-justify">
                This video transcoding project was hosted on an EC2 instance fronted by a CloudFront CDN where transcode jobs on ECS can be scaled horizontally based on the SQS (Simple Queue System) depth. 
                The AWS environment provided also allowed me to explore various database and data storage options like RDS (PostgreSQL), DynamoDB, Elasticache and S3 objects store. 
                The app's domain is right here.
            </p>  
            <LinkPill 
                href="https://start.monogrid.cab432.com"
                icon={ <IconLink /> }
            >
                start.monogrid.cab432.com
            </LinkPill>
            <p className="pt-5 text-justify"> 
                While I would really like for you to try this website out for yourself, I am pretty sure my university would have pruned the domain registry by the time you are reading this. 
                If you do have a chance to try it out, I hope you enjoy navigating the app. 
                This project's code is also available on my GitHub account if you would still like to take a peek.
            </p>
            <p className="py-5 text-justify">
                I found that this hands on learning experience had a profound effect on myself, since I was able to actually interact with these cloud services to compartmentalise and optimise features to be production ready (i.e. scalable and accessible). 
                Moving forward I want to expand on this domain of expertise more, hopefully becoming a Solutions Architect in the future.
            </p>
        </div>
    },
    {
        title: "Udemy Certificates",
        image: "/assets/header_udemy.png",
        content: 
        <div className="space-y-8">
      
          {/* 100 Days of Code */}
          <div>
            <p className="py-2"><strong>100 Days of Code: The Complete Python Pro Bootcamp</strong></p>
            <p className="py-2 pb-5 text-justify">
              A hands-on Python course taught by Dr. Angela Yu that helped me deepen my programming foundations while building over a hundred mini-projects. 
              It covered object-oriented design, APIs, Flask web apps, web scraping, GUI development with Tkinter, and deployment workflows — reinforcing 
              practical problem-solving through daily repetition and progressive complexity. Completing this course cemented my confidence in writing clean, 
              maintainable Python code across multiple domains.
            </p>
            <LinkPill 
                href="https://www.udemy.com/certificate/UC-9251ef7c-e298-4167-9d7b-1e51a540e14b/"
                icon={ <IconLink /> }
            >
                View Certificate
            </LinkPill>
          </div>
      
          {/* Drupal for Absolute Beginners */}
          <div>
            <p className="py-2"><strong>Drupal for Absolute Beginners</strong></p>
            <p className="py-2 pb-5 text-justify">
              
              This introductory course guided me through setting up, theming, and customising a content management system using Drupal. 
              I learned the fundamentals of content types, taxonomy, modules, and user roles, and how to extend Drupal with custom themes 
              and configuration management. The course helped me understand the architecture and flexibility of CMS-based web development 
              beyond traditional static or React-based sites.
            </p>
            <LinkPill 
                href="https://www.udemy.com/certificate/UC-0a300b99-f166-4904-9dcf-18633bdab7ad/"
                icon={ <IconLink /> }
            >
                View Certificate
            </LinkPill>
          </div>
      
          {/* AWS Solutions Architect */}
          <div>
            <p className="py-2"><strong>Ultimate AWS Certified Solutions Architect Associate (2025)</strong></p>
            <p className="py-2 pb-5 text-justify">
              Currently in progress — this course dives deep into AWS infrastructure design, focusing on resilience, scalability, and cost optimisation. 
              It covers EC2, S3, RDS, Route 53, CloudFront, VPC networking, IAM, and CloudFormation. I’ve been applying these concepts to my own projects 
              (such as <em>Monogrid</em>), and plan to sit the AWS SAA-C03 certification exam soon. This course has given me practical insight into 
              architecting production-ready cloud solutions that align with AWS best practices.
            </p>
            <LinkPill 
                href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/"
                icon={ <IconLink /> }
            >
                View Course
            </LinkPill>
          </div>
      
        </div>
    },
    {
        title: "Minor Projects",
        image: "/assets/header_minor_projects.jpg",
        content: 
        <div className="space-y-8">
          {/* Rain Alert App */}
          <div className="space-y-4">
            <p><strong>Rain Predictor</strong></p>
            <p className="text-justify">
              A Python automation script that checks the next 12 hours of weather data using the OpenWeatherMap API and 
              sends an SMS alert to my phone via Twilio if rain is forecasted. 
              This project combined multiple APIs, JSON parsing, and environment variable management to create a 
              real-world automation pipeline that runs entirely from the command line. 
              It was one of my favourite exercises because it connected data processing, condition logic, and an external notification service.
            </p>
          </div>
      
          {/* Movie Tierlist Database */}
          <div className="space-y-4">
            <p><strong>Movie Tierlist Database</strong></p>
            <p className="text-justify">
              A full-stack project using Python, Flask, and MySQL that allows users to browse, rank, and comment on their favourite movies. 
              The app integrates the TMDb API for film metadata and stores user rankings in a local MySQL database, 
              demonstrating CRUD operations and ORM-style interactions. 
              I learned to design relational schemas, handle form submissions, and connect Flask routes to persistent data layers.
            </p>
          </div>
      
          {/* Flight Price Tracker */}
          <div className="space-y-4">
            <p><strong>Flight Price Tracker</strong></p>
            <p className="text-justify">
              A Python-based deal finder that monitors flight prices using the Tequila Kiwi API and emails the user whenever a price drop occurs. 
              It features a Google Sheet integration via Sheety for destination management and uses SMTP for notification delivery. 
              This project taught me about RESTful APIs, authentication tokens, and how to manage rate-limited API calls for continuous data tracking.
            </p>
          </div>
      
          {/* Habit Tracker */}
          <div className="space-y-4">
            <p><strong>Habit Tracker</strong></p>
            <p className="text-justify">
              A data visualisation project that uses the Pixela API to log and graph daily habits (like coding, fitness, or reading). 
              The program interacts with a REST API through POST and PUT requests to update personal streaks, displaying progress as a pixel grid. 
              It introduced me to RESTful endpoint design, HTTP methods, and the power of visual feedback in habit formation.
            </p>
          </div>
          {/* Monkey Tracker */}
          <div className="space-y-4">
            <p><strong>Monkey Tracker</strong></p>
            <p className="text-justify">
              An image based classification web app that detects and identifies different 'monkey poses' in real time using a lightweight TensorFlow.js model. Built
              with a focus on speed and usability, the app captures images through the user's webcam, processing them through a custom trained pose recognition 
              pipeline, and returns the most likely monkey pose with high accuracy.
            </p>
            <LinkPill 
                href="https://github.com/jawshuachan/monkey-tracker"
                icon={ <IconBrandGithub /> }
            >
                View on GitHub
            </LinkPill>
          </div>
          {/* Recnet */}
          <div className="space-y-4">
            <p><strong>Recnet</strong></p>
            <p className="text-justify">
              This is an ongoing Angular project where I'm basically using the app as an excuse to level up my Angular skills and experiment with Neo4j as a graph database. 
              The idea is to build a modern and clean frontend while learning how to model relationships and queries in a way that actually takes advantage of graph structures.
              It's still in its early days, flushing out the appropriate features for the ideal user but its showing some fun potential as a sandbox to test out new technologies.
            </p>
            <LinkPill 
                href="https://github.com/jawshuachan/recnet"
                icon={ <IconBrandGithub /> }
            >
                View on GitHub
            </LinkPill>
          </div>
        </div>
    },
    {
        title: "Experian",
        description: "my first internship.",
        image: "/assets/header_experian.png",
        content: 
        <div>
            <ImageWithSkeleton src="/assets/content_experian_body.png" alt="Experian office space" className="rounded-md"/>
            <p className="py-5 text-justify">
                Experian was my very first internship, and honestly, it was where I really started to connect everything I’d been learning about data and AI. 
                I joined as a tech intern on the IT team, where I explored how large-scale data platforms could integrate emerging generative AI systems for smarter client insights. 
                It was my first exposure to enterprise-level architecture, and how tools like SQL databases, pipelines, and API models all come together to power decisioning platforms that affect millions of people.
            </p>

            <ImageWithSkeleton src="/assets/content_experian_stuff.png" alt="Experian AI research workspace" className="rounded-md"/>
            <p className="pt-5 text-justify">
                My main focus was on researching the potential of generative AI in business intelligence — how natural language models could help streamline report generation, 
                query structured databases more intuitively, and assist non-technical users in drawing insights from complex data. 
                I experimented with prompt design, embeddings, and text-to-SQL methods using Python prototypes while exploring how to safely align them with Experian’s compliance and privacy frameworks.
            </p>
            <p className="py-5 text-justify">
                Alongside the research, I deepened my understanding of traditional data systems, learning how Experian manages massive relational databases, 
                maintains data integrity across pipelines, and designs dashboards that scale globally. 
                It gave me an appreciation for how both classical and modern approaches can work together: structured data foundations supporting AI-driven automation on top.
            </p>

            <ImageWithSkeleton src="/assets/content_experian_end.png" alt="Experian research group" className="rounded-md"/>
            <p className="py-5 text-justify">
                More than anything, that internship gave me a taste of what applied AI looks like in a corporate setting, where innovation meets regulation, and every technical idea has to balance precision with accountability. 
                It was a huge learning curve, but one that left me excited about the intersection of data systems, cloud engineering, and generative intelligence. 
                It also helped shape my interest in building scalable, explainable AI solutions, not just models that work, but ones that can actually be trusted.
            </p>
        </div>
    },
    ];
    return(
        <div className="flex flex-col h-[65vh] md:w-[123.5vh] md:border md:rounded-lg md:px-0 md:py-0">
            <div className="h-full max-h-full overflow-hidden rounded-xl border border-border/40 md:border-0">
                <ScrollArea className="h-full w-full rounded-xl">
                    <div className="p-4">
                        <BentoGrid className="mx-auto max-w-4xl">
                            {items.map((item, i) => (
                            <BentoGridItem
                            key={i}
                            title={item.title}
                            description={isMdUp || (i !== 3 && i !== 6) ? item.description : undefined}
                            image={item.image}
                            variant={isMdUp && (i === 3 || i === 6) ? "large" : "small"}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                            content={item.content}
                            />
                            ))}
                        </BentoGrid> 
                    </div>
                    <ProgressiveBlur position='bottom' height='5%'/>
                </ScrollArea>
            </div>
        </div>
    )
}


//--------------------------------------------------------------- links ---------------------------------------------------------------


function Links(){
    const iconButtonClasses = "rounded-2xl border px-6 py-7 sm:px-8 sm:py-8";
    const iconSizeClasses = "size-8 sm:size-10";
    const contactRowClasses = "flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-5 sm:text-left";

    return(
        <div className="h-full flex items-center justify-center">
            <ScrollArea className="h-full w-full rounded-md">
                <div className="relative isolate mx-auto max-w-5xl px-4 py-12 sm:px-8 lg:py-16">
                    <div className="title text-center">
                        <h1 className="text-4xl font-[Hedvig Sans] sm:text-6xl lg:text-8xl">signing off...</h1>
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
                            <a href="https://www.linkedin.com/in/joshua-chan-bp37/" target="_blank">
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
                            <a href="https://github.com/jawshuachan" target="_blank">
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
                                            <span className='inline-block overflow-hidden w-5 h-5 rounded-xs'>
                                                <CircleFlag countryCode='my' className='h-full w-full object-cover' />
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
                                                        variant={"outline"} 
                                                        onClick={() => {
                                                            navigator.clipboard
                                                              .writeText("+60128918936")
                                                              .then(() => {
                                                                toast.success("Copied to clipboard!");
                                                              })
                                                              .catch(() => {
                                                                toast.error("Failed to copy!");
                                                              });
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
                                            <span className='inline-block overflow-hidden w-5 h-5 rounded-xs'>
                                                <CircleFlag countryCode="au" className='h-full w-full object-cover' />
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
                                                        variant={"outline"} 
                                                        onClick={() => {
                                                            navigator.clipboard
                                                              .writeText("+61452358936")
                                                              .then(() => {
                                                                toast.success("Copied to clipboard!");
                                                              })
                                                              .catch(() => {
                                                                toast.error("Failed to copy!");
                                                              });
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
                                        <div className='pb-8'>
                                            <Button variant="outline" className='w-full max-w-xs'>Close</Button>
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
                                    <Button variant="ghost" className={iconButtonClasses} >
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
                                                <span className='inline-block overflow-hidden w-5 h-5 rounded-xs'>
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
                                                            variant={"outline"} 
                                                            onClick={() => {
                                                                navigator.clipboard
                                                                .writeText("joshuawjchan@gmail.com")
                                                                .then(() => {
                                                                    toast.success("Copied to clipboard!");
                                                                })
                                                                .catch(() => {
                                                                    toast.error("Failed to copy!");
                                                                });
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
                                                <span className='inline-block overflow-hidden w-5 h-5 rounded-xs'>
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
                                                            variant={"outline"} 
                                                            onClick={() => {
                                                                navigator.clipboard
                                                                .writeText("joshuawjchan@hotmail.com")
                                                                .then(() => {
                                                                    toast.success("Copied to clipboard!");
                                                                })
                                                                .catch(() => {
                                                                    toast.error("Failed to copy!");
                                                                });
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
                                            <div className='pb-8'>
                                                <Button variant="outline" className='w-full max-w-xs'>Close</Button>
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
                            <a href="https://www.instagram.com/joshuaachan/" target="_blank">
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
                            <a href="https://www.facebook.com/37.JoshuaChan" target="_blank">
                                <IconBrandFacebook className={iconSizeClasses} />
                            </a>
                        </Button>
                    </motion.button>
                </div>
            </ScrollArea>
        </div>
    )
}


export {
    Home,
    Stack,
    Portfolio,
    Links
}
