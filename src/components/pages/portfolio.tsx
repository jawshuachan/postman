import { useEffect, useState } from "react"
import { ImageWithSkeleton } from "../image-skeleton"
import LinkPill from "../link-pill"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { IconBrandGithub, IconLink } from "@tabler/icons-react"

export default function Portfolio() {
    const [isMdUp, setIsMdUp] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined") return
        const mediaQuery = window.matchMedia("(min-width: 768px)")
        const handler = (event: MediaQueryListEvent) => setIsMdUp(event.matches)
        setIsMdUp(mediaQuery.matches)
        mediaQuery.addEventListener("change", handler)
        return () => mediaQuery.removeEventListener("change", handler)
    }, [])
    const items = [
        {
            title: "Word Chain",
            image: "/assets/header_wordchain.png",
            content: (
                <div>
                    <div>
                        <ImageWithSkeleton src="/assets/content_wordchain_header.png" alt="user testing day image" className="rounded-md" />
                    </div>
                    <p className="py-5 text-justify">
                        Word Chain is a recent project I worked on which focused on problem solving, smart Artificial Intelligence usage, 
                        clean logical thinking, and working within constraints.
                    </p>
                    <p className="py-5 text-justify">
                        The task was simple: Create a word chain game using the n8n chat interface where every word must begin with the last
                        letter of the previous word. Player scores and games must be accounted for in a Games and Player table.
                    </p>
                    <LinkPill
                        href="https://github.com/jawshuachan/Word-Chain/tree/main"
                        icon={<IconLink />}
                    >
                        View on GitHub
                    </LinkPill>
                    <p className="py-5 text-justify">
                        Thankfully I had some experience with n8n, which didn't pose a problem, but the main challenge came with persistence
                        across messages in a chat. This was also my first time creating a chatbot using the n8n interface and I had to first solidify
                        the usage of Artificial Intelligence.
                    </p>
                    <p className="py-5 text-justify">
                        One of the fundamental design principals that I continually followed was the importance of determinism,
                        I decided early on that all routing, scoring, persistence and state transitions had to be deterministic AND reproducible.
                        The same input should always yield the same output.
                    </p>
                    <div>
                        <ImageWithSkeleton src="/assets/content_wordchain_output.png" alt="user testing day image" className="rounded-md" />
                    </div>
                    <p className="py-5 text-justify">
                        I then had to answer a pounding question, "What was AI's role in this game?" It seemed really simple initially, give the AI 10
                        rounds worth of memory and let it handle everything, but the more I thought about it, the less sense it made. Since I needed
                        scoring to be deterministic, AI's role in this game rapidly changed through different iterations. I settled on Gemini 3-rapid,
                        a quick but reliable model, it's sole purpose was to output a simple JSON scheme that graded the user's word based on its validity
                        and creativity, as well as provide a chat message response with the next word to chain off.
                    </p>

                    <p className="py-5 text-justify">
                        Then came the question of persistence: How then can I provide context after the fact?
                    </p>
                    <p className="py-5 text-justify">
                        Sessions and Games then became separate entities, a new Sessions table had to be created to store the current gameid 
                        and the game's current state. During retrieval, I realised that persisting every previously played word wasn't necessary
                        since scoring was the primary concern. Instead I delegated short-term memory to the AI by providing roughly 10 rounds of context. The
                        workflow then grew much bigger after implementation.
                    </p>
                    <div className="py-5">
                        <ImageWithSkeleton src="/assets/content_wordchain.png" alt="Word chain node map" className="rounded-md" />
                    </div>
                    <p className="py-5 text-justify">
                        Player stats and leaderboard tracking were handled after a game ends. To support this, a Leaderboard table was introduced, allowing results 
                        to only be written once and queried independently of live gameplay. This separatinon allows for lazy loading of leaderboard data, keeping 
                        game-end scenarios lighter while ensuring that rankings and player stats are fetched efficiently and ONLY when needed.
                    </p>
                    <p className="py-5 text-justify">
                        I was pretty satisfied overall with the project, I had learned a lot even for a short experience. Moving forward, I do hope to continue my
                        AI endeavours in a professional environment.
                    </p>
                </div>
            )
        },
        {
            title: "RecNet",
            image: "/assets/header_recnet.png",
            content: 
            <div>
                <div>
                    <ImageWithSkeleton src="/assets/content_recnet_header.png" alt="user testing day image" className="rounded-md" />
                </div>
                <p className="py-5 text-justify">
                    RecNet is a web application designed to help recommend movies to couples. This is still an ongoing project, primarily using Angular.js and Neo4j.
                    I came up with the idea during my free time overseas after feeling frustrated from being unable to find movies in common with my long distance partner.
                </p>
                <p className="py-5 text-justify">
                    Netflix movies and TV series are location-bound, adding on to the frustration of finding an interesting movie to begin with. This app then serves to 
                    understand your preferences by providing a Tinder-like experience of swiping on movies you like, then drawing recommendations based on genre, director or 
                    even actors.
                </p>
                <div>
                    <ImageWithSkeleton src="/assets/header_recnet.png" alt="user testing day image" className="rounded-md" />
                </div>
                <p className="py-5 text-justify">
                    That's where Neo4j comes into play. Its graph based structure makes it ideal for modelling relationships between users, movies, genres, directors and actors.
                    Instead of relying on rigid joins, recommendations can be derived by traversing meaningful connections in the graph, allowing the system to surface shared
                    interests naturally. On the backend, Bun is used as the runtime to keep development fast and lightweight with noticeably quicker startup times and a simpler
                    tooling setup compared to traditional Node.
                </p>
                <p className="py-5 text-justify">
                    On the backend, Bun is used as the runtime to keep development fast and lightweight with noticeably quicker startup times and a simpler
                    tooling setup compared to traditional Node. To keep updated with the project, do check out its GitHub page.
                </p>
                <LinkPill
                        href="https://github.com/jawshuachan/recnet"
                        icon={<IconLink />}
                    >
                        View on GitHub
                </LinkPill>
            </div>
        },
        {
            title: "Email Buddy",
            image: "/assets/header_emailbuddy.png",
            content: 
            <div>
                <div>
                    <ImageWithSkeleton src="/assets/content_emailbuddy_emails.png" alt="user testing day image" className="rounded-md" />
                </div>
                <p className="py-5 text-justify">
                    I use Notion Mail a lot. I love how everything is customisable and its so much easier to sort emails by what I ACTUALLY WANT TO SEE. I wanted to dive deeper into 
                    email functionality a little more after learning of n8n from a Fireship video:
                </p>
                <LinkPill
                        href="https://www.youtube.com/watch?v=bS9R6aCVEzw"
                        icon={<IconLink />}
                    >
                        n8n will change your life as a developer...
                </LinkPill>
                <p className="py-5 text-justify">
                    I saw this as the perfect opportunity to learn how to build a LLM from scratch! I wanted to pass the email into a classifier and label by importance based on the 
                    contents of the email. 
                </p>
                <LinkPill
                        href="https://github.com/jawshuachan/Email-Buddy"
                        icon={<IconLink />}
                    >
                        View on GitHub
                </LinkPill>
                <p className="py-5 text-justify">
                    To keep things clean and safe, Email Buddy calls a separate backend API to handle all the heavy lifting. This keeps email content, classification logic and any LLM-related 
                    processing away from the client, while also making it easier to experiment and iterate.
                </p>

            </div>
        },
        {
            title: "Monogrid",
            description:
                "a cloud based video transcoding app hosted and powered by AWS services",
            image: "/assets/header_aws.png",
            content: (
                <div>
                    <ImageWithSkeleton src="/assets/content_monogrid_lead.png" alt="monogrid landing page" className="rounded-md" />
                    <p className="py-5 text-justify">
                        Monogrid is a Cloud Computing project for one of my university’s units which I wanted to highlight since I had major takeaways and a really good learning experience.
                    </p>
                    <ImageWithSkeleton src="/assets/content_monogrid_diagram.png" alt="monogrid architecture diagram" className="rounded-md" />
                    <p className="py-5 text-justify">
                        This video transcoding project was hosted on an EC2 instance fronted by a CloudFront CDN where transcode jobs on ECS can be scaled horizontally based on the SQS (Simple Queue System) depth.
                        The AWS environment provided also allowed me to explore various database and data storage options like RDS (PostgreSQL), DynamoDB, Elasticache and S3 objects store.
                        The app's domain is right here.
                    </p>
                    <LinkPill
                        href="https://start.monogrid.cab432.com"
                        icon={<IconLink />}
                    >
                        start.monogrid.cab432.com
                    </LinkPill>
                    <p className="pt-5 text-justify">
                        While I would really like for you to try this website out for yourself, I am pretty sure my university would have pruned the domain registry by the time you are reading this.
                        If you do have a chance to try it out, I hope you enjoy navigating the app.
                        This project's code is also available on GitHub if you would still like to take a peek.
                    </p>
                    <LinkPill
                        href="https://github.com/jawshuachan/monogrid"
                        icon={<IconLink />}
                    >
                        View on GitHub
                    </LinkPill>
                    <p className="py-5 text-justify">
                        I found that this hands on learning experience had a profound effect on myself, since I was able to actually interact with these cloud services to compartmentalise and optimise features to be production ready (i.e. scalable and accessible).
                        Moving forward I want to expand on this domain of expertise more, hopefully becoming a Solutions Architect in the future.
                    </p>
                </div>
            )
        },
        {
            title: "University Projects",
            image: "/assets/header_cab202.png",
            content: (
                <div className="space-y-10">
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
                            icon={<IconBrandGithub />}
                        >
                            View on GitHub
                        </LinkPill>
                    </div>

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
                            icon={<IconBrandGithub />}
                        >
                            View on GitHub
                        </LinkPill>
                    </div>

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
                            icon={<IconBrandGithub />}
                        >
                            View on GitHub
                        </LinkPill>
                    </div>

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
                            icon={<IconLink />}
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
                            icon={<IconLink />}
                        >
                            View on GitHub
                        </LinkPill>
                    </div>
                </div>
            )
        },
        {
            title: "VIRA",
            image: "/assets/header_vira.png",
            content: (
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
                        icon={<IconLink />}
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
            )
        },
        {
            title: "Experian",
            description: "my first internship.",
            image: "/assets/header_experian.png",
            content: (
                <div>
                    <ImageWithSkeleton src="/assets/content_experian_body.png" alt="Experian office space" className="rounded-md" />
                    <p className="py-5 text-justify">
                        Experian was my very first internship, and honestly, it was where I really started to connect everything I’d been learning about data and AI.
                        I joined as a tech intern on the IT team, where I explored how large-scale data platforms could integrate emerging generative AI systems for smarter client insights.
                        It was my first exposure to enterprise-level architecture, and how tools like SQL databases, pipelines, and API models all come together to power decisioning platforms that affect millions of people.
                    </p>

                    <ImageWithSkeleton src="/assets/content_experian_stuff.png" alt="Experian AI research workspace" className="rounded-md" />
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

                    <ImageWithSkeleton src="/assets/content_experian_end.png" alt="Experian research group" className="rounded-md" />
                    <p className="py-5 text-justify">
                        More than anything, that internship gave me a taste of what applied AI looks like in a corporate setting, where innovation meets regulation, and every technical idea has to balance precision with accountability.
                        It was a huge learning curve, but one that left me excited about the intersection of data systems, cloud engineering, and generative intelligence.
                        It also helped shape my interest in building scalable, explainable AI solutions, not just models that work, but ones that can actually be trusted.
                    </p>
                </div>
            )
        },
        {
            title: "7 Manning's RSVP",
            image: "/assets/header_housewarming.jpg",
            content: (
                <div>
                    <ImageWithSkeleton src="/assets/content_manning_lead.png" alt="rsvp site landing page" className="rounded-md" />
                    <p className="py-5 text-justify">
                        7 Manning’s RSVP was a personal web project I built with my roommates, Rex and Jude to streamline invitations and guest responses for our housewarming!
                        It was a lightweight React application deployed via GitHub Pages, with a Firebase Database handling live reservation updates and authentication.
                    </p>

                    <ImageWithSkeleton src="/assets/content_manning_content.png" alt="reservation form" className="rounded-md" />
                    <p className="py-5 text-justify">
                        We made sure that the UI was really simple for anyone to understand.
                        People who wanted to RSVP could provide their name, a gift they'd like to give :P and a final confirmation since we needed a headcount for such a small place and food.
                        We kept the site up just for fun if you'd like to take a look.
                    </p>
                    <LinkPill
                        href="https://rsvpmanning-8db32.web.app/"
                        icon={<IconLink />}
                    >
                        rsvpmanning-8db32.web.app
                    </LinkPill>
                    <p className="py-5 text-justify">
                        And here's us planning out some stuff together at our old place. We will miss you 7 Manning 💔.
                    </p>
                    <ImageWithSkeleton src="/assets/content_manning_pic.png" alt="Rex coding" className="rounded-lg" />
                </div>
            )
        },
        {
            title: "Certifications",
            image: "/assets/header_udemy.png",
            content: (
                <div className="space-y-8">
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
                            icon={<IconLink />}
                        >
                            View Certificate
                        </LinkPill>
                    </div>

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
                            icon={<IconLink />}
                        >
                            View Certificate
                        </LinkPill>
                    </div>

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
                            icon={<IconLink />}
                        >
                            View Course
                        </LinkPill>
                    </div>
                </div>
            )
        },
        {
            title: "Minor Projects",
            image: "/assets/header_minor_projects.jpg",
            content: (
                <div className="space-y-8">
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

                    <div className="space-y-4">
                        <p><strong>Movie Tierlist Database</strong></p>
                        <p className="text-justify">
                            A full-stack project using Python, Flask, and MySQL that allows users to browse, rank, and comment on their favourite movies.
                            The app integrates the TMDb API for film metadata and stores user rankings in a local MySQL database,
                            demonstrating CRUD operations and ORM-style interactions.
                            I learned to design relational schemas, handle form submissions, and connect Flask routes to persistent data layers.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p><strong>Flight Price Tracker</strong></p>
                        <p className="text-justify">
                            A Python-based deal finder that monitors flight prices using the Tequila Kiwi API and emails the user whenever a price drop occurs.
                            It features a Google Sheet integration via Sheety for destination management and uses SMTP for notification delivery.
                            This project taught me about RESTful APIs, authentication tokens, and how to manage rate-limited API calls for continuous data tracking.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p><strong>Habit Tracker</strong></p>
                        <p className="text-justify">
                            A data visualisation project that uses the Pixela API to log and graph daily habits (like coding, fitness, or reading).
                            The program interacts with a REST API through POST and PUT requests to update personal streaks, displaying progress as a pixel grid.
                            It introduced me to RESTful endpoint design, HTTP methods, and the power of visual feedback in habit formation.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <p><strong>Monkey Tracker</strong></p>
                        <p className="text-justify">
                            An image based classification web app that detects and identifies different 'monkey poses' in real time using a lightweight TensorFlow.js model. Built
                            with a focus on speed and usability, the app captures images through the user's webcam, processing them through a custom trained pose recognition
                            pipeline, and returns the most likely monkey pose with high accuracy.
                        </p>
                        <LinkPill
                            href="https://github.com/jawshuachan/monkey-tracker"
                            icon={<IconBrandGithub />}
                        >
                            View on GitHub
                        </LinkPill>
                    </div>
                    <div className="space-y-4">
                        <p><strong>Recnet</strong></p>
                        <p className="text-justify">
                            This is an ongoing Angular project where I'm basically using the app as an excuse to level up my Angular skills and experiment with Neo4j as a graph database.
                            The idea is to build a modern and clean frontend while learning how to model relationships and queries in a way that actually takes advantage of graph structures.
                            It's still in its early days, flushing out the appropriate features for the ideal user but its showing some fun potential as a sandbox to test out new technologies.
                        </p>
                        <LinkPill
                            href="https://github.com/jawshuachan/recnet"
                            icon={<IconBrandGithub />}
                        >
                            View on GitHub
                        </LinkPill>
                    </div>
                </div>
            )
        }
    ]
    return (
        <div className="flex w-full min-h-screen flex-col md:pr-11 md:py-0">
            <div className="relative isolate flex flex-col items-center gap-6 px-4 py-20 text-center md:mx-auto md:max-w-5xl md:items-start md:px-8 md:py-20 lg:py-24">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 text-center">
                    <p className="title text-sm lowercase tracking-[0.2em] text-muted-foreground">
                        portfolio
                    </p>
                    <h2 className="subtitle text-4xl font-[Hedvig Sans] leading-tight text-foreground md:text-5xl lg:text-6xl">
                        A Tribute to Continual Learning
                    </h2>
                    <p className="description max-w-2xl text-base text-muted-foreground md:text-lg">
                        A curated collection of projects built in my personal time and through professional institutions.
                    </p>
                </div>
            </div>
            <div className="flex-1 w-full overflow-hidden rounded-xl border border-border/40">
                <div className="p-4">
                    <BentoGrid className="mx-auto p-1">
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
            </div>
        </div>
    )
}
