import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Safely parse JSON or default to an empty object to prevent 422/500 errors
    const body = await request.json().catch(() => ({}));

    const user_id = body.user_id || "user_101";
    const target_role = body.target_role || "Backend AI Developer";
    const completed_modules = body.completed_modules ?? 2;
    const total_modules = body.total_modules || 10;

    const percentage = Math.floor((completed_modules / total_modules) * 100);

    return NextResponse.json({
      status: "success",
      user_id,
      target_role,
      completion_percentage: `${percentage}%`,
      completed_modules,
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
