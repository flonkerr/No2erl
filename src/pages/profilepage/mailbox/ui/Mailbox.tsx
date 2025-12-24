import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface MailItem {
  id: number;
  from: string;
  subject: string;
  date: string;
  folder: "inbox" | "sent" | "archived";
  to?: string;
  body?: string;
  imageUrl?: string;
}

export default function Mailbox() {
  const [items, setItems] = useState<MailItem[]>([]);
  const [folder, setFolder] = useState<"inbox" | "sent" | "archived">("inbox");
  const [composeOpen, setComposeOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [userKey, setUserKey] = useState<string>("guest");
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const logged = localStorage.getItem("loggedInUser");
    if (logged) {
      const parsed = JSON.parse(logged);
      setUserKey(parsed.username || parsed.email || "guest");
    }
    const stored = localStorage.getItem("mailbox");
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      const seed: MailItem[] = [
        {
          id: 100,
          from: "Support",
          subject: "Welcome to the platform",
          date: new Date().toISOString(),
          folder: "inbox",
        },
        {
          id: 101,
          from: "You",
          subject: "Project update sent",
          date: new Date(Date.now() - 86400000).toISOString(),
          folder: "sent",
        },
        {
          id: 102,
          from: "Announcements",
          subject: "New features released",
          date: new Date(Date.now() - 2 * 86400000).toISOString(),
          folder: "archived",
        },
      ];
      localStorage.setItem("mailbox", JSON.stringify(seed));
      setItems(seed);
    }
  }, []);

  const displayed = items
    .filter((i) => i.folder === folder)
    .filter((i) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        (i.from && i.from.toLowerCase().includes(q)) ||
        (i.to && i.to.toLowerCase().includes(q)) ||
        (i.subject && i.subject.toLowerCase().includes(q))
      );
    });

  const moveToArchive = (id: number) => {
    const next = items.map((i) =>
      i.id === id ? { ...i, folder: "archived" } : i
    );
    setItems(next);
    localStorage.setItem("mailbox", JSON.stringify(next));
  };

  const restoreFromArchive = (id: number) => {
    const next = items.map((i) =>
      i.id === id ? { ...i, folder: "inbox" } : i
    );
    setItems(next);
    localStorage.setItem("mailbox", JSON.stringify(next));
  };
  
  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !subject.trim() || (!body.trim() && !imagePreview)) return;
    const newItem: MailItem = {
      id: Date.now(),
      from: "You",
      to: to.trim(),
      subject: subject.trim(),
      body: body.trim(),
      imageUrl: imagePreview || undefined,
      date: new Date().toISOString(),
      folder: "sent",
    };
    const next = [newItem, ...items];
    setItems(next);
    localStorage.setItem("mailbox", JSON.stringify(next));
    const actRaw = localStorage.getItem(`activity:${userKey}`);
    const acts = actRaw ? JSON.parse(actRaw) : [];
    const activity = {
      title: `Email sent to ${to.trim()}: ${subject.trim()}`,
      date: new Date().toISOString(),
      kind: "email",
    };
    const nextActs = [activity, ...acts].slice(0, 5);
    localStorage.setItem(`activity:${userKey}`, JSON.stringify(nextActs));
    setComposeOpen(false);
    setTo("");
    setSubject("");
    setBody("");
    setImagePreview(null);
  };

  const deleteMail = (id: number) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    localStorage.setItem("mailbox", JSON.stringify(next));
  };

  return (
    <div className="bg-white">
      <div className="flex items-centered justify-between mb-6">
        <div>
          <h2 className="text-gray-400 text-xl tracking-widest">PROFILE</h2>
          <h1 className="text-3xl md:text-4xl font-bold">Mailbox</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="px-4 py-2 border rounded tracking-widest text-sm hover:bg-gray-50">
            BACK TO PROFILE
          </Link>
          <button
            onClick={() => setFolder("inbox")}
            className={`px-4 py-2 border rounded text-sm tracking-widest ${
              folder === "inbox" ? "bg-gray-100" : "bg-white"
            }`}
          >
            INBOX
          </button>
          <button
            onClick={() => setFolder("sent")}
            className={`px-4 py-2 border rounded text-sm tracking-widest ${
              folder === "sent" ? "bg-gray-100" : "bg-white"
            }`}
          >
            SENT
          </button>
          <button
            onClick={() => setFolder("archived")}
            className={`px-4 py-2 border rounded text-sm tracking-widest ${
              folder === "archived" ? "bg-gray-100" : "bg-white"
            }`}
          >
            ARCHIVED
          </button>
          <button
            onClick={() => setComposeOpen((v) => !v)}
            className="px-4 py-2 border rounded text-sm tracking-widest hover:bg-gray-50"
          >
            COMPOSE
          </button>
        </div>
      </div>
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search mail by name or subject"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      {composeOpen ? (
        <form onSubmit={sendMail} className="mb-6 border border-gray-200 rounded p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Recipient"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Message"
            className="w-full border border-gray-300 rounded px-4 py-2 min-h-32 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          {imagePreview ? (
            <div className="flex items-center gap-3">
              <img
                src={imagePreview}
                alt="preview"
                className="max-h-24 rounded border border-gray-300"
              />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="px-3 py-1 border rounded tracking-widest text-xs hover:bg-gray-50"
              >
                REMOVE
              </button>
            </div>
          ) : null}
          <div className="flex gap-3">
            <label className="px-4 py-2 border rounded tracking-widest text-sm hover:bg-gray-50 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return setImagePreview(null);
                  const reader = new FileReader();
                  reader.onload = () => setImagePreview(reader.result as string);
                  reader.readAsDataURL(file);
                }}
              />
              ATTACH
            </label>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded tracking-widest text-sm hover:bg-gray-800"
            >
              SEND
            </button>
            <button
              type="button"
              onClick={() => setComposeOpen(false)}
              className="px-6 py-2 border rounded tracking-widest text-sm hover:bg-gray-50"
            >
              CANCEL
            </button>
          </div>
        </form>
      ) : null}

      <div className="border border-gray-200 rounded">
        {displayed.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No items in this folder
          </div>
        ) : (
          displayed.map((i) => (
            <div key={i.id} className="px-6 py-4 border-b last:border-b-0">
              <div className="flex items-center justify-between">
                <p className="text-gray-900 font-medium">
                  {folder === "sent" ? `To: ${i.to || "-"}` : i.from}
                </p>
                <p className="text-xs text-gray-500 tracking-widest">
                  {new Date(i.date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-600 mt-1">{i.subject}</p>
              {i.body ? <p className="text-gray-500 mt-1 text-sm">{i.body}</p> : null}
              {i.imageUrl ? (
                <img
                  src={i.imageUrl}
                  alt="attachment"
                  className="mt-2 max-h-48 rounded border border-gray-300"
                />
              ) : null}
              <div className="flex gap-2 mt-3">
                {folder !== "archived" ? (
                  <button
                    onClick={() => moveToArchive(i.id)}
                    className="px-3 py-1 border rounded text-xs tracking-widest hover:bg-gray-50"
                  >
                    ARCHIVE
                  </button>
                ) : (
                  <button
                    onClick={() => restoreFromArchive(i.id)}
                    className="px-3 py-1 border rounded text-xs tracking-widest hover:bg-gray-50"
                  >
                    RESTORE
                  </button>
                )}
                <button
                  onClick={() => deleteMail(i.id)}
                  className="px-3 py-1 border rounded text-xs tracking-widest hover:bg-gray-50 text-red-700"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
