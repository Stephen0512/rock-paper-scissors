import type { Metadata } from "next"
import "@/styles/globals.css"
import { Header } from "@/components/header"
import type { ReactNode } from "react"
import { Providers } from "./providers"

export const metadata: Metadata = {
    title: "Rock Paper Scissors Game",
    description: "Play Rock Paper Scissors against AI with a modern UI and authentication system",
    icons: {
        icon: [
            { url: '/logo.svg', type: 'image/svg+xml' },
        ],
    },
}

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans antialiased bg-[#5D3FD3] min-h-screen overflow-hidden">
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1 relative">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
