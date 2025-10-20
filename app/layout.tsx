import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Price Comparator - Best Deals Across All Platforms",
  description: "Compare food prices across Zomato, Swiggy, Uber Eats and more. Find the best deals and offers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
