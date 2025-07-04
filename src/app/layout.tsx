import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "./styles/globals.css";

export const metadata = {
  title: "ACHN API 2.0 by Geraldine Ragsac",
  description: "A reboot of the ACNH API originally created by Alexis Lours (@alexislours on GitHub).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main className="w-full md:max-w-5xl mx-auto min-h-screen grow p-6">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
