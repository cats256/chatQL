import { ApolloWrapper } from "@/providers/ApolloWrapper";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ApolloWrapper>
            <NextAuthProvider>
                <html lang="en">
                    <body className={inter.className}>
                        <Providers>
                            {children}
                            <Toaster />
                        </Providers>
                    </body>
                </html>
            </NextAuthProvider>
        </ApolloWrapper>
    );
}
