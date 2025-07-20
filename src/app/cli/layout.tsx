import { Metadata } from "next";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acto CLI Portfolio",
  description: "experience my portfolio as a CLI app.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={`${firaCode.className}`}>{children}</main>;
}
