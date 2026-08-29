import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const user_id = typeof body.user_id === "string" && body.user_id.trim() ? body.user_id.trim() : "user_101";
    const target_role = typeof body.target_role === "string" && body.target_role.trim() ? body.target_role.trim() : "Backend AI Developer";

    const completedValue = Number(body.completed_modules);
    const totalValue = Number(body.total_modules);

    const completed_modules = Number.isFinite(completedValue) ? Math.max(0, completedValue) : 2;
    const total_modules = Number.isFinite(totalValue) && totalValue > 0 ? totalValue : 10;
    const safe_completed_modules = Math.min(completed_modules, total_modules);
    const percentage = Math.min(100, Math.max(0, Math.floor((safe_completed_modules / total_modules) * 100)));

    return NextResponse.json({
      status: "success",
      user_id,
      target_role,
      completion_percentage: `${percentage}%`,
      completed_modules: safe_completed_modules,
      total_modules,
      next_recommended_milestone: "Build Microservice REST API with FastAPI",
      readiness_status: percentage > 40 ? "On Track" : "Needs Practice",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process progress summary" },
      { status: 500 }
    );
  }
}