"use client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  messages: Message[];
}

export default function ChatWindow({
  messages,
}: Props) {
  return (
    <div className="border rounded-xl p-4 h-[500px] overflow-y-auto bg-slate-50">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            message.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-xl px-4 py-3 ${
              message.role === "user"
                ? "bg-black text-white"
                : "bg-white border"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}