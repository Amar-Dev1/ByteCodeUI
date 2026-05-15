import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FetchSingleEvent } from "../services";

const getEventStatus = (startDate: string, endDate?: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "closed";
};

const StatusBadge = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}) => {
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
      className={`inline-flex items-center gap-xs px-sm py-xs rounded-sm font-label-sm border uppercase ${config.className}`}
    >
      <span
        className="material-symbols-outlined text-[14px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {config.icon}
      </span>
      {config.label}
    </span>
  );
};

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await FetchSingleEvent(id);
        if (data) {
          setEvent(data);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex-1 p-xl text-center">
        <div className="bg-error-container text-on-error-container p-xl rounded-xl inline-flex flex-col items-center gap-md">
          <span className="material-symbols-outlined text-[48px]">error</span>
          <h3 className="font-headline-md">{error || "Event not found"}</h3>
          <Link
            to="/community/events"
            className="text-primary hover:underline font-label-lg"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full px-gutter py-xl lg:pl-xl flex flex-col gap-xl">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] rounded-xl overflow-hidden border border-outline-variant shadow-lg flex items-end">
        {event.image ? (
          <img
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
            src={event.image.asset?.url || event.image}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-surface-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-[100px] text-on-surface-variant opacity-20">
              event
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
        <div className="relative z-10 p-xl w-full flex flex-col md:flex-row justify-between items-end gap-lg">
          <div className="flex-1">
            <div className="flex items-center gap-sm mb-md flex-wrap">
              <span className="bg-primary/20 text-primary px-sm py-xs rounded-sm font-label-sm border border-primary/30 uppercase">
                {event.category || "Event"}
              </span>
              {event.location && (
                <span className="bg-secondary/20 text-secondary px-sm py-xs rounded-sm font-label-sm border border-secondary/30 uppercase">
                  {event.location}
                </span>
              )}
              {event.startDate && (
                <StatusBadge
                  startDate={event.startDate}
                  endDate={event.endDate}
                />
              )}
            </div>
            <h1 className="font-display text-display flex-auto text-on-surface mb-sm">
              {event.title}
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              {event.description}
            </p>
          </div>
          <div className="bg-surface-container-high/40 backdrop-blur-md border border-white/5 p-md rounded-lg flex flex-col gap-sm min-w-[250px]">
            <div className="flex items-center gap-md text-on-surface">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calendar_month
              </span>
              <div>
                <div className="font-bold text-sm">
                  {event.startDate
                    ? new Date(event.startDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "TBD"}
                  {event.endDate &&
                    ` - ${new Date(event.endDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                </div>
                <div className="text-on-surface-variant text-xs">
                  {event.startDate
                    ? `Starts at ${new Date(event.startDate).toLocaleTimeString(
                        undefined,
                        { hour: "2-digit", minute: "2-digit" }
                      )}`
                    : "Time TBD"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Layout for Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Main Details */}
        <div className="lg:col-span-2 flex flex-col gap-lg">
          <section className="bg-surface-container p-lg rounded-xl border border-outline-variant">
            <h2 className="font-headline-lg flex-auto text-on-surface mb-md">
              About the Event
            </h2>
            <div className="font-body-md text-on-surface-variant space-y-md whitespace-pre-wrap">
              {event.description}
            </div>
          </section>

          {/* Schedule Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="bg-surface-container p-md rounded-xl border border-outline-variant flex flex-col">
              <div className="flex items-center gap-sm mb-md text-primary">
                <span className="material-symbols-outlined">flag</span>
                <h3 className="font-headline-md flex-auto text-on-surface">
                  Date & Time
                </h3>
              </div>
              <div className="text-on-surface-variant flex-1">
                <p className="font-bold flex-auto text-on-surface">
                  {event.startDate
                    ? new Date(event.startDate).toLocaleString()
                    : "TBD"}
                </p>
                <p className="text-sm mt-xs">
                  Make sure to add this to your calendar.
                </p>
              </div>
            </div>
            <div className="bg-surface-container p-md rounded-xl border border-outline-variant flex flex-col">
              <div className="flex items-center gap-sm mb-md text-secondary">
                <span className="material-symbols-outlined">location_on</span>
                <h3 className="font-headline-md flex-auto text-on-surface">
                  Location
                </h3>
              </div>
              <div className="text-on-surface-variant flex-1">
                <p className="font-bold flex-auto text-on-surface">
                  {event.location || "Online / Virtual"}
                </p>
                <p className="text-sm mt-xs">
                  {event.location
                    ? "Physical event location."
                    : "This event will be held virtually."}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-lg">
          {/* Organizers Section */}
          {event.organizers && event.organizers.length > 0 && (
            <section className="bg-surface-container p-lg rounded-xl border border-outline-variant">
              <div className="flex items-center gap-sm mb-md">
                <span className="material-symbols-outlined text-primary">
                  groups
                </span>
                <h2 className="font-headline-md flex-auto text-on-surface">
                  Organizers
                </h2>
              </div>
              <div className="flex flex-col gap-md">
                {event.organizers.map((organizer: any, index: number) => (
                  <div key={index} className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant bg-surface-variant flex-shrink-0">
                      {organizer.image ? (
                        <img
                          src={organizer.image.asset?.url || organizer.image}
                          alt={organizer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined">
                            person
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-on-surface">
                        {organizer.name}
                      </span>
                      <span className="text-on-surface-variant text-xs">
                        {organizer.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Assets Section */}
          {event.assets && event.assets.length > 0 && (
            <section className="bg-surface-container p-lg rounded-xl border border-outline-variant">
              <div className="flex items-center gap-sm mb-md">
                <span className="material-symbols-outlined text-tertiary">
                  folder_zip
                </span>
                <h2 className="font-headline-md flex-auto text-on-surface">
                  Assets & Docs
                </h2>
              </div>
              <p className="font-body-md text-on-surface-variant mb-md text-sm">
                Download necessary resources for the event.
              </p>
              <div className="flex flex-col gap-sm">
                {event.assets.map((asset: any, index: number) => (
                  <a
                    key={index}
                    className="flex items-center justify-between p-sm rounded-lg bg-surface-container-high border border-outline-variant hover:bg-surface-variant transition-colors group"
                    href={asset.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-md">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        description
                      </span>
                      <span className="font-label-sm text-on-surface group-hover:text-primary transition-colors">
                        {asset.name || `Resource ${index + 1}`}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">
                      download
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
