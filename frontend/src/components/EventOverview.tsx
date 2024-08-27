export default function EventOverview() {
  const events = [
    {
      title: "Event Management",
      description: "Explore event basics",
      time: "Event starts at 11 AM, Room 300",
      attendees: "Attendee count: 34",
      progress: "67%",
    },
    {
      title: "Event Details",
      description: "Understanding brain",
      time: "Next session: 10/5, 2 PM, Room 301",
      attendees: "Enrolled participants: 42",
      progress: "33%",
    },
    {
      title: "Economic Insights",
      description: "Exploring global markets",
      time: "Upcoming: 15/5, 11 AM",
      status: "Oral assessment online",
      registration: "Registration",
    },
    {
      title: "Literature",
      description: "Review session with",
      time: "Scheduled for 19/5, 9 AM",
      status: "One-on-one virtual meeting",
      registration: "Confirmed",
    },
  ];

  return (
    <section className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Event Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <p className="text-gray-500 mb-3">{event.time}</p>
            <p className="text-gray-500 mb-3">{event.attendees}</p>
            <div className="relative pt-2">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: event.progress }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                ></div>
              </div>
              <p className="text-gray-500 text-sm">{`Progress: ${event.progress}`}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}