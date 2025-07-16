import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"], variable: "--font-inter"
});

export async function generateMetadata(): Promise<Metadata> {
  const image = "https://sitcon.org/2026/og.png";
  const title = "SITCON 2026";
  const description =
    "學生計算機年會（Students' Information Technology Conference）自 2012 年發起，以學生為本、由學生自發舉辦，長期投身學生資訊教育與推廣開源精神，鼓勵學生們成為實踐者，貢獻程式碼、打造並部署服務、透過實際行動推動專案，最後將這些結晶分享出去，讓更多人能關注你認為重要的議題，打造更緊密的社群。";
  const metadata: Metadata = {
    title,
    authors: [{ name: "SITCON" }],
    keywords: "SITCON, SITCON 2026",
    description,
    metadataBase: new URL("https://sitcon.org/2026/"),
    openGraph: {
      type: "website",
      locale: "zh_TW",
      url: "https://sitcon.org/2026/",
      title,
      description,
      siteName: "SITCON",
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      creator: "@sitcontw",
      site: "@sitcontw",
      card: "summary_large_image",
      images: image,
      title,
      description,
    },
  };
  return metadata;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "SITCON 2026",
    url: "https://sitcon.org/2026/",
    startDate: "2026-03-28T08:30+08:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "EventVenue",
      name: "中央研究院人文社會科學館 國際會議廳",
      address: "台北市南港區研究院路二段128號",
    },
    organizer: {
      "@type": "Organization",
      url: "https://sitcon.org",
      name: "SITCON 學生計算機年會",
      logo: "https://sitcon.org/branding/assets/logos/withname.png",
      sameAs: [
        "https://zh.wikipedia.org/wiki/%E5%AD%B8%E7%94%9F%E8%A8%88%E7%AE%97%E6%A9%9F%E5%B9%B4%E6%9C%83",
        "https://www.youtube.com/@SITCONtw",
        "https://www.facebook.com/SITCONtw/",
        "https://www.instagram.com/sitcon.tw/",
        "https://x.com/sitcontw",
        "https://www.linkedin.com/company/sitcon-tw/",
        "https://www.threads.net/@sitcon.tw",
        "https://flickr.com/photos/sitcon",
      ],
    },
    image: ["https://sitcon.org/2026/og.jpg"],
    description:
      "學生計算機年會（Students' Information Technology Conference）自 2012 年發起，以學生為本、由學生自發舉辦，長期投身學生資訊教育與推廣開源精神，鼓勵學生們成為實踐者，貢獻程式碼、打造並部署服務、透過實際行動推動專案，最後將這些結晶分享出去，讓更多人能關注你認為重要的議題，打造更緊密的社群。",
    endDate: "2026-03-28T18:00+08:00",
    performer: {
      "@type": "Organization",
      url: "https://sitcon.org",
      name: "SITCON 學生計算機年會",
      logo: "https://sitcon.org/branding/assets/logos/withname.png",
      sameAs: [
        "https://zh.wikipedia.org/wiki/%E5%AD%B8%E7%94%9F%E8%A8%88%E7%AE%97%E6%A9%9F%E5%B9%B4%E6%9C%83",
        "https://www.youtube.com/@SITCONtw",
        "https://www.facebook.com/SITCONtw/",
        "https://www.instagram.com/sitcon.tw/",
        "https://x.com/sitcontw",
        "https://www.linkedin.com/company/sitcon-tw/",
        "https://www.threads.net/@sitcon.tw",
        "https://flickr.com/photos/sitcon",
      ],
    },
    eventStatus: "EventScheduled",
  };

  return (
    <html lang="zh-TW" >
      <GoogleTagManager gtmId="GTM-NPVBCDZ" />
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html >
  );
} 
