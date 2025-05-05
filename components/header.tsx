import Link from "next/link"
import { UserButton } from "@daveyplate/better-auth-ui"
import { Button } from "./ui/button"

export async function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#1A1A2E]/80 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-8">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 text-white hover:text-white/90 transition-colors">
                        <svg id="Capa_1" enableBackground="new 0 0 512 512" height="24" width="24" className="sm:h-8 sm:w-8" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <g>
                                                <g>
                                                    <g id="XMLID_428_">
                                                        <g id="XMLID_429_">
                                                            <g id="XMLID_430_">
                                                                <g id="XMLID_828_">
                                                                    <g id="XMLID_829_">
                                                                        <g id="XMLID_830_">
                                                                            <g id="XMLID_831_">
                                                                                <g id="XMLID_836_">
                                                                                    <g id="XMLID_837_">
                                                                                        <g id="XMLID_838_">
                                                                                            <g id="XMLID_839_">
                                                                                                <g id="XMLID_842_">
                                                                                                    <g id="XMLID_845_">
                                                                                                        <g id="XMLID_848_">
                                                                                                            <g>
                                                                                                                <path d="m512 256c0 120.133-82.757 220.944-194.37 248.532 0 0-32.223-11.946-53.47-11.946-15.238 0-52.831 15.53-52.831 15.53-120.085-21.134-211.329-125.974-211.329-252.116 0-46.865 12.595-90.79 34.583-128.574 0 0 23.667-24.785 33.259-36.144 13.441-15.918 38.169-42.761 38.169-42.761 42.151-30.525 93.969-48.521 149.989-48.521 66.96 0 127.91 25.71 173.53 67.79 0 0 17.979 36.28 29.289 53.22 9.99 14.97 35.371 41 35.371 41 11.5 29.1 17.81 60.81 17.81 93.99z" fill="#753dc6"/>
                                                                                                            </g>
                                                                                                        </g>
                                                                                                    </g>
                                                                                                </g>
                                                                                            </g>
                                                                                        </g>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <path d="m220.995 113.979-91.963-4.639 8.217 144.745 86.4 86.4-22.46 122.19 35.966 35.966c9.97-3.235 20.514-6.054 27.005-6.054 21.247 0 53.47 11.946 53.47 11.946 111.613-27.589 194.37-128.4 194.37-248.533 0-33.18-6.31-64.89-17.81-93.99 0 0-25.381-26.03-35.371-41-11.31-16.94-29.289-53.22-29.289-53.22l-104.031 150.692z" fill="#4c2a9b"/>
                        </svg>
                        <span className="font-bold text-base sm:text-lg">Rock Paper Scissors</span>
                    </Link>
                    
                    <nav className="hidden sm:flex items-center gap-2">
                        <Link href="/play">
                            <Button 
                                variant="ghost" 
                                className="text-white hover:text-white hover:bg-white/10"
                            >
                                Play Game
                            </Button>
                        </Link>
                        <Link href="/leaderboard">
                            <Button 
                                variant="ghost"
                                className="text-white hover:text-white hover:bg-white/10"
                            >
                                Leaderboard
                            </Button>
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <nav className="flex sm:hidden items-center gap-2">
                        <Link href="/play">
                            <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-white hover:text-white hover:bg-white/10"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Button>
                        </Link>
                        <Link href="/leaderboard">
                            <Button 
                                variant="ghost"
                                size="icon"
                                className="text-white hover:text-white hover:bg-white/10"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </Button>
                        </Link>
                    </nav>
                    <UserButton />
                </div>
            </div>
        </header>
    )
}
