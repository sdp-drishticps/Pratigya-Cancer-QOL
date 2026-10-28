import FormsSidebar from "@/components/layout/Sidebar";

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <FormsSidebar />

      <main className="flex-1 p-4 bg-[#FCFCFF]">
        {children}
      </main>
    </div>
  );
}