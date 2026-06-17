"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Sparkles, Send } from "lucide-react";

import { askAssistant } from "@/services/assistant.service";
import ChatWindow from "@/components/assistant/ChatWindow";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantPage() {
  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        content:
          "Welcome! I can help you choose the right tax software based on your income sources, deductions, filing type, and tax situation. Ask me anything.",
      },
    ]);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function askQuestion() {
    if (!question.trim()) return;

    const userMessage = {
      role: "user" as const,
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response =
        await askAssistant(question);

      const assistantMessage = {
        role: "assistant" as const,

        content: `
${response.data.answer}

Product:
${response.data.recommendedProduct || "N/A"}

Confidence:
${response.data.confidence}

Reasons:
${response.data.reasons?.join("\n• ") || "N/A"}

Disclaimer:
${response.data.disclaimer}
        `,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            " Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  return (
      <div className="flex min-h-screen flex-col bg-slate-50">
    
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
            <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-blue-400 blur-3xl" />
          </div>
    
          <div className="relative mx-auto max-w-7xl px-6 py-16">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-white">
                AI Product Assistant
              </h1>
    
              <p className="mt-4 text-lg text-slate-300">
                Get personalized tax software recommendations
                based on your filing type, income sources,
                deductions, and business needs.
              </p>
            </div>
          </div>
        </div>
    
        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          <div className="mx-auto flex h-full max-w-7xl flex-col">
    
            {/* Chat Card */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border bg-white shadow-sm">
    
              <div className="border-b bg-slate-50 px-6 py-4">
                <h2 className="font-semibold text-slate-800">
                  Conversation
                </h2>
              </div>
    
              <div className="flex-1 overflow-y-auto p-6">
                <ChatWindow messages={messages} />
    
                {loading && (
                  <div className="mt-4">
                    <div className="inline-flex rounded-2xl border bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                      AI Assistant is typing...
                    </div>
                  </div>
                )}
              </div>
    
            </div>
    
            {/* Input Section */}
            <div className="mt-6 rounded-3xl border bg-white p-4 shadow-sm">
    
              <div className="flex gap-3">
    
                <input
                  value={question}
                  onChange={(e) =>
                    setQuestion(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !loading
                    ) {
                      askQuestion();
                    }
                  }}
                  placeholder="Ask a question about tax products..."
                  className="
                    flex-1
                    rounded-2xl
                    border
                    border-slate-200
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                  "
                />
    
                <button
                  disabled={
                    loading ||
                    !question.trim()
                  }
                  onClick={askQuestion}
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    px-6
                    py-3
                    font-medium
                    transition
                    ${
                      loading ||
                      !question.trim()
                        ? "cursor-not-allowed bg-slate-300 text-slate-500"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
                    }
                  `}
                >
                  <Send className="h-4 w-4" />
    
                  {loading
                    ? "Sending..."
                    : "Send"}
                </button>
    
              </div>
    
              <p className="mt-3 text-xs text-slate-500">
                This assistant provides general product guidance only and does not provide tax, legal, financial, or accounting advice.
              </p>
    
            </div>
    
          </div>
        </main>
    
      </div>
  );
}