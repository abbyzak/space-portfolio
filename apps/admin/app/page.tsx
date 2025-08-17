import { StatsCards } from "@/components/stats-cards";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your company portfolio content</p>
      </div>
      
      <StatsCards />
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/company"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-medium text-gray-900">Update Company Info</h3>
            <p className="text-sm text-gray-600 mt-1">Edit company details and contact information</p>
          </a>
          <a
            href="/projects"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-medium text-gray-900">Manage Projects</h3>
            <p className="text-sm text-gray-600 mt-1">Add, edit, or remove portfolio projects</p>
          </a>
          <a
            href="/bookings"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-medium text-gray-900">View Bookings</h3>
            <p className="text-sm text-gray-600 mt-1">Manage consultation bookings</p>
          </a>
        </div>
      </div>
    </div>
  );
}