import { NextResponse } from "next/server";
import { getLearningResources } from "@/lib/data-service";

export async function GET() {
  try {
    const resources = await getLearningResources();
    return NextResponse.json({ success: true, resources });
  } catch (error) {
    console.error("Error in resources API:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch learning resources" }, { status: 500 });
  }
}
