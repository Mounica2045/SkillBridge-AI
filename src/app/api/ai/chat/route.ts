import { NextRequest, NextResponse } from "next/server";
import { generateAICareerResponse } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], context = {} } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message string is required" }, { status: 400 });
    }

    const aiResponse = await generateAICareerResponse(message, history, context);

    return NextResponse.json({
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate AI guidance response. Please try again.",
      },
      { status: 500 }
    );
  }
}
