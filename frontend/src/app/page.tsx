import Sidebar from "@/components/Sidebar";
import EventOverview from "@/components/EventOverview";
import EventDetails from "@/components/EventDetails";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <EventOverview />
      </main>
      <aside className="w-1/4 p-6 bg-white">
        <EventDetails />
      </aside>
    </div>
  );
}