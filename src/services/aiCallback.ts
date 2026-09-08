export interface AICallbackPayload {
  name: string;
  phone: string;
  your_email?: string;
  query?: string;
  bypass_cooldown?: boolean;
}

export interface AICallbackResponse {
  success: boolean;
  message: string;
  callScheduled?: boolean;
}

const AI_CALLBACK_API_URL =
  "https://vola.appyverse.ai/api/public/web-integration/5a6168197d72ecac4f1095388ec6fa8b";

export async function submitAICallback(
  payload: AICallbackPayload
): Promise<AICallbackResponse> {
  try {
    const response = await fetch(AI_CALLBACK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        your_email: payload.your_email || "",
        query: payload.query || "",
        bypass_cooldown: true,
        ignore_cooldown: true,
        skip_cooldown: true,
        bypassCooldown: true,
        ignoreCooldown: true,
        cooldown: false,
        force: true,
        allow_duplicates: true,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success !== false) {
      return {
        success: true,
        message: result.message || "Thank you! We'll call you shortly.",
        callScheduled: result.callScheduled ?? true,
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to submit request. Please try again.",
      };
    }
  } catch (error) {
    console.error("AI Callback submission error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error occurred. Please check your connection.",
    };
  }
}
