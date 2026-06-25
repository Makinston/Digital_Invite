"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GuestRow {
  id: string;
  token: string;
  name: string;
  email?: string;
  created_at: string;
  rsvp: {
    attending: boolean;
    plus_one: boolean;
    dietary?: string;
    message?: string;
    created_at: string;
  } | null;
}

interface Stats {
  total: number;
  responded: number;
  attending: number;
  declined: number;
  plusOnes: number;
  pending: number;
}

const BASE_URL =
  typeof window !== "undefined" ? window.location.origin : "";

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`border ${color} p-5 rounded-sm`}>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
    </div>
  );
}

function StatusBadge({ rsvp }: { rsvp: GuestRow["rsvp"] }) {
  if (!rsvp)
    return (
      <span className="text-[0.65rem] tracking-widest uppercase text-yellow-500/70 border border-yellow-500/20 px-2 py-0.5 rounded-full">
        Pending
      </span>
    );
  if (rsvp.attending)
    return (
      <span className="text-[0.65rem] tracking-widest uppercase text-emerald-400/80 border border-emerald-400/20 px-2 py-0.5 rounded-full">
        Attending{rsvp.plus_one ? " +1" : ""}
      </span>
    );
  return (
    <span className="text-[0.65rem] tracking-widest uppercase text-red-400/70 border border-red-400/20 px-2 py-0.5 rounded-full">
      Declined
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="text-[0.6rem] text-yellow-500/50 hover:text-yellow-500 transition-colors ml-2"
      title="Copy link"
    >
      {copied ? "✓" : "copy"}
    </button>
  );
}

export default function GuestDashboard() {
  const [guests, setGuests] = useState<GuestRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "attending" | "declined">("all");

  // CSV upload state
  const [csvText, setCsvText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/guests");
      if (!res.ok) {
        const j = await res.json();
        setError(j.error ?? "Failed to load");
        setLoading(false);
        return;
      }
      const { guests: g, stats: s } = await res.json();
      setGuests(g);
      setStats(s);
    } catch {
      setError("Could not reach server");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCsvText(ev.target?.result as string);
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    const names = csvText
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (names.length === 0) return;
    setUploading(true);
    setUploadResult(null);

    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ names }),
    });
    const data = await res.json();

    if (res.ok) {
      setUploadResult(`✓ Added ${data.created?.length ?? 0} guests`);
      setCsvText("");
      fetchData();
    } else {
      setUploadResult(`✗ ${data.error}`);
    }
    setUploading(false);
  };

  const filtered = guests.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "pending") return !g.rsvp;
    if (filter === "attending") return g.rsvp?.attending === true;
    if (filter === "declined") return g.rsvp?.attending === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-deep text-white font-['Lato',sans-serif]">
      {/* Header */}
      <div className="border-b border-yellow-500/10 px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-yellow-500/50 text-[0.6rem] tracking-[0.4em] uppercase mb-1">
            Wedding Dashboard
          </p>
          <h1 className="font-['Cormorant_Garamond',serif] text-2xl text-yellow-400/90">
            Feyisayo &amp; Olawale
          </h1>
        </div>
        <button
          onClick={fetchData}
          className="text-[0.65rem] tracking-widest uppercase border border-yellow-500/20 text-yellow-500/50 hover:text-yellow-500 hover:border-yellow-500/40 px-4 py-2 transition-colors rounded-sm"
        >
          Refresh
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <StatCard label="Total" value={stats.total} color="border-white/10" />
            <StatCard label="Responded" value={stats.responded} color="border-blue-400/20" />
            <StatCard label="Attending" value={stats.attending} color="border-emerald-400/20" />
            <StatCard label="Declined" value={stats.declined} color="border-red-400/20" />
            <StatCard label="+1s" value={stats.plusOnes} color="border-purple-400/20" />
            <StatCard label="Pending" value={stats.pending} color="border-yellow-500/20" />
          </div>
        )}

        {/* Upload guests */}
        <div className="border border-yellow-500/15 rounded-sm p-6 bg-white/2">
          <h2 className="text-sm font-medium text-yellow-400/80 mb-1 tracking-wider uppercase">
            Add Guests
          </h2>
          <p className="text-[0.7rem] text-white/30 mb-4">
            Upload a CSV file or paste names (one per line, or comma-separated).
          </p>
          <div className="flex gap-3 mb-3 flex-wrap">
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.txt"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="text-[0.65rem] tracking-widest uppercase border border-yellow-500/25 text-yellow-500/60 hover:text-yellow-500 hover:border-yellow-500/50 px-4 py-2 transition-colors rounded-sm"
            >
              Choose CSV file
            </button>
          </div>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={"Tunde Adeyemi\nNgozi Okafor\nFatimah Bello, Emeka Nwosu"}
            className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-yellow-500/30 resize-none h-28 mb-3"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              disabled={!csvText.trim() || uploading}
              className="bg-yellow-500/90 hover:bg-yellow-400 disabled:opacity-30 text-black text-[0.65rem] tracking-widest uppercase font-bold px-6 py-2.5 transition-colors rounded-sm"
            >
              {uploading ? "Uploading..." : "Add Guests"}
            </button>
            {uploadResult && (
              <span className="text-[0.7rem] text-yellow-400/70">{uploadResult}</span>
            )}
          </div>
        </div>

        {/* Guest list */}
        <div>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guests..."
              className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/30"
            />
            <div className="flex gap-2">
              {(["all", "pending", "attending", "declined"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[0.6rem] tracking-widest uppercase px-3 py-1.5 rounded-sm border transition-colors ${
                    filter === f
                      ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                      : "border-white/10 text-white/40 hover:text-white/60"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Error / loading */}
          {error && (
            <div className="border border-red-500/20 text-red-400/70 text-sm p-4 rounded-sm mb-4">
              {error === "Supabase not configured"
                ? "Supabase is not configured yet. Add your credentials to .env.local to enable the dashboard."
                : error}
            </div>
          )}

          {loading && (
            <div className="text-white/30 text-sm py-8 text-center">Loading guests...</div>
          )}

          {/* Table */}
          {!loading && !error && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-[0.6rem] tracking-widest uppercase text-white/30">
                      <th className="text-left py-3 pr-4 font-normal">Name</th>
                      <th className="text-left py-3 pr-4 font-normal hidden sm:table-cell">Invite Link</th>
                      <th className="text-left py-3 pr-4 font-normal hidden sm:table-cell">QR</th>
                      <th className="text-left py-3 pr-4 font-normal">Status</th>
                      <th className="text-left py-3 pr-4 font-normal hidden md:table-cell">Dietary</th>
                      <th className="text-left py-3 font-normal hidden md:table-cell">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filtered.map((g, i) => {
                        const link = `${BASE_URL}/invite/${g.token}`;
                        return (
                          <motion.tr
                            key={g.id}
                            className="border-b border-white/4 hover:bg-white/2 transition-colors"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.02 }}
                          >
                            <td className="py-3 pr-4 text-white/80 font-medium whitespace-nowrap">
                              {g.name}
                            </td>
                            <td className="py-3 pr-4 text-[0.65rem] text-yellow-500/40 whitespace-nowrap hidden sm:table-cell">
                              /invite/{g.token}
                              <CopyButton text={link} />
                            </td>
                            <td className="py-3 pr-4 hidden sm:table-cell">
                              <a
                                href={`/api/qr/${g.token}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[0.6rem] tracking-widest uppercase border border-yellow-500/20 text-yellow-500/40 hover:text-yellow-500 hover:border-yellow-500/50 px-2 py-1 transition-colors rounded-sm"
                              >
                                QR
                              </a>
                            </td>
                            <td className="py-3 pr-4 whitespace-nowrap">
                              <StatusBadge rsvp={g.rsvp} />
                            </td>
                            <td className="py-3 pr-4 text-[0.7rem] text-white/30 hidden md:table-cell">
                              {g.rsvp?.dietary ?? "—"}
                            </td>
                            <td className="py-3 text-[0.7rem] text-white/30 max-w-50 truncate hidden md:table-cell">
                              {g.rsvp?.message ?? "—"}
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>

                {filtered.length === 0 && !loading && (
                  <p className="text-center text-white/20 text-sm py-10">
                    {guests.length === 0 ? "No guests added yet." : "No matches found."}
                  </p>
                )}
              </div>

              <p className="text-[0.6rem] text-white/20 mt-4 tracking-widest uppercase">
                Showing {filtered.length} of {guests.length} guests
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
