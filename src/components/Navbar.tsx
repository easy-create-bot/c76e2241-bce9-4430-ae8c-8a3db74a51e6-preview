import { motion } from 'motion/react'


export default function Navbar({ links, selectedTab, handleClick }: {
    links: { label: string }[], selectedTab: { label: string } | null,
    handleClick: (item: { label: string }) => void
}) {

    return (
        <nav className='fixed top-0 left-0 w-full bg-white z-50'>
            <ul className="flex flex-row gap-1 sm:gap-2 items-center justify-center w-full py-2 navbar-shadow">
                {links.map((item) => (
                    <motion.li
                        key={item.label}
                        initial={false}
                        className="relative cursor-pointer px-2"
                        onClick={() => handleClick(item)}
                    >
                        <div className="relative z-10 font-nav font-semibold text-lg md:text-xl">
                            {`${item.label}`}
                        </div>
                        {item.label === selectedTab?.label ? (
                            <motion.div
                                style={underline}
                                layoutId="underline"
                                id="underline"
                            />
                        ) : null}
                    </motion.li>
                ))}
            </ul>
        </nav>
    )
}

const underline: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    background: "rgb(211, 211, 211)",
    zIndex: 0
}