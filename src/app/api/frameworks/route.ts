import { NextResponse } from "next/server";
import { getCareerFrameworks } from "@/lib/data-service";

export async function GET() {
  try {
    const frameworks = await getCareerFrameworks();
    return NextResponse.json({ success: true, frameworks });
  } catch (error) {
    console.error("Error in frameworks API:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch career frameworks" }, { status: 500 });
  }
}
