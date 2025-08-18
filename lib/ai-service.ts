// /lib/ai-service.ts

// Create a streaming error response
const createErrorStream = (errorMessage: string) => {
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      const jsonData = {
        choices: [{ delta: { content: errorMessage } }],
      };
      const data = `data: ${JSON.stringify(jsonData)}\n\n`;
      controller.enqueue(encoder.encode(data));
      controller.close();
    },
  });
};

// This is the main function that gets called by the API route
export const generateStreamingResponse = async (
  messages: Array<{ role: string; content: string }>
) => {
  // Try to use Groq API - fallback to LlamaAPI if Groq key not available
  const groqKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  const llamaKey = process.env.NEXT_PUBLIC_LLAMA_API_KEY;

  console.log(
    "Groq API Key check:",
    groqKey ? "Key is present" : "Key is missing"
  );
  console.log(
    "Llama API Key check:",
    llamaKey ? "Key is present" : "Key is missing"
  );

  // Prefer Groq if available, fallback to Llama
  if (groqKey) {
    try {
      console.log("Using Groq API...");

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192", // Groq's free tier model
            messages,
            stream: true,
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      console.log("Groq API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Groq API error response:", response.status, errorText);

        // Handle specific Groq errors
        if (response.status === 429) {
          return createErrorStream(
            "I'm currently at capacity. Please try again in a few minutes - I'm using a free service with daily limits."
          );
        } else if (response.status === 401) {
          return createErrorStream(
            "There's an issue with my configuration. Please contact the portfolio owner."
          );
        } else if (response.status === 400) {
          return createErrorStream(
            "I encountered an issue processing your request. Please try rephrasing your question."
          );
        } else if (response.status === 403) {
          return createErrorStream(
            "I don't have permission to access the AI service. Please contact the portfolio owner."
          );
        } else if (response.status >= 500) {
          return createErrorStream(
            "The AI service is temporarily unavailable. Please try again in a few minutes."
          );
        }

        return createErrorStream(
          "I'm currently experiencing technical difficulties. Please try again later."
        );
      }

      console.log("Groq API response successful");
      return response.body;
    } catch (error) {
      console.error("Groq API error:", error);
      // If Groq fails, try to fallback to Llama if available
      if (llamaKey) {
        console.log("Groq failed, falling back to LlamaAPI...");
      } else {
        return createErrorStream(
          "I'm currently experiencing technical difficulties. Please try again later."
        );
      }
    }
  }

  // Fallback to LlamaAPI if Groq is not available or failed
  if (llamaKey) {
    try {
      console.log("Using LlamaAPI...");

      const response = await fetch(
        "https://api.llama-api.com/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${llamaKey}`,
          },
          body: JSON.stringify({
            model: "llama3-8b",
            messages,
            stream: true,
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      console.log("LlamaAPI response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("LlamaAPI error response:", response.status, errorText);
        return createErrorStream(
          "I'm currently experiencing technical difficulties. Please try again later."
        );
      }

      console.log("LlamaAPI response successful");
      return response.body;
    } catch (error) {
      console.error("LlamaAPI error:", error);
      return createErrorStream(
        "I'm currently experiencing technical difficulties. Please try again later."
      );
    }
  }

  // No API keys available
  console.error("No API keys configured");
  return createErrorStream(
    "I'm currently unavailable. Please contact the portfolio owner to set up the AI chat service."
  );
};
