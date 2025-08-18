"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface AIChatBoxRef {
  setInputValue: (value: string) => void;
  submitMessage: (message: string) => void;
  setEmailMode: (mode: boolean) => void;
}

export const AIChatBox = forwardRef<AIChatBoxRef>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! Ask me about my professional experience and skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setInputValue: (value: string) => {
      setInput(value);
    },
    submitMessage: (message: string) => {
      if (!message.trim() || isLoading) return;

      // Create a copy of the updated messages array with the new user message
      const updatedMessages: Message[] = [
        ...messages,
        { role: "user" as const, content: message.trim() },
      ];
      // Set the messages state with the user message included
      setMessages(updatedMessages);
      setIsLoading(true);

      handleSubmitMessage(message.trim());
    },
    setEmailMode: (mode: boolean) => {
      setIsEmailMode(mode);
      if (mode) {
        setMessages([
          {
            role: "assistant",
            content:
              "📧 **Email Mode Activated!**\n\nPlease write your email below. I'll help you send it using your default email client!\n\n*[Click here to go back to chat mode](?back)*",
          },
        ]);
      } else {
        setMessages([
          {
            role: "assistant",
            content: "Hi! Ask me about my professional experience and skills!",
          },
        ]);
      }
    },
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Only scroll to bottom when messages change, not on initial load
  useEffect(() => {
    // Skip scrolling on initial render
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  // Extract API call logic into a separate function
  const handleSubmitMessage = async (userMessage: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      let accumulatedResponse = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        // Parse the chunk as a string
        const chunk = new TextDecoder().decode(value);

        // Split by lines and process each line
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.slice(5));
              if (jsonData.choices[0]?.delta?.content) {
                accumulatedResponse += jsonData.choices[0].delta.content;

                // Add a small delay to slow down the typing effect (20% slower)
                await new Promise((resolve) => setTimeout(resolve, 36));
                // Keep all previous messages including the user message
                // Just update or add the assistant response
                setMessages((prev) => {
                  // Get the last non-assistant message (which should be the user's)
                  const userMessageIndex = prev.findIndex(
                    (msg) => msg.role === "user" && msg.content === userMessage
                  );

                  // If there's already an assistant response after the user message, replace it
                  // Otherwise, add a new assistant message
                  const hasAssistantResponse =
                    userMessageIndex < prev.length - 1 &&
                    prev[prev.length - 1].role === "assistant";

                  if (hasAssistantResponse) {
                    return [
                      ...prev.slice(0, -1),
                      { role: "assistant", content: accumulatedResponse },
                    ];
                  } else {
                    return [
                      ...prev,
                      { role: "assistant", content: accumulatedResponse },
                    ];
                  }
                });
              }
            } catch {
              // Skip invalid JSON
              continue;
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email sending
  const handleEmailSend = async (emailContent: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: emailContent,
          isEmail: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      await response.json();

      // Create mailto link
      const mailto = `mailto:idevandyou@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(
        emailContent
      )}`;

      // Open email client
      window.open(mailto, "_self");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✅ **Email sent successfully!**\n\nYour email has been opened in your default email client. Please complete sending it from there.\n\n📧 **Email preview:**\n*To: idevandyou@gmail.com*\n*Subject: Contact from Portfolio*\n\n---\n\n**Your message:** ${emailContent}\n\n---\n\n*[Click here to send with your email client](${mailto})*`,
        },
      ]);
    } catch (error) {
      console.error("Email error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Sorry, there was an error preparing your email. Please try again or contact me directly at idevandyou@gmail.com",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsEmailMode(false);
    }
  };

  // In your handleSubmit function in AIChatBox.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    if (isEmailMode) {
      // Handle email sending
      const updatedMessages: Message[] = [
        ...messages,
        { role: "user" as const, content: userMessage },
      ];
      setMessages(updatedMessages);
      setIsLoading(true);

      await handleEmailSend(userMessage);
    } else {
      // Create a copy of the updated messages array with the new user message
      const updatedMessages: Message[] = [
        ...messages,
        { role: "user" as const, content: userMessage },
      ];
      // Set the messages state with the user message included
      setMessages(updatedMessages);
      setIsLoading(true);

      await handleSubmitMessage(userMessage);
    }
  };

  return (
    <Card className="w-full bg-[#F5EDED]/80 border border-[#7FA1C3]/30">
      <CardHeader className="">
        <CardTitle className="text-xl font-semibold text-[#6482AD]">
          Want to know more about me?
        </CardTitle>
        <div className="flex gap-2 mt-2">
          <Button
            onClick={() => {
              setIsEmailMode(true);
              setMessages([
                {
                  role: "assistant",
                  content:
                    "📧 **Email Mode Activated!**\n\nPlease write your email below. I'll help you send it using your default email client!\n\n*[Click 'Chat Mode' to go back to chatting]*",
                },
              ]);
            }}
            variant="outline"
            size="sm"
            className="text-[#6482AD] border-[#6482AD] hover:bg-[#6482AD] hover:text-white">
            📧 Email Me
          </Button>
          <Button
            onClick={() => {
              setIsEmailMode(false);
              setMessages([
                {
                  role: "assistant",
                  content:
                    "Hi! Ask me about my professional experience and skills!",
                },
              ]);
            }}
            variant="outline"
            size="sm"
            className={`${
              !isEmailMode
                ? "bg-[#6482AD] text-white"
                : "text-[#6482AD] border-[#6482AD] hover:bg-[#6482AD] hover:text-white"
            }`}>
            💬 Chat Mode
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px] overflow-y-auto space-y-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-[#7FA1C3] text-white shadow-sm"
                    : "bg-[#E2DAD6]/25 border border-[#7FA1C3]/20 text-[#6482AD] shadow-md"
                }`}>
                {message.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        // Custom styling for markdown elements
                        strong: ({ children }) => (
                          <strong className="font-semibold text-[#6482AD]">
                            {children}
                          </strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-outside ml-6 space-y-1 my-2">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="pl-1">{children}</li>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold text-[#6482AD] mt-3 mb-2">
                            {children}
                          </h2>
                        ),
                        p: ({ children }) => <p className="my-2">{children}</p>,
                      }}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isEmailMode ? "Write your email here..." : "Ask me anything ..."
            }
            disabled={isLoading}
            className="flex-1 border-[#7FA1C3]/30 focus-visible:ring-[#7FA1C3] text-[#6482AD] placeholder:text-[#6482AD] bg-white/60"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#6482AD] hover:bg-[#7FA1C3] text-white"
            title={isEmailMode ? "Send Email" : "Send Message"}>
            {isLoading ? (
              <Loader2 className="h-6 w-4 animate-spin" />
            ) : (
              <Send className="h-6 w-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});

AIChatBox.displayName = "AIChatBox";
