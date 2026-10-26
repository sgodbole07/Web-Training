import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Project Explorer",
    template: "%s | Project Explorer",
  },
  description: "A lightweight project management portal built with the Next.js App Router.",
};

const themeScript = `try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main className="container page">{children}</main>
        <footer className="footer">
          <div className="container">Project Explorer · Built with Next.js App Router</div>
        </footer>
      </body>
    </html>
  );
}
