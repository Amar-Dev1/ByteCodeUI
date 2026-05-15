import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchEvents, FilterEvents } from "../services";

const getEventStatus = (startDate: string, endDate?: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "closed";
};

const StatusBadge = ({ startDate, endDate }: { startDate: string; endDate?: string }) => {
  const status = getEventStatus(startDate, endDate);

  const config = {
    upcoming: {
      label: "Upcoming",
      icon: "schedule",
      className: "bg-tertiary/20 text-tertiary border-tertiary/30",
    },
    active: {
      label: "Active",
      icon: "radio_button_checked",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    closed: {
      label: "Closed",
      icon: "event_busy",
      className: "bg-error/20 text-error border-error/30",
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-xs px-sm py-xs rounded-sm font-label-sm border text-[10px] uppercase tracking-wider ${config.className}`}
    >
      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
        {config.icon}
      </span>
      {config.label}
    </span>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All Categories");

  const getFilteredEvents = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await FilterEvents(category);
      setActiveFilter(category);
      if (data) {
        setEvents(data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("We couldn't load the events right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await FetchEvents();
        if (data) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("We couldn't load the events right now.");
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  return (
    <div className="flex-1 p-gutter md:p-xl w-full">
      <header className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant pb-md">
        <div>
          <h1 className="font-display text-display flex-auto text-on-surface mb-sm">
            Events
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Discover events, workshops, activities and meetups in ByteCode
            community.
          </p>
        </div>
        <div className="flex gap-sm">
          <button
            onClick={() => getFilteredEvents("All Categories")}
            className={`px-md py-sm rounded-full border transition-colors font-label-sm text-label-sm cursor-pointer ${
              activeFilter === "All Categories"
                ? "bg-primary text-on-primary border-primary"
                : "border-outline-variant text-on-surface hover:bg-surface-container-high"
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => getFilteredEvents("Session")}
            className={`px-md py-sm rounded-full border transition-colors font-label-sm text-label-sm cursor-pointer ${
              activeFilter === "Session"
                ? "bg-primary text-on-primary border-primary"
                : "border-outline-variant text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Sessions
          </button>
          <button
            onClick={() => getFilteredEvents("Activity")}
            className={`px-md py-sm rounded-full border transition-colors font-label-sm text-label-sm cursor-pointer ${
              activeFilter === "Activity"
                ? "bg-primary text-on-primary border-primary"
                : "border-outline-variant text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Activities
          </button>
        </div>
      </header>

      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-error-container text-on-error-container p-xl rounded-xl text-center flex flex-col items-center gap-md">
          <span className="material-symbols-outlined text-[48px]">
            wifi_off
          </span>
          <h3 className="font-headline-md">{error}</h3>
          <p className="font-body-md">
            Please check your connection or try again later.
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-surface-container-low text-on-surface-variant p-xl rounded-xl text-center flex flex-col items-center gap-md border border-outline-variant">
          <span className="material-symbols-outlined text-[48px]">
            event_busy
          </span>
          <h3 className="font-headline-md text-on-surface">No Events Found</h3>
          <p className="font-body-md">
            There are no upcoming events scheduled at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {events.map((event) => (
            <Link
              key={event._id}
              to={`/community/events/${event._id}`}
              className="group relative rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low hover:bg-surface-container transition-all duration-300 flex flex-col shadow-sm hover:shadow-md"
            >
              <div className="h-48 relative overflow-hidden">
                {event.image ? (
                  <img
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={event.image.asset?.url || event.image}
                  />
                ) : (
                  <div className="w-full h-full bg-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-50">
                      event
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <StatusBadge startDate={event.startDate} endDate={event.endDate} />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-sm py-xs bg-surface-container-high/80 backdrop-blur-md text-on-surface border border-outline-variant rounded font-code-md text-[10px] uppercase tracking-wider">
                    {event.category || "Event"}
                  </span>
                </div>
              </div>
              <div className="p-lg flex flex-col flex-1">
                <div className="flex items-center gap-xs mb-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    calendar_today
                  </span>
                  <span className="font-label-sm text-on-surface-variant">
                    {event.startDate
                      ? new Date(event.startDate).toLocaleDateString()
                      : "TBD"}
                  </span>
                </div>
                <h3 className="font-headline-sm text-on-surface mb-sm group-hover:text-primary transition-colors line-clamp-1">
                  {event.title}
                </h3>
                <p className="font-body-md text-on-surface-variant line-clamp-2">
                  {event.description}
                </p>
                <div className="mt-lg flex items-center text-primary font-label-md group-hover:gap-xs transition-all">
                  View Details
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
