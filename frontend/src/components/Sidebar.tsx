export default function Sidebar() {
  return (
    <aside className="w-1/4 bg-gray-800 text-white p-6 flex flex-col justify-between">
      <div>
        <div className="mb-8 flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">Event Overview</h3>
            <p className="text-sm text-gray-400">info@eventsphere.com</p>
          </div>
        </div>
        <nav>
          <ul>
            <li className="mb-6">
              <a
                href="#"
                className="flex items-center space-x-3 p-2 text-lg font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <span>📅</span> <span>Event Overview</span>
              </a>
            </li>
            <li className="mb-6">
              <a
                href="#"
                className="flex items-center space-x-3 p-2 text-lg font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <span>📚</span> <span>Event Classes</span>
              </a>
            </li>
            <li className="mb-6">
              <a
                href="#"
                className="flex items-center space-x-3 p-2 text-lg font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <span>🎓</span> <span>Event Grades</span>
              </a>
            </li>
            <li className="mb-6">
              <a
                href="#"
                className="flex items-center space-x-3 p-2 text-lg font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <span>🎤</span> <span>Event Speakers</span>
              </a>
            </li>
            <li className="mb-6">
              <a
                href="#"
                className="flex items-center space-x-3 p-2 text-lg font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <span>📝</span> <span>Event Notes</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <a
          href="#"
          className="flex items-center space-x-3 p-2 text-lg font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition"
        >
          <span>⚙️</span> <span>Event Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 p-2 text-lg font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition mt-4"
        >
          <span>🔓</span> <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
}