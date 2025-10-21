import React, { useState, useEffect, useRef } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isMessageSendLoading, setIsMessageSendLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      setImagePreview(null);
      toast.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) {
      return;
    }
    setIsMessageSendLoading(true);
    try {
      await onSend({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message.");
    } finally {
      setIsMessageSendLoading(false);
    }
  };

  return (
    <div className="p-4 w-full border-t border-cyan-300">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-25 h-25 object-cover bg-transparent rounded-lg border border-zinc-700 p-2"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer bg-black"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 py-2 items-center">
          <input
            type="text"
            className="w-full rounded-lg py-2 pl-1 border border-cyan-300 focus:outline-none focus:ring-1 focus:ring-[#00c4cc]"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`flex cursor-pointer ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-7" />
          </button>
        </div>
        <button
          type="submit"
          className={`text-green-600 ${
            isMessageSendLoading || (!text.trim() && !imagePreview)
              ? "cursor-not-allowed opacity-70"
              : "!cursor-pointer"
          }`}
          disabled={(!text.trim() && !imagePreview) || isMessageSendLoading}
        >
          <Send size={25} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
