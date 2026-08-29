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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user_101",
          target_role: "Backend AI Developer",
          completed_modules: 2,
          total_modules: 10,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

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
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <h1 className="text-2xl font-bold mb-4">Learning Progress</h1>

      {loading && <p className="text-slate-400">Loading summary...</p>}

      {error && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-center">
          <p className="text-red-400 font-semibold mb-2">Progress unavailable</p>
          <p className="text-xs text-slate-400 mb-4">Could not load progress summary.</p>
          <button
            onClick={fetchProgressSummary}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs"
          >
            Retry
          </button>
        </div>
      )}

      {summary && !loading && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-sm">
          <p><span className="text-slate-400">Target Role:</span> {summary.target_role}</p>
          <p><span className="text-slate-400">Completion:</span> <span className="text-emerald-400 font-bold">{summary.completion_percentage}</span></p>
          <p><span className="text-slate-400">Status:</span> {summary.readiness_status}</p>
          <p><span className="text-slate-400">Next Action:</span> {summary.next_recommended_milestone}</p>
        </div>
      )}
    </div>
  );
}
