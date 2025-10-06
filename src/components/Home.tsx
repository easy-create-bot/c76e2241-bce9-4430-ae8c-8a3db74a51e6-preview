import { useEffect, useRef, useState } from "react"
import Navbar from "./Navbar"
import { motion, useAnimate, useInView } from "motion/react"
import { stagger } from "motion"

const itemVariants = {
    open: {
        y: [-50, 0],
        opacity: 1,
        transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: { y: { stiffness: 1000 } },
    },
}

export default function Home() {
    const links = [{ label: 'Examples' }, { label: 'Why' }, { label: 'Workflow' }, { label: 'Pricing' }]
    const [selectedTab, setSelectedTab] = useState<{ label: string } | null>(null)

    const mainRef = useRef<HTMLDivElement | null>(null)

    const examplesRef = useRef<HTMLElement | null>(null)
    const isExamplesInView = useInView(examplesRef)
    const whyRef = useRef<HTMLElement | null>(null)
    const isWhyInView = useInView(whyRef)
    const workflowRef = useRef<HTMLElement | null>(null)
    const isWorkflowInView = useInView(workflowRef)
    const quoteRef = useRef<HTMLElement | null>(null)
    const isQuoteInView = useInView(quoteRef)

    useEffect(() => {
        if (isExamplesInView) {
            setSelectedTab({ label: 'Examples' })
        } else if (isWhyInView) {
            setSelectedTab({ label: 'Why' })
        } else if (isWorkflowInView) {
            setSelectedTab({ label: 'Workflow' })
        } else if (isQuoteInView) {
            setSelectedTab({ label: 'Pricing' })
        }
    }, [isExamplesInView, isWhyInView, isWorkflowInView, isQuoteInView])

    const scrollToQuote = () => {
        if (quoteRef.current) {
            quoteRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleClick = (item: { label: string }) => {
        setSelectedTab(item)
        if (item.label === 'Examples') {
            examplesRef.current?.scrollIntoView({ behavior: "smooth" })
        } else if (item.label === 'Why') {
            whyRef.current?.scrollIntoView({ behavior: "smooth" })
        } else if (item.label === 'Workflow') {
            workflowRef.current?.scrollIntoView({ behavior: "smooth" })
        } else if (item.label === 'Pricing') {
            quoteRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }

    const headerVariants = {
        open: {
            transition: { delayChildren: stagger(0.3, { startDelay: 0.1 }) },
        },
        closed: {
            transition: { delayChildren: stagger(0.05, { from: "last" }) },
        },
    }

    return <div ref={mainRef} className="relative flex flex-col mb-4">
        <Navbar links={links} selectedTab={selectedTab} handleClick={handleClick} />
        <motion.div variants={headerVariants} initial="closed" animate="open" className="flex flex-col gap-16">
            <Header scrollToQuote={scrollToQuote} />
            <Examples ref={examplesRef} />
            <Why ref={whyRef} />
            <DevelopmentWorkflow ref={workflowRef} />
            <Pricing ref={quoteRef} />
        </motion.div>

    </div>
}

function  Header({ scrollToQuote }:{ scrollToQuote:()=>void }) { return <motion.header className="relative w-full flex flex-col px-6 h-[250px] sm:h-[300px] items-center justify-center"><img src="/header.png" className="absolute top-0 left-0 w-full h-full object-cover img-blur"/><motion.div className="z-20 flex flex-col items-center text-green-500"><motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl font-header">Jace Genereux</motion.h1><motion.span variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-body text-center">Bring your website idea to life</motion.span><motion.button whileHover={{ scale:1.04 }} variants={itemVariants} onClick={scrollToQuote} className="cursor-pointer relative inline-flex items-center justify-center px-2 md:px-4 py-1 md:py-2 rounded-full font-nav text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-white/10 border border-white/30 backdrop-blur-xs shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-white/20 hover:border-white/50 hover:shadow-[0_12px_40px_rgba(124,58,237,0.0)]">Get Quote</motion.button></motion.div></motion.header>}

function Examples({ ref }: { ref: React.RefObject<HTMLElement | null> }) {
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768 && window.innerWidth < 1024)

    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const examples = [
        {
            title: 'Homepage design',
            img: 'https://placehold.co/600x400',
            explanation: 'If you want to build/redesign only a homepage for your site.'
        },
        {
            title: 'Ecommerce Websites',
            img: 'https://placehold.co/600x400',
            explanation: 'If you want to create a website to sell your products.'
        },
        {
            title: 'AI Applications',
            img: 'https://placehold.co/600x400',
            explanation: 'If you want to build applications that use AI agents (Chatbot, general workflows).'
        },
    ]

    return <section ref={ref} className="flex flex-col w-full justify-center items-center gap-2">
        <motion.span variants={itemVariants} className="text-4xl sm:text-5xl md:text-5xl font-header-light">Build Any Website</motion.span>
        {isMediumScreen ?
            <div className="flex flex-col gap-4 px-8 w-[85%] items-center justify-center">
                <div className="flex flex-row gap-4">
                    <Example title={examples[0].title} img={examples[0].img} explanation={examples[0].explanation} />
                    <Example title={examples[1].title} img={examples[1].img} explanation={examples[1].explanation} />
                </div>
                <Example title={examples[2].title} img={examples[2].img} explanation={examples[2].explanation} />
            </div>
            :
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 sm:px-8 justify-items-center w-[85%]">
                {examples?.map(({ title, img, explanation }, index) => {
                    return <Example key={index} title={title} img={img} explanation={explanation} />
                })}
            </div>
        }
    </section>
}

function Example({ title, img, explanation }: { title: string, img: string, explanation: string }) {
    const [scope, animate] = useAnimate()
    const [isModified, setIsModified] = useState(false)

    const handleStart = () => {
        const el = scope.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();

        const x = (window.innerWidth - rect.width) / 2 - rect.left;
        const y = (window.innerHeight - rect.height) / 2 - rect.top;

        const overlay = document.getElementById('blur-overlay') ?? (() => {
            const div = document.createElement('div');
            div.id = 'blur-overlay';
            Object.assign(div.style, {
                position: 'fixed',
                inset: '0',
                pointerEvents: 'none',
                zIndex: '100',
                backdropFilter: 'blur(0px)',
                background: 'rgba(0,0,0,0.0)'
            });
            document.body.appendChild(div);
            return div;
        })();

        console.log(overlay)

        animate(overlay, {
            backdropFilter: ['blur(0px)', 'blur(10px)'],
            background: ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.50)'],
            opacity: [0, 1]
        }, { duration: 0.5 });

        animate(el, { scale: [1, 1.4], zIndex: [0, 1000], x: [0, x], y: [0, y], opacity: [0, 1] }, { duration: 0.3 })
    }

    const handleEnd = async () => {
        const overlay = document.getElementById('blur-overlay')
        if (!overlay) return;
        animate(overlay, {
            backdropFilter: ['blur(10px)', 'blur(0px)'],
            background: ['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.0)'],
            opacity: [1, 0]
        }, { duration: 0.5 });

        overlay.remove()
        window.removeEventListener('pointerdown', handleEnd)
        await animate(scope.current, { scale: 1, zIndex: 0, x: 0, y: 0, opacity: 1 }, { duration: 0.3 })
        setIsModified(false)
    }

    const handleClick = () => {
        if (!isModified) {
            handleStart()
            setIsModified(true)
            setTimeout(() => {
                window.addEventListener('pointerdown', handleEnd, { once: true })
            }, 0)
        }
    }

    return <motion.div onClick={handleClick} ref={scope} variants={itemVariants} className="max-w-3xs sm:max-w-xs md:max-w-sm flex flex-col rounded-xl p-2 bg-white/10 border border-white/40 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
        <img src={img} className={isModified ? " " : "cursor-pointer"} />
        <p className="font-nav text-lg">{title}</p>
        <p className="font-body">{explanation}</p>
    </motion.div>
}

function Why({ ref }: { ref: React.RefObject<HTMLElement | null> }) {
    const skills = [
        {
            skill: 'Beat Any Quote',
            description: "Send your best quote; I’ll beat it if reasonable."
        },
        {
            skill: "Any Idea, Any Size",
            description: "From landing pages to complex apps."
        },
        {
            skill: 'AI‑Ready',
            description: "Chatbots, agents, and custom AI features."
        },
        {
            skill: 'Fast Delivery',
            description: 'Optimized for snappy performance.'
        }
    ]

    return <motion.section ref={ref} className="w-full flex flex-col justify-center items-center my-8">
        <div className="flex flex-col items-center text-center gap-2 mb-4">
            <span className="text-4xl sm:text-5xl md:text-5xl font-header-light tracking-tight leading-tight text-gray-900">Why Choose Me To Build It</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </div>
        <div className="px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills?.map(({ skill, description }, i) => {
                return <Skill key={i} index={i + 1} skill={skill} description={description} />
            })}
        </div>
    </motion.section >
}

function Skill({ index, skill, description }: { index: number, skill: string, description: string }) {
    return <motion.div whileHover={{ scale: 1.05, boxShadow: "0 16px 50px rgba(0,0,0,0.25), 0 0 0 2px rgba(0,0,0,0.2)" }} className="relative flex flex-col items-center justify-center text-center gap-1 my-2 w-56 h-56 rounded-full bg-gradient-to-br from-white/30 to-white/10 border border-white/50 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-black/10 transition-[box-shadow]">
        <p className="font-nav font-bold text-gray-900">{`${index}) ${skill}`}</p>
        <p className="font-body text-sm text-gray-700 opacity-90 px-4">{description}</p>
    </motion.div>
}

function DevelopmentWorkflow({ ref }: { ref: React.RefObject<HTMLElement | null> }) {
    const workflow = [
        { index: 0, title: 'Get A Quote', description: 'Fill out the form at the bottom of the page to get a quote for your website' },
        { index: 1, title: 'Quick Call', description: 'Quick 15 minute call to discuss the quote, general idea for the website, and other topics like design' },
        { index: 2, title: 'Send Design Ideas', description: 'If you have ideas for the design they can be sent throughout the entire development process' },
        { index: 3, title: 'Get Started', description: 'I will get started with building the website, I will provide a timeline which will let you know what will be completed and by when it will be completed.' },
        { index: 4, title: 'Notifications for objectives', description: 'As objectives on the timeline are reached, I will update you with screenshots and messages for feedback.' },
        { index: 5, title: 'Launch your website', description: 'Once development is complete it will be hosted through AWS, where we can make final changes if needed.' },
        { index: 6, title: 'Add features and maintain', description: 'Once deployed all that will be left is to add features and maintain it.' }
    ]

    return <section ref={ref} className="w-full flex flex-col px-8">
        <span className="self-center text-4xl sm:text-5xl md:text-5xl font-header-light text-center">Timeline Idea To Development </span>
        <div className="relative mx-auto w-full max-w-4xl">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-black/10 md:left-1/2" />
            <div className="flex flex-col gap-6 py-4">
                {workflow.map((wf, i) => (
                    <WorkflowCard key={i} workflow={wf} index={i} />
                ))}
            </div>
        </div>
    </section>
}

function WorkflowCard({ workflow, index }: { workflow: { index: number, title: string, description: string }, index: number }) {
    return <div className="relative pl-12 md:pl-0">
        <span className="absolute left-[10px] top-6 z-10 w-3 h-3 rounded-full bg-blue-500 border border-white/60 ring-1 ring-black/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 16px 50px rgba(0,0,0,0.20), 0 0 0 2px rgba(0,0,0,0.18)" }}
            className={`relative flex flex-col gap-2 my-2 min-h-[140px] rounded-xl bg-white/10 border border-white/40 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 p-4 ${index % 2 === 0 ? 'md:ml-[calc(50%+16px)] md:w-[calc(50%-32px)]' : 'md:mr-[calc(50%+16px)] md:w-[calc(50%-32px)] md:self-end'}`}
        >
            <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-white/40 to-white/10 border border-white/60 backdrop-blur-md font-nav font-bold text-gray-900 ring-1 ring-black/10">
                    {workflow.index + 1}
                </span>
                <p className="text-lg font-nav font-semibold text-gray-900">{workflow.title}</p>
            </div>
            <p className="font-body text-sm text-gray-700/90">{workflow.description}</p>
        </motion.div>
    </div>
}

function Pricing({ ref }: { ref: React.RefObject<HTMLElement | null> }) {
    return <section ref={ref} className="w-full px-6 py-12 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="mx-auto w-full max-w-5xl">
            <h1 className="text-5xl font-header-light text-center mb-8">Pricing</h1>

            <div className="rounded-2xl bg-white/10 border border-white/40 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                    <div className="text-lg font-body">
                        <p>
                            Prices are based on estimated development time. After launch, you only pay for hosting.
                            Share your idea below to get a tailored quote.
                        </p>
                    </div>

                    <div>
                        <form className="flex flex-col gap-4">
                            <label className="flex flex-col text-lg font-nav">
                                Email
                                <input type="email" className="mt-1 rounded-xl bg-white/80 border border-black/10 px-4 py-2 shadow-sm ring-1 ring-black/5 hover:border-black/20 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/20 transition-all duration-200" />
                            </label>
                            <label className="flex flex-col text-lg font-nav">
                                Subject (Optional)
                                <input type="text" className="mt-1 rounded-xl bg-white/80 border border-black/10 px-4 py-2 shadow-sm ring-1 ring-black/5 hover:border-black/20 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/20 transition-all duration-200" />
                            </label>
                            <label className="flex flex-col text-lg font-nav">
                                Inquiry
                                <textarea className="mt-1 rounded-xl bg-white/80 border border-black/10 px-4 py-2 resize-none h-44 shadow-sm ring-1 ring-black/5 hover:border-black/20 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/20 transition-all duration-200" />
                            </label>
                            <button type="button" className="self-center md:self-start cursor-pointer mt-2 w-fit rounded-full px-6 py-2 font-nav text-lg font-semibold text-white bg-black/80 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
}