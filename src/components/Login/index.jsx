import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ storageValue, setStorageValue }) {
  const [userId, setUserId] = useState("");
  const [removeLogin, setRemoveLogin] = useState(false);
  const navigate = useNavigate();
  const [found, setFound] = useState(false);

  return (
    <div
      className={`font-Quicksand ${
        removeLogin && "-translate-x-[170vw]"
      } transition-all duration-1000 h-screen fixed bg-transparent z-50 left-0 justify-center flex items-center backdrop-blur-[3px] w-[100%]`}
    >
      <div className=" p-4">
        <span className="font-bold text-lg">Chat Name</span>
        {found && (
          <p className="font-semibold text-xs text-red-500">
            Username taken try again
          </p>
        )}
        <input
          type="text"
          onChange={(e) => setUserId(e.target.value)}
          className="w-full h-[58px] font-semibold mt-4 outline-sky-600 rounded-[3px] px-4 bg-slate-100"
        />
        <button
          disabled={userId.length < 4}
          onClick={() => {
            const findName = storageValue.find((name) => name.id === userId);

            setStorageValue((prevUsers) => {
              if (findName) return [...prevUsers];
              return [...prevUsers, { id: userId }];
            });

            setRemoveLogin(true);

            setTimeout(() => {
              navigate(`./chats/${userId}`);
            }, 1000);
          }}
          className={`font-bold ${
            userId.length < 4 ? "bg-sky-600 opacity-40" : "bg-sky-600"
          } mt-4 py-4 px-16 w-max rounded-[3px] text-white`}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
