/* eslint-disable react/jsx-filename-extension */
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CodeWalnut Poke API",
  description: "Tech Test",
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Image
          src="/images/pokeapi.png"
          alt="Pokiapi logo"
          width={180}
          height={38}
          priority
        />

        <div className="main">{props.children}</div>
      </body>
    </html>
  );
}
