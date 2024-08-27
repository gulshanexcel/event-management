export default function EventDetails() {
    return (
      <div>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Ongoing Event</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold text-gray-800">Event Basics</h4>
            <p className="text-gray-600 mt-2">Ends in: 45 min</p>
            <p className="text-gray-600 mt-2">Participants online: 34/40</p>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Event Grades</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-800">Mid-term</h4>
                <p className="text-gray-500">Summer Session</p>
              </div>
              <span className="text-4xl font-bold text-red-500">98</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-800">Art Exhibition</h4>
                <p className="text-gray-500">Summer Session</p>
              </div>
              <span className="text-4xl font-bold text-red-500">72</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-800">Mathematics & Science</h4>
                <p className="text-gray-500">Summer Session</p>
              </div>
              <span className="text-4xl font-bold text-red-500">34</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Event Inbox</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600">
              Your event proposal was approved! Contact support for assistance.
            </p>
          </div>
        </div>
      </div>
    );
  }