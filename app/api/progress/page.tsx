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
      console.error("Failed to load progress summary:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressSummary();
  }, []);

  return (
    <div className="min-h-screen bg-[#060913] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">Learning Progress</h1>
          <p className="text-slate-400 text-sm mt-1">Track your role readiness and module completion</p>
        </div>

        {loading && <p className="text-slate-400">Loading progress summary...</p>}

        {error && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-center">
            <p className="text-red-400 font-semibold mb-2">Progress unavailable</p>
            <button
              onClick={fetchProgressSummary}
              className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs"
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
      </div>
    </div>
  );
}