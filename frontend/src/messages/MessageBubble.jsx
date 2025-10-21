import React from "react";

export default function MessageBubble({ user, message }) {
  const loggedInUserId = user?.userId;
  const isSentByCurrentUser = message.senderId === loggedInUserId;

  return (
    <div
      className={`flex ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`max-w-xs md:max-w-md px-5 py-2 rounded-xl shadow ${
          isSentByCurrentUser
            ? "bg-slate-900 text-white rounded-br-none"
            : "bg-gray-300 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.image?.url && (
          <img
            src={message.image.url}
            alt="attachment"
            className="mb-2 rounded-lg max-w-full h-auto shadow"
          />
        )}
        {message.text && <p>{message.text}</p>}
        <p
          className={`text-xs mt-1 opacity-70 ${
            isSentByCurrentUser ? "text-right" : "text-left"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
