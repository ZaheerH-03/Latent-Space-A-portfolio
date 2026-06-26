import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: "Latent Space | Shaik Zaheer Hussain",
  description: "AI & ML engineering portfolio — RAG systems, agentic AI, and computer vision.",
  openGraph: {
    title: "Latent Space | Shaik Zaheer Hussain",
    description: "AI & ML engineering portfolio — RAG systems, agentic AI, and computer vision.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Latent Space | Shaik Zaheer Hussain",
    description: "AI & ML engineering portfolio — RAG systems, agentic AI, and computer vision.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
