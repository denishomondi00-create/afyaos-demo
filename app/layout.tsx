import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://afyaos.vercel.app"),
  title: {
    default: "AFYA OS | Community care concept preview",
    template: "%s | AFYA OS",
  },
  description:
    "A concept preview of AFYA OS — community mental health, primary healthcare and NCD care connected from the household to population-level insight.",
  applicationName: "AFYA OS",
  authors: [{ name: "Frank Denish Omondi" }],
  creator: "Frank Denish Omondi",
  keywords: [
    "AFYA OS",
    "community health",
    "Kenya",
    "Daktari AI",
    "Afya Grid",
    "mental health",
    "primary healthcare",
    "NCD care",
    "continuity of care",
  ],
  openGraph: {
    title: "AFYA OS — Human wellbeing. Intelligent infrastructure.",
    description:
      "A pre-pilot concept preview of community care connected from the household visit to referral, follow-up and population-level insight.",
    type: "website",
    locale: "en_KE",
    siteName: "AFYA OS",
    images: [{ url: "/brand/afyaos-logo.png", width: 1983, height: 793, alt: "AFYA OS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFYA OS",
    description: "Human wellbeing. Intelligent infrastructure.",
    images: ["/brand/afyaos-logo.png"],
  },
  icons: { icon: "/brand/afyaos-logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F6B4C",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
