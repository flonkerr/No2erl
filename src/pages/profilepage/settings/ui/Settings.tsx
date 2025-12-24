import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  username?: string;
  email?: string;
  about?: string;
  avatar?: string;
  [key: string]: unknown;
}

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const logged = localStorage.getItem("loggedInUser");
    if (logged) {
      const parsed = JSON.parse(logged);
      setUser(parsed);
      setUsername(parsed.username || "");
      setAbout(parsed.about || "");
      setAvatar(parsed.avatar || "");
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (username.length < 3 || username.length > 20) {
      setError("Username must be 3–20 characters.");
      return;
    }
    const updated = {
      ...user,
      username,
      about,
      avatar,
    };
    const oldKey = (user.username || user.email || "guest") as string;
    const newKey = (updated.username || updated.email || "guest") as string;
    localStorage.setItem("loggedInUser", JSON.stringify(updated));
    const baseUserRaw = localStorage.getItem("user");
    if (baseUserRaw) {
      const baseUser = JSON.parse(baseUserRaw);
      const nextBase = { ...baseUser, username: updated.username, avatar: updated.avatar, about: updated.about };
      localStorage.setItem("user", JSON.stringify(nextBase));
    }
    if (oldKey !== newKey) {
      const keys = ["messages", "chatThreads", "notifications", "activity"];
      keys.forEach((k) => {
        const oldVal = localStorage.getItem(`${k}:${oldKey}`);
        if (oldVal) {
          localStorage.setItem(`${k}:${newKey}`, oldVal);
          localStorage.removeItem(`${k}:${oldKey}`);
        }
      });
    }
    const key = newKey;
    const existing = localStorage.getItem(`notifications:${key}`);
    const list = existing ? JSON.parse(existing) : [];
    const entry = {
      id: Date.now(),
      title: `Profile updated: ${updated.username || "Your Name"}`,
      date: new Date().toISOString(),
      read: false,
    };
    localStorage.setItem(`notifications:${key}`, JSON.stringify([entry, ...list]));
    const actRaw = localStorage.getItem(`activity:${key}`);
    const acts = actRaw ? JSON.parse(actRaw) : [];
    const activity = {
      title: `Profile updated`,
      date: new Date().toISOString(),
      kind: "profile",
    };
    const nextActs = [activity, ...acts].slice(0, 5);
    localStorage.setItem(`activity:${key}`, JSON.stringify(nextActs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-400 text-xl tracking-widest">PROFILE</h2>
          <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
        </div>
        <Link to="/profile" className="px-4 py-2 border rounded tracking-widest text-sm hover:bg-gray-50">
          BACK TO PROFILE
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <div className="border border-gray-200 rounded p-6">
            <img
              src={
                avatar ||
                "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80"
              }
              className="w-32 h-32 rounded-full object-cover border"
            />
            <p className="text-xs text-gray-500 tracking-widest mt-4">
              EMAIL
            </p>
            <p className="text-gray-900 font-medium">
              {user?.email || "email@example.com"}
            </p>
            <p className="text-xs text-gray-500 tracking-widest mt-6">
              USERNAME
            </p>
            <p className="text-gray-900">{username || "Your Name"}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          {saved ? (
            <div className="rounded bg-green-50 border border-green-200 p-4 mb-6 text-sm text-green-800">
              Changes saved.
            </div>
          ) : null}
          {error ? (
            <div className="rounded bg-red-50 border border-red-200 p-4 mb-6 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter your display name"
                minLength={3}
                maxLength={20}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Profile Image URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                About Me
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 min-h-32 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Tell us about yourself"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 tracking-widest text-sm hover:bg-gray-800 transition rounded"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
