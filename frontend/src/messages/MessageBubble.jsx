export default function MessageBubble({ message }) {
  const loggedInUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).userId
    : null;
  const isSentByCurrentUser = message.senderId === loggedInUser;

  return (
    <div
      className={`flex ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl shadow ${
          isSentByCurrentUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.text && <p>{message.text}</p>}
        {message.image?.url && (
          <img
            src={message.image.url}
            alt="attachment"
            className="mt-2 rounded-lg max-w-full h-auto shadow"
          />
        )}
        <p className="text-xs mt-1 opacity-70 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
