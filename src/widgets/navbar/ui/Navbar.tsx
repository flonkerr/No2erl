import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

function Header() {
  const location = useLocation();
  const [user, setUser] = useState<{ avatar?: string; username?: string; email?: string } | null>(null);
  const [notifications, setNotifications] = useState<
    { id: number; title: string; date: string; read?: boolean }[]
  >([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const userKey = useMemo(
    () => (user?.username || (user as any)?.email || "guest"),
    [user]
  );

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    const storedNotifications = localStorage.getItem(`notifications:${userKey}`);
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      const seed = [
        {
          id: Number(`${Date.now()}1`),
          title: "Welcome back!",
          date: new Date().toISOString(),
          read: false,
        },
        {
          id: Number(`${Date.now()}2`),
          title: "You have new messages",
          date: new Date(Date.now() - 3600_000).toISOString(),
          read: false,
        },
      ];
      localStorage.setItem(`notifications:${userKey}`, JSON.stringify(seed));
      setNotifications(seed);
    }
  }, [location, userKey]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const toggleNotificationPanel = () => {
    setShowNotifications((v) => {
      const next = !v;
      if (next) {
        const stored = localStorage.getItem(`notifications:${userKey}`);
        if (stored) {
          setNotifications(JSON.parse(stored));
        }
      }
      return next;
    });
  };

  const markAllRead = () => {
    const cleared: any[] = [];
    setNotifications(cleared);
    localStorage.setItem(`notifications:${userKey}`, JSON.stringify(cleared));
    const inboxRaw = localStorage.getItem(`messages:${userKey}`);
    if (inboxRaw) {
      const inboxParsed = JSON.parse(inboxRaw);
      const updated = inboxParsed.map((m: any) => ({ ...m, unread: false }));
      localStorage.setItem(`messages:${userKey}`, JSON.stringify(updated));
    }
  };

  const toggleRead = (id: number) => {
    const next = notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    );
    setNotifications(next);
    localStorage.setItem(`notifications:${userKey}`, JSON.stringify(next));
  };

  return (
    <header className="relative flex items-center px-16 py-5 font-sans bg-white border-b border-gray-300">
      <div className="flex-shrink-0">
        <div className="flex flex-col items-center text-sm text-gray-800">
          <span className="mt-1 tracking-[2px] font-medium">DIGITAL PROJECT</span>
        </div>
      </div>

      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-10">
        {[
          { to: "/", label: "MAIN" },
          { to: "/Gallery", label: "GALLERY" },
          { to: "/Projects", label: "OUR PROJECTS" },
          { to: "/Aboutus", label: "ABOUT US" },
          { to: "/ContactUs", label: "OUR LOCATION" },
          { to: "/Product", label: "PRODUCTS & BIM" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="relative text-gray-900 text-sm tracking-[2px] font-medium no-underline 
                       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-black 
                       after:transition-all after:duration-300 hover:after:w-full"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex-shrink-0 flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-2 relative">
            <button
              onClick={toggleNotificationPanel}
              className="relative px-2 py-1 rounded hover:bg-gray-100"
              aria-label="Notifications"
            >
              <BellIcon className="w-6 h-6 text-black" />
              {unreadCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full px-1">
                  {unreadCount}
                </span>
              ) : null}
            </button>
            {showNotifications ? (
              <div className="absolute right-14 top-10 w-80 border border-gray-200 rounded bg-white shadow-lg z-20">
                <div className="flex items-center justify-between px-3 py-2 border-b">
                  <p className="text-sm font-medium tracking-widest text-gray-900">NOTIFICATIONS</p>
                  <div className="flex gap-2">
                    <button
                      onClick={markAllRead}
                      className="px-2 py-1 text-xs border rounded tracking-widest hover:bg-gray-50"
                    >
                      MARK ALL READ
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500">No notifications</div>
                  ) : (
                    notifications
                      .slice()
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((n) => (
                        <button
                          key={n.id}
                          onClick={() => toggleRead(n.id)}
                          className={`w-full text-left px-4 py-3 border-b last:border-b-0 ${
                            n.read ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-gray-900 text-sm tracking-widest">{n.title}</p>
                            <p className="text-[11px] text-gray-500 tracking-widest">
                              {new Date(n.date).toLocaleDateString()}
                            </p>
                          </div>
                        </button>
                      ))
                  )}
                </div>
              </div>
            ) : null}
            <Link to="/profile" className="flex items-center gap-2 px-2 py-1">
              <img
                src={user.avatar || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80 "}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
             <Link to="/login" className="px-4 py-2 text-sm font-medium tracking-widest hover:text-gray-600 transition">
              SIGN IN
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium tracking-widest bg-black text-white rounded hover:bg-gray-800 transition">
              SIGN UP
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
