import "./globals.css";

export const metadata = {
  title: "Elite AI Portfolio",
  description: "A premium, animated scrollytelling portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
