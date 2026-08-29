"use client";

import React, { useEffect, useState } from "react";

export default function ProgressPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProgressSummary = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/progress/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user_101",
          target_role: "Backend AI Developer",
          completed_modules: 2,
          total_modules: 10,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressSummary();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#07090e] text-slate-100">
      {/* Page Container */}
      <main className="flex-1 p-8 space-y-6">
        <header className="border-b border-slate-800 pb-4">
          <p className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">PATHMIND AI</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">Progress</h1>
        </header>

        {loading && <p className="text-slate-400 text-sm">Loading progress summary...</p>}

        {error && (
          <div className="p-6 bg-slate-900/60 border border-red-500/20 rounded-xl text-center max-w-lg">
            <p className="text-red-400 font-semibold mb-2">Progress unavailable</p>
            <p className="text-xs text-slate-400 mb-4">Could not load progress summary.</p>
            <button
              onClick={fetchProgressSummary}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition"
            >
              Retry
            </button>
          </div>
        )}

        {summary && !loading && (
          <div className="max-w-2xl bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
              <span className="text-slate-400 text-sm font-medium">Target Role</span>
              <span className="font-semibold text-white">{summary.target_role}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
              <span className="text-slate-400 text-sm font-medium">Completion</span>
              <span className="text-emerald-400 font-bold text-lg">{summary.completion_percentage}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
              <span className="text-slate-400 text-sm font-medium">Readiness Status</span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
                {summary.readiness_status}
              </span>
            </div>
            <div className="pt-2">
              <span className="text-slate-400 text-xs block mb-1">Next Action</span>
              <p className="text-slate-200 text-sm font-medium">{summary.next_recommended_milestone}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}