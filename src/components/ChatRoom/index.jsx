import React, { useEffect, useRef, useState } from "react";
import { ImUserTie } from "react-icons/im";
import { TbSend } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { messageHandler } from "../../features/chatSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const ChatContainerReceipient = ({ message, username }) => {
  return (
    <div className="flex w-[70%] mr-auto flex-col border-slate-600 ">
      <p className="font-semibold text-slate-400 text-xs mr-auto">{username}</p>
      <div className="flex items-center gap-4">
        <div className="rounded-full flex shadow-md items-center justify-center h-10 w-10 bg-slate-50">
          <ImUserTie />
        </div>
        <div className="max-w-[70%] shadow-md w-max h-max p-4 rounded-3xl text-slate-700 font-normal text-xs bg-slate-50">
          <span>{message.message.msg}</span>
        </div>
      </div>
    </div>
  );
};

const ChatContainerSender = ({ message, username }) => {
  return (
    <div className="flex w-[70%] ml-auto flex-col border-slate-600 ">
      <p className="font-semibold text-slate-400 text-xs ml-auto">{username}</p>
      <div className="flex items-center justify-end gap-4 w-full">
        <div className="max-w-[70%] shadow-md h-max p-4 rounded-3xl text-white font-normal text-xs bg-sky-600">
          <span>{message.message.msg}</span>
        </div>
        <div className="rounded-full flex shadow-md items-center justify-center h-10 w-10 bg-sky-600 text-white">
          <ImUserTie />
        </div>
      </div>
    </div>
  );
};

export default function ChatRoom() {
  const [message, setMessage] = useState("");

  const messgesStore = useSelector((state) => state.chat.messages);

  const dispatch = useDispatch();
  const params = useParams();

  const chatContainerRef = useRef();

  const [storageValue, setStorageValue] = useLocalStorage("messages", []);

  useEffect(() => {
    dispatch(messageHandler(storageValue));
  }, [storageValue]);

  useEffect(() => {
    chatContainerRef.current.scrollBy({
      behavior: "smooth",
      top: 100000,
      left: 0,
    });
  });

  return (
    <section>
      <div className="h-20 w-full flex items-center font-semibold text-slate-500 justify-center shadow-md bg-slate-50">
        Web Chat
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-center font-semibold text-slate-400 text-xs py-4">
          {new Date().toLocaleString().substring(0, 10).replace(/(\/)/g, " ")}
        </h1>

        <div
          ref={chatContainerRef}
          className="w-full flex overflow-y-scroll h-screen pb-60 flex-col gap-4 px-4"
        >
          {messgesStore !== null &&
            messgesStore?.map((msg, index) => {
              if (msg.message.sender === params.username)
                return (
                  <ChatContainerSender
                    key={msg + index}
                    username={msg.message.sender === params.username && "You"}
                    message={msg}
                  />
                );
              else
                return (
                  <ChatContainerReceipient
                    key={msg + index}
                    username={msg.message.sender}
                    message={msg}
                  />
                );
            })}
        </div>
      </div>

      <div className="w-full max-w-[768px] h-20 bg-white bottom-0 fixed  px-4 flex items-center justify-center ">
        <div className="flex bg-slate-100 box-border h-16 w-full shadow-md rounded-[36px] items-center gap-4 pl-4">
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-[48px] font-semibold pt-5 text-xs text-slate-600 resize-none bg-transparent outline-none rounded-[3px] px-1 "
          />
          <button
            onClick={() => {
              if (message === "") return;

              return new Promise((resolve) => {
                resolve(
                  setStorageValue((prevMessage) => {
                    return [
                      ...prevMessage,
                      { message: { sender: params.username, msg: message } },
                    ];
                  })
                );
              })
                .then(() =>
                  chatContainerRef.current.scrollBy({
                    behavior: "smooth",
                    top: 200,
                    left: 0,
                  })
                )
                .then(() => setMessage(""));
            }}
            className={`font-bold p-4 mr-1 shadow-md rounded-full min-h-16 min-w-16  text-white bg-sky-500`}
          >
            <TbSend />
          </button>
        </div>
      </div>
    </section>
  );
}