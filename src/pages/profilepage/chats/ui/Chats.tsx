import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface InboxItem {
  id: number;
  from: string;
  preview: string;
  date: string;
  unread?: boolean;
}

interface ChatMessage {
  id: number;
  from: string;
  text: string;
  date: string;
  imageUrl?: string;
}

interface Thread {
  contact: string;
  messages: ChatMessage[];
}

export default function Chats() {
  const location = useLocation();
  const [inbox, setInbox] = useState<InboxItem[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [editMode, setEditMode] = useState(false);
  const [edits, setEdits] = useState<Record<number, string>>({});
  const [addingContact, setAddingContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [userKey, setUserKey] = useState<string>("guest");

  useEffect(() => {
    const logged = localStorage.getItem("loggedInUser");
    let key = "guest";
    if (logged) {
      const parsed = JSON.parse(logged);
      key = parsed.username || parsed.email || "guest";
    }
    setUserKey(key);
    const storedInbox = localStorage.getItem(`messages:${key}`);
    let data: InboxItem[];
    if (storedInbox) {
      data = JSON.parse(storedInbox);
    } else {
      data = [
        {
          id: 1,
          from: "Project Manager",
          preview: "Can we sync tomorrow about the timeline?",
          date: new Date().toISOString(),
          unread: true,
        },
        {
          id: 2,
          from: "Client",
          preview: "The latest design looks great!",
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 3,
          from: "Supplier",
          preview: "Delivery scheduled for next Monday.",
          date: new Date(Date.now() - 2 * 86400000).toISOString(),
          unread: true,
        },
      ];
      localStorage.setItem(`messages:${key}`, JSON.stringify(data));
    }
    setInbox(data);

    const storedThreads = localStorage.getItem(`chatThreads:${key}`);
    if (storedThreads) {
      const parsed: Thread[] = JSON.parse(storedThreads);
      setThreads(parsed);
      setActiveContact(parsed[0]?.contact ?? data[0]?.from ?? null);
    } else {
      const seededThreads: Thread[] = data.map((m) => ({
        contact: m.from,
        messages: [
          {
            id: Number(`${m.id}01`),
            from: m.from,
            text: m.preview,
            date: m.date,
          },
          {
            id: Number(`${m.id}02`),
            from: "You",
            text: "Thanks for the update.",
            date: new Date().toISOString(),
          },
        ],
      }));
      localStorage.setItem(`chatThreads:${key}`, JSON.stringify(seededThreads));
      setThreads(seededThreads);
      setActiveContact(seededThreads[0]?.contact ?? null);
    }
  }, [location]);

  const displayedInbox = useMemo(() => {
    const base = filter === "all" ? inbox : inbox.filter((m) => m.unread);
    if (!search.trim()) return base;
    const q = search.trim().toLowerCase();
    return base.filter((m) => m.from.toLowerCase().includes(q));
  }, [filter, inbox, search]);

  // mark-all-read moved to notifications panel

  const selectThread = (contact: string) => {
    setActiveContact(contact);
    const updated = inbox.map((m) =>
      m.from === contact ? { ...m, unread: false } : m
    );
    setInbox(updated);
    localStorage.setItem(`messages:${userKey}`, JSON.stringify(updated));
    setSelectionMode(false);
    setSelectedIds(new Set());
    setEditMode(false);
    setEdits({});
    setShowMenu(false);
  };

  const activeThread = useMemo(
    () => threads.find((t) => t.contact === activeContact) || null,
    [threads, activeContact]
  );

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || (!draft.trim() && !imagePreview)) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      from: "You",
      text: draft.trim(),
      date: new Date().toISOString(),
      imageUrl: imagePreview || undefined,
    };
    const nextThreads = threads.map((t) =>
      t.contact === activeThread.contact
        ? { ...t, messages: [...t.messages, newMsg] }
        : t
    );
    setThreads(nextThreads);
    localStorage.setItem(`chatThreads:${userKey}`, JSON.stringify(nextThreads));
    const updatedInbox = inbox.map((m) =>
      m.from === activeThread.contact
        ? {
            ...m,
            preview: newMsg.text || (newMsg.imageUrl ? "Photo" : ""),
            date: newMsg.date,
            unread: false,
          }
        : m
    );
    setInbox(updatedInbox);
    localStorage.setItem(`messages:${userKey}`, JSON.stringify(updatedInbox));
    setDraft("");
    setImagePreview(null);
  };

  // per-message delete handled via selection menu

  const deleteThread = () => {
    if (!activeThread) return;
    const nextThreads = threads.filter((t) => t.contact !== activeThread.contact);
    setThreads(nextThreads);
    localStorage.setItem(`chatThreads:${userKey}`, JSON.stringify(nextThreads));
    const nextInbox = inbox.filter((m) => m.from !== activeThread.contact);
    setInbox(nextInbox);
    localStorage.setItem(`messages:${userKey}`, JSON.stringify(nextInbox));
    setActiveContact(nextThreads[0]?.contact ?? null);
    setShowMenu(false);
    setSelectionMode(false);
    setSelectedIds(new Set());
    setEditMode(false);
    setEdits({});
  };

  const toggleSelectMode = () => {
    setSelectionMode((v) => !v);
    setSelectedIds(new Set());
    setEditMode(false);
    setEdits({});
    setShowMenu(false);
  };

  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const deleteSelected = () => {
    if (!activeThread || selectedIds.size === 0) return;
    const nextThreads = threads.map((t) =>
      t.contact === activeThread.contact
        ? { ...t, messages: t.messages.filter((m) => !selectedIds.has(m.id)) }
        : t
    );
    setThreads(nextThreads);
    localStorage.setItem(`chatThreads:${userKey}`, JSON.stringify(nextThreads));
    setSelectedIds(new Set());
    setSelectionMode(false);
    setShowMenu(false);
  };

  const startEditSelected = () => {
    if (!activeThread || selectedIds.size === 0) return;
    const editableIds = Array.from(selectedIds).filter((id) => {
      const msg = activeThread.messages.find((m) => m.id === id);
      return msg?.from === "You";
    });
    if (editableIds.length === 0) return;
    const initial: Record<number, string> = {};
    editableIds.forEach((id) => {
      const msg = activeThread.messages.find((m) => m.id === id);
      if (msg) initial[id] = msg.text;
    });
    setEdits(initial);
    setEditMode(true);
    setShowMenu(false);
  };

  const saveEdits = () => {
    if (!activeThread || !editMode) return;
    const nextThreads = threads.map((t) =>
      t.contact === activeThread.contact
        ? {
            ...t,
            messages: t.messages.map((m) =>
              edits[m.id] !== undefined ? { ...m, text: edits[m.id] } : m
            ),
          }
        : t
    );
    setThreads(nextThreads);
    localStorage.setItem(`chatThreads:${userKey}`, JSON.stringify(nextThreads));
    const latestOwn = Object.keys(edits)
      .map(Number)
      .sort((a, b) => b - a)[0];
    if (latestOwn !== undefined) {
      const updatedInbox = inbox.map((m) =>
        m.from === activeThread.contact
          ? { ...m, preview: edits[latestOwn] ?? m.preview }
          : m
      );
      setInbox(updatedInbox);
      localStorage.setItem(`messages:${userKey}`, JSON.stringify(updatedInbox));
    }
    setEditMode(false);
    setEdits({});
    setSelectedIds(new Set());
  };

  const cancelEdits = () => {
    setEditMode(false);
    setEdits({});
  };

  const toggleAddContact = () => {
    setAddingContact((v) => !v);
    setContactName("");
  };

  const createContact = (e: React.FormEvent) => {
    e.preventDefault();
    const name = contactName.trim();
    if (!name) return;
    const newThread: Thread = { contact: name, messages: [] };
    const nextThreads = [newThread, ...threads];
    setThreads(nextThreads);
    localStorage.setItem(`chatThreads:${userKey}`, JSON.stringify(nextThreads));
    const newInbox: InboxItem = {
      id: Date.now(),
      from: name,
      preview: "",
      date: new Date().toISOString(),
      unread: false,
    };
    const nextInbox = [newInbox, ...inbox];
    setInbox(nextInbox);
    localStorage.setItem(`messages:${userKey}`, JSON.stringify(nextInbox));
    setActiveContact(name);
    setAddingContact(false);
    setContactName("");
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-400 text-xl tracking-widest">PROFILE</h2>
          <h1 className="text-3xl md:text-4xl font-bold">Messages</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="px-4 py-2 border rounded tracking-widest text-sm hover:bg-gray-50">
            BACK TO PROFILE
          </Link>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 border rounded text-sm tracking-widest ${
              filter === "all" ? "bg-gray-100" : "bg-white"
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 border rounded text-sm tracking-widest ${
              filter === "unread" ? "bg-gray-100" : "bg-white"
            }`}
          >
            UNREAD
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border border-gray-200 rounded relative">
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <p className="text-sm text-gray-900 tracking-widest flex-shrink-0">CONVERSATIONS</p>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <button
              onClick={toggleAddContact}
              className="ml-2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-lg"
              aria-label="New Contact"
              title="New Contact"
            >
              +
            </button>
          </div>
          {addingContact ? (
            <form onSubmit={createContact} className="px-4 py-3 border-b flex gap-2">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Contact name"
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <button
                type="submit"
                className="px-4 py-2 border rounded text-xs tracking-widest hover:bg-gray-50"
              >
                ADD
              </button>
              <button
                type="button"
                onClick={() => setAddingContact(false)}
                className="px-4 py-2 border rounded text-xs tracking-widest hover:bg-gray-50"
              >
                CANCEL
              </button>
            </form>
          ) : null}
          <div className="max-h-[600px] overflow-y-auto">
            {displayedInbox.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No messages</div>
            ) : (
              displayedInbox.map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectThread(m.from)}
                  className={`w-full text-left px-6 py-4 border-b last:border-b-0 ${
                    m.unread ? "bg-gray-50" : "bg-white"
                  } ${activeContact === m.from ? "bg-gray-100" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 font-medium">{m.from}</p>
                    <p className="text-xs text-gray-500 tracking-widest">
                      {new Date(m.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-1">{m.preview}</p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="md:col-span-2 border border-gray-200 rounded min-h-[520px] flex flex-col">
          {!activeThread ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation
            </div>
          ) : (
            <>
              <div className="px-6 py-3 border-b relative">
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 font-medium">{activeThread.contact}</p>
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu((v) => !v)}
                      className="px-3 py-1 border rounded text-xs tracking-widest hover:bg-gray-50"
                    >
                      ⋮
                    </button>
                    {showMenu ? (
                      <div className="absolute right-0 mt-2 w-44 border rounded bg-white shadow z-10">
                        <button
                          onClick={toggleSelectMode}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          {selectionMode ? "Cancel select" : "Select messages"}
                        </button>
                        <button
                          onClick={startEditSelected}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          Edit selected (You)
                        </button>
                        <button
                          onClick={deleteSelected}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-700"
                        >
                          Delete selected
                        </button>
                        <button
                          onClick={deleteThread}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-700"
                        >
                          Delete thread
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[600px]">
                {activeThread.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[75%] ${
                      msg.from === "You" ? "ml-auto" : ""
                    }`}
                  >
                    {selectionMode ? (
                      <div className="mb-1">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(msg.id)}
                          onChange={() => toggleSelect(msg.id)}
                        />
                      </div>
                    ) : null}
                    <div
                      className={`p-3 rounded ${
                        msg.from === "You"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {editMode && edits[msg.id] !== undefined ? (
                        <input
                          type="text"
                          value={edits[msg.id]}
                          onChange={(e) =>
                            setEdits((prev) => ({
                              ...prev,
                              [msg.id]: e.target.value,
                            }))
                          }
                          className="w-full bg-transparent border-b outline-none text-sm"
                        />
                      ) : (
                        <>
                          <p className="text-sm">{msg.text}</p>
                          {msg.imageUrl ? (
                            <img
                              src={msg.imageUrl}
                              alt="attachment"
                              className="mt-2 max-h-48 rounded border border-gray-300"
                            />
                          ) : null}
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[11px] text-gray-500">
                        {new Date(msg.date).toLocaleString()}
                      </p>
                      {/* per-message delete removed; use menu + selection */}
                    </div>
                  </div>
                ))}
              </div>
              {editMode ? (
                <div className="p-3 border-t flex gap-3">
                  <button
                    onClick={saveEdits}
                    className="px-6 py-2 bg-black text-white rounded tracking-widest text-sm hover:bg-gray-800"
                  >
                    SAVE EDITS
                  </button>
                  <button
                    onClick={cancelEdits}
                    className="px-6 py-2 border rounded tracking-widest text-sm hover:bg-gray-50"
                  >
                    CANCEL
                  </button>
                </div>
              ) : null}
              {/* add recipient UI removed; new contacts added from conversation list */}
              {imagePreview ? (
                <div className="px-4 py-3 border-t flex items-center gap-3">
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
              <form onSubmit={sendMessage} className="p-4 border-t flex gap-3">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
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
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
