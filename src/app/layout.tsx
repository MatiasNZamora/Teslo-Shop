import type { Metadata } from "next";
import { geistSans } from '../config/fonts';
import "./globals.css";
import { Provider } from "../components";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Tienda virtual de productos Tesla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`} >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
