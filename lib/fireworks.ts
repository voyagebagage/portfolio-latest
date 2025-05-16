// /lib/fireworks.ts

// Demo response function that works without any API keys
// This is the simplest fallback that will always work
const createDemoResponse = (question: string) => {
  const encoder = new TextEncoder();
  
  // Customize response based on the question
  let message = "";
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("experience") || lowerQuestion.includes("work")) {
    message = "I'm currently a Freelance Developer in Koh Phangan and also work with Ninja. Previously, I worked as an event manager for a Resort and have 3 years of experience in tourism and several years managing food businesses.";
  } else if (lowerQuestion.includes("skills") || lowerQuestion.includes("tech") || lowerQuestion.includes("stack")) {
    message = "My technical skills include Frontend: React, Next.js, TypeScript, Tailwind CSS; Backend: Cloudflare, AWS, Prisma; Database: PostgreSQL, MongoDB, DynamoDB, Cloudflare D1; and Cloud technologies: AWS, Docker.";
  } else if (lowerQuestion.includes("how are you")) {
    message = "I'm doing well, thanks for asking! How can I help you with information about my professional background?";
  } else if (lowerQuestion.includes("education") || lowerQuestion.includes("study")) {
    message = "I have a Master's in Computer Science from Tech University (2022) and a Bachelor's in Software Engineering from State University (2020).";
  } else if (lowerQuestion.includes("project")) {
    message = "I've worked on several projects including an E-commerce Platform with real-time inventory, a Social Media Dashboard with analytics tools, and a collaborative Task Management App.";
  } else if (lowerQuestion.includes("personal") || lowerQuestion.includes("married") || lowerQuestion.includes("kids") || lowerQuestion.includes("family")) {
    message = "I'm married with kids and enjoy hiking in my free time. I prefer to keep most personal details private, but I'm happy to share my professional experience.";
  } else {
    message = "I'm the portfolio assistant. I can tell you about my professional background, skills, projects, and education. What would you like to know?";
  }
  
  return new ReadableStream({
    start(controller) {
      // Split message into words for streaming effect
      const chunks = message.split(" ");
      
      let count = 0;
      const interval = setInterval(() => {
        if (count >= chunks.length) {
          clearInterval(interval);
          controller.close();
          return;
        }
        
        const jsonData = {
          choices: [{ delta: { content: chunks[count] + " " } }]
        };
        const data = `data: ${JSON.stringify(jsonData)}\n\n`;
        controller.enqueue(encoder.encode(data));
        count++;
      }, 30); // Faster speed for better user experience
    }
  });
};

// This is the main function that gets called by the API route
export const generateStreamingResponse = async (
  messages: Array<{ role: string; content: string }>
) => {
  // Get the latest user message for the demo response fallback
  const userMessage = messages.find(msg => msg.role === "user")?.content || "";
  
  // Try to use LlamaAPI with your provided key
  const llamaKey = process.env.NEXT_PUBLIC_LLAMA_API_KEY;
  if (llamaKey) {
    try {
      console.log("Using LlamaAPI...");
      
      // This is the correct endpoint URL for LlamaAPI
      const response = await fetch("https://api.llama-api.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${llamaKey}`,
        },
        body: JSON.stringify({
          model: "llama-3-8b-chat", // Update this with the correct model name
          messages,
          stream: true,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      
      // Log the response status to help debug
      console.log("LlamaAPI response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`LlamaAPI error: ${response.status}`);
      }
      
      console.log("LlamaAPI response successful");
      return response.body;
    } catch (error) {
      console.error("LlamaAPI error:", error);
      // Fall through to demo response
    }
  }
  
  // If LlamaAPI fails or no key is provided, use the demo response
  console.log("Using demo response fallback");
  return createDemoResponse(userMessage);
}
