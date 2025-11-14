"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useVendorChat,
  VendorChatProvider,
} from "@/lib/context/VendorChatContext";
import { setActiveChat, resetChatState } from "@/lib/slices/chatslice";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import "./style.css";

// Default avatar path
const DEFAULT_AVATAR = "/images/chat_avatar.jpg";

function AvatarImage({ size = 36, src = "", alt = "avatar" }) {
  // Use default avatar if no src provided or if src is empty
  const avatarSrc = src
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`
    : DEFAULT_AVATAR;

  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: "#eeeeee",
        border: "3px solid #51004F",
      }}
    >
      {avatarSrc ? (
        <Image
          src={avatarSrc}
          alt={alt}
          width={size}
          height={size}
          style={{ objectFit: "cover" }}
          priority={true}
          unoptimized={true}
          onError={(e) => {
            // If image fails to load, show default avatar
            e.target.src = DEFAULT_AVATAR;
          }}
        />
      ) : (
        <BsPersonCircle size={24} color="#000000" />
      )}
    </div>
  );
}

function ConversationList({ items, activeId, onSelect, loading }) {
  const [query, setQuery] = useState("");

  const filtered = items.filter(
    (c) =>
      c.userName?.toLowerCase().includes(query.trim().toLowerCase()) ||
      c.lastMessage?.toLowerCase().includes(query.trim().toLowerCase())
  );

  const getLastMessageTime = (timestamp) => {
    if (!timestamp) return "";

    let date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (timestamp && typeof timestamp === "object" && timestamp.toDate) {
      date = timestamp.toDate();
    } else if (typeof timestamp === "string" || typeof timestamp === "number") {
      date = new Date(timestamp);
    } else {
      return "";
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="card h-100 d-flex flex-column overflow-hidden rounded-0 bg-transparent border-0">
        <div className="p-3 bg-transparent">
          <p className="conversation_heading">Customer Messages</p>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 d-flex flex-column overflow-hidden rounded-0 bg-transparent border-0">
      <div className="p-3 bg-transparent">
        <p className="conversation_heading">Customer Messages</p>
      </div>
      <div className="overflow-auto flex-grow-1 bg-transparent custom-scrollbar">
        <div className="list-group list-group-flush">
          {filtered.map((c, idx) => (
            <div
              key={c.id}
              className="list-group-item p-0 bg-transparent"
              //   style={{ borderBottom: "1px solid #573D1A" }}
            >
              <button
                onClick={() => onSelect(c)}
                className={`list-group-item list-group-item-action border-0 py-3 px-3 d-flex align-items-start gap-3 w-100 ${
                  c.id === activeId ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    c.id === activeId ? "rgba(18, 12, 49, 0.5)" : "transparent",
                }}
              >
                <div className="position-relative flex-shrink-0">
                  <AvatarImage size={50} src={c.avatar} alt={c.userName} />
                  {/* Show unread badge if there are unread messages from user */}
                  {c.unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge bg-danger border border-white rounded-circle p-1">
                      {c.unreadCount}
                    </span>
                  )}
                </div>
                <div
                  className="flex-grow-1 min-w-0"
                  style={{ width: "calc(100% - 70px)" }}
                >
                  {/* User Name and Time Row */}
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                    <span
                      className="fw-semibold small txt_color"
                      style={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                        minWidth: 0,
                      }}
                      title={c.userName}
                    >
                      {c.userName}
                    </span>
                    <span
                      className="text-xs flex-shrink-0"
                      style={{
                        minWidth: "fit-content",
                        textAlign: "right",
                        fontSize: "0.75rem",
                        color: "#8b8a8aff",
                      }}
                    >
                      {getLastMessageTime(c.lastMessageAt)}
                    </span>
                  </div>

                  {/* Last Message */}
                  <p
                    className="small mb-1"
                    style={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      lineHeight: "1.3",
                      color: "#8b8a8aff",
                    }}
                    title={c.lastMessage}
                  >
                    {c.lastMessage}
                  </p>
                </div>
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center p-4 text-light">
              <RiMessengerLine size={32} className="mb-2 opacity-50" />
              <p>No customer messages yet</p>
              <small className="text-muted">
                Customer conversations will appear here
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatHeader({ chat, onBack, showBack }) {
  if (!chat) return null;

  return (
    <div
      className="py-3 px-3 d-flex align-items-center gap-3"
      style={{
        backgroundColor: "#F5B7CA",
        borderRadius: "10px",
      }}
    >
      {showBack && (
        <button
          onClick={onBack}
          className="btn btn-link p-0 border-0 text-light flex-shrink-0"
          aria-label="Back to conversations"
        >
          <BiArrowBack size={20} />
        </button>
      )}
      <AvatarImage size={45} src={chat?.avatar} alt={chat.userName} />
      <div className="flex-grow-1 min-w-0">
        <h6 className="fw-bold text-truncate mb-0" style={{ color: "#000000" }}>
          {chat.userName} -{" "}
          <span style={{ color: "#000000", fontWeight: 400 }}>Customer</span>
        </h6>
      </div>
    </div>
  );
}

function MessageBubble({ message, currentUserId }) {
  const isOut =
    message.senderRole === "vendor" || message.senderId === currentUserId;
  const displayText = message.content || message.text;

  const getTime = () => {
    if (!message.timestamp) return "";

    let date;
    if (message.timestamp instanceof Date) {
      date = message.timestamp;
    } else if (
      message.timestamp &&
      typeof message.timestamp === "object" &&
      message.timestamp.toDate
    ) {
      date = message.timestamp.toDate();
    } else if (
      typeof message.timestamp === "string" ||
      typeof message.timestamp === "number"
    ) {
      date = new Date(message.timestamp);
    } else {
      return "";
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div
      className={`d-flex mb-3 px-2`}
      style={{
        justifyContent: isOut ? "flex-end" : "flex-start",
        maxWidth: "100%",
      }}
    >
      <div
        className="flex-grow-0"
        style={{
          maxWidth: "85%",
          width: "fit-content",
        }}
      >
        <div
          className={`text-light`}
          style={{
            border: "1px solid",
            borderColor: isOut ? "#F5B7CA" : "#7843aa",
            // backgroundColor: isOut ? "#F5B7CA" : "#7843aa",
            borderRadius: isOut ? "11px 11px 0 11px" : "11px 11px 11px 0",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            padding:"0.6rem 1rem"
          }}
        >
          <p
            className="mb-0 small lh-sm"
            style={{
              wordBreak: "break-word",
              maxWidth: "100%",
              color: "#000000",
              textTransform: "unset",
              fontWeight: 400,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {displayText}
          </p>
        </div>
        <small
          className={`text-light d-block mt-1 px-1 ${
            isOut ? "text-end" : "text-start"
          }`}
        >
          <span style={{ color: "rgb(139, 138, 138)" }}>{getTime()} </span>
        </small>
      </div>
    </div>
  );
}

function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  return (
    <div
      className="rounded-pill px-3 py-2 mx-2 mb-2"
      style={{
        border: "1px solid #7843aa",
        backgroundColor: "#F5B7CA",
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control border-0 flex-grow-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your reply..."
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{
            backgroundColor: "#F5B7CA",
            color: "#000000",
            outline: "none",
            boxShadow: "none",
            fontSize: "14px",
          }}
        />
        <button
          className="btn btn-link p-0 border-0 flex-shrink-0"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          style={{ minWidth: "30px" }}
        >
          <IoSend size={20} color={disabled ? "#666666" : "#7843aa"} />
        </button>
      </div>
    </div>
  );
}

const VendorInbox = ({ vendorId }) => {
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const { conversations, activeChat, messages, loading } = useSelector(
    (state) => state.chat
  );
  const { sendMessage, setActiveChat } = useVendorChat();

  const handleSelectConversation = (conversation) => {
    setActiveChat(conversation);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  const handleSendMessage = async (text) => {
    try {
      await sendMessage(text);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetChatState());
    };
  }, [dispatch]);

  return (
    <main className="vh-100 w-100 bg-transparent">
      <div className="container-fluid h-100 p-0 bg-transparent">
        <div className="row g-0 h-100 bg-transparent m-0">
          {/* Conversation List - Show when no chat is selected or when we're not showing chat */}
          {!showChat && (
            <div className="col-12 h-100 bg-transparent">
              <ConversationList
                items={conversations}
                activeId={activeChat?.id}
                onSelect={handleSelectConversation}
                loading={loading}
              />
            </div>
          )}

          {/* Chat Panel - Show full screen when a chat is selected */}
          {showChat && (
            <div className="col-12 h-100 bg-transparent">
              <div className="card h-100 d-flex flex-column overflow-hidden bg-transparent border-0 rounded-0">
                {activeChat ? (
                  <>
                    <ChatHeader
                      chat={activeChat}
                      onBack={handleBackToList}
                      showBack={true}
                    />

                    {/* Messages Area */}
                    <div
                      ref={messagesEndRef}
                      className="flex-grow-1 overflow-auto p-2 p-md-3 d-flex flex-column bg-transparent custom-scrollbar"
                      style={{ minHeight: 0 }}
                    >
                      <div className="text-center my-2">
                        <span className="badge bg-light text-dark border rounded-pill px-3 py-2 small">
                          Chat with {activeChat.userName}
                        </span>
                      </div>

                      {messages.map((m) => (
                        <MessageBubble
                          key={m.id}
                          message={m}
                          currentUserId={vendorId}
                        />
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="bg-transparent pt-2">
                      <ChatInput
                        onSend={handleSendMessage}
                        disabled={loading}
                      />
                    </div>
                  </>
                ) : (
                  // Fallback in case activeChat is null but showChat is true
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="text-center text-light">
                      <RiMessengerLine size={48} className="mb-3 opacity-50" />
                      <h5 className="mb-2">No chat selected</h5>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={handleBackToList}
                      >
                        Back to conversations
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// Wrap with vendor provider
export default function VendorInboxWithProvider() {
  const state = useSelector((state) => state);
  console.log({ state: state.auth.user?._id });
  const vendorId = state?.auth?.user?._id || "";
  return (
    <VendorChatProvider vendorId={vendorId}>
      <VendorInbox vendorId={vendorId} />
    </VendorChatProvider>
  );
}
