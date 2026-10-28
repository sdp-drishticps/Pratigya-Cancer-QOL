import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-8xl font-bold text-[#2B3674]">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-3 max-w-md text-slate-500">
          The page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <Button
          asChild
          className=" mt-9 h-9 border-[#2B3674] bg-white text-[#2B3674] hover:bg-[#2B3674] hover:text-white 
"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      <Footer />
    </>
  );
}
