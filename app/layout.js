import { inter } from "@/lib/fonts";
import "./globals.css";

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'blue' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  colorScheme: 'light',
}

export const metadata = {
  metadataBase: new URL('https://berbereen.vercel.app'),
  other: {
    "google-site-verification": "0R28Xy-oyNhcE2_MB10Jrkoayy5JcPf7mkx89IIMySk"
  },
  title: {
    template: '%s | Berbereen',
    default: 'Home',
  },
  description: "The platform of Berbereenians",
     manifest: "/manifest.json",
     openGraph: {
       title: "Berbereen",
       description: "The platform of Berbereenians",
       url: "/",
       siteName: "Berbereen",
       locale: "en-US",
       type: "website",
       authors: ['Adhham Safwan']
     },
     twitter: {
      card: 'summary_large_image',
      title: 'Berbereen',
      description: 'The platform of Berbereenians',
      creator: '@AdhhamDev',
      creatorId: '@AdhhamDev',
      app: {
        name: 'Berbereen',
        url: {
          iphone: '/',
          ipad: '/',
        },
      },
    },
    appleWebApp: {
      title: 'Berbereen',
      statusBarStyle: 'black-translucent',
      startupImage: [
        '/icon.jpg'
      ],
    },
     robots: {
       index: true,
       follow: true,
       googleBot: {
         index: true,
         follow: true,
         "max-video-preview": -1,
         "max-image-preview": "large",
         "max-snippet": -1,
       },
     },
     generator: "Berbereen",
     applicationName: "Berbereen",
     referrer: "origin-when-cross-origin",
     keywords: ["berbereen", "beruwala", "community", "platform"],
     authors: [
       { name: "Adhham Safwan", url: "https://adhhamdev.vercel.app" },
     ],
     creator: "Adhham Safwan",
     publisher: "Adhham Safwan",
     category: "community",
     classification: "community",
     language: "en-US",
     hostingProvider: "Vercel",
     hostingProviderUrl: "https://vercel.com",
     category: 'social',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} scroll-smooth bg-slate-50`}>{children}</body>
    </html>
  );
}
