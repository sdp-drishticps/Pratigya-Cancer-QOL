import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FormSidebar from "@/components/layout/Sidebar";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 bg-[#FCFCFF]">
        {/* Sidebar */}
        <FormSidebar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}