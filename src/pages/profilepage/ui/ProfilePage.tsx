import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState<{ username: string; email: string; avatar?: string } | null>(null);
  const [messages, setMessages] = useState<
    { id: number; from: string; preview: string; date: string; unread?: boolean }[]
  >([]);
  const [notifications, setNotifications] = useState<
    { id: number; title: string; date: string; read?: boolean }[]
  >([]);
  const [activities, setActivities] = useState<
    { title: string; date: string; kind: "notification" | "email" | "cart" | "profile" }[]
  >([]);
  const location = useLocation();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const userKey = useMemo(
    () => (user?.username || user?.email || "guest"),
    [user]
  );

  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages:${userKey}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    const storedNotifications = localStorage.getItem(`notifications:${userKey}`);
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      const seed = [
        {
          id: Number(`${Date.now()}1`),
          title: "Profile updated",
          date: new Date().toISOString(),
          read: false,
        },
        {
          id: Number(`${Date.now()}2`),
          title: "New message from Client",
          date: new Date(Date.now() - 3600_000).toISOString(),
          read: false,
        },
      ];
      localStorage.setItem(`notifications:${userKey}`, JSON.stringify(seed));
      setNotifications(seed);
    }
    const storedActivities = localStorage.getItem(`activity:${userKey}`);
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    } else {
      setActivities([]);
      localStorage.setItem(`activity:${userKey}`, JSON.stringify([]));
    }
  }, [userKey]);

  const isDashboard = location.pathname === "/profile" || location.pathname === "/profile/";
  const unreadMessagesCount = messages.filter((m) => m.unread).length;
  const recentMessages = [...messages]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const recentNotifications = [...notifications]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const activityItems = activities.slice(0, 5);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white px-6 md:px-16 py-16 flex gap-12">

      <div className="w-64 flex-shrink-0 flex flex-col items-center border-r border-gray-200 pr-6">
        <img
          src={user?.avatar || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.username || "Your Name"}</h1>
        <p className="text-gray-500 text-sm tracking-widest mb-8">{user?.email || "email@example.com"}</p>

        <div className="flex flex-col w-full space-y-3">
          <Link
            to="/profile/mailbox"
            className={`block w-full px-4 py-2 font-medium tracking-widest rounded hover:bg-gray-50 transition ${location.pathname.includes("/mailbox") ? "bg-gray-100 text-gray-900" : "text-gray-600"}`}
          >
            Mailbox
          </Link>
          <Link
            to="/profile/chats"
            className={`block w-full px-4 py-2 font-medium tracking-widest rounded hover:bg-gray-50 transition ${location.pathname.includes("/chats") ? "bg-gray-100 text-gray-900" : "text-gray-600"}`}
          >
            Messages
          </Link>
          <Link
            to="/profile/settings"
            className={`block w-full px-4 py-2 font-medium tracking-widest rounded hover:bg-gray-50 transition ${location.pathname.includes("/settings") ? "bg-gray-100 text-gray-900" : "text-gray-600"}`}
          >
            Settings
          </Link>
          <button
             onClick={() => {
                localStorage.removeItem("loggedInUser");
                window.location.href = "/";
             }}
            className="px-4 py-2 text-red-700 border font-medium tracking-widest rounded mt-10 text-left w-full hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1">
        {isDashboard ? (
          <>
            <h2 className="text-gray-400 text-4xl mb-6">
              Welcome{user ? `, ${user.username}` : ""}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/profile/mailbox" className="p-6 border border-gray-200 rounded hover:bg-gray-50 transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-800 font-semibold">Notifications</h3>
                  <span className="px-2 py-1 text-xs rounded bg-gray-900 text-white">
                    {unreadNotificationsCount} new
                  </span>
                </div>
                <div className="space-y-2">
                  {recentNotifications.length === 0 ? (
                    <p className="text-gray-400 text-sm">No notifications</p>
                  ) : (
                    recentNotifications.map((n) => (
                      <div key={n.id} className="flex items-center justify-between">
                        <p className="text-gray-700 text-sm">{n.title}</p>
                        <p className="text-[11px] text-gray-500 tracking-widest">
                          {new Date(n.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Link>
              <Link to="/profile/chats" className="p-6 border border-gray-200 rounded hover:bg-gray-50 transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-800 font-semibold">Recent messages</h3>
                  <span className="px-2 py-1 text-xs rounded bg-gray-900 text-white">
                    {unreadMessagesCount} unread
                  </span>
                </div>
                <div className="space-y-2">
                  {recentMessages.length === 0 ? (
                    <p className="text-gray-400 text-sm">No messages</p>
                  ) : (
                    recentMessages.map((m) => (
                      <div key={m.id} className="flex items-center justify-between">
                        <p className="text-gray-700 text-sm">{m.from}</p>
                        <p className="text-[11px] text-gray-500 tracking-widest">
                          {new Date(m.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Link>
            </div>
            <div className="mt-10">
              <h3 className="text-gray-800 font-semibold mb-4">Activity</h3>
              <div className="relative">
                <div className="space-y-4">
                  {activityItems.length === 0 ? (
                    <p className="text-gray-400 text-sm">No recent activity</p>
                  ) : (
                    activityItems.map((a, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${a.kind === "notification" ? "bg-gray-900" : "bg-gray-500"}`} />
                        <div className="flex-1 flex items-center justify-between">
                          <p className="text-gray-700 text-sm tracking-widest">{a.title}</p>
                          <p className="text-[11px] text-gray-500 tracking-widest">
                            {new Date(a.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
            <Outlet />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
