import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { chatId } from "./features/chatSlice";
import useLocalStorage from "./hooks/useLocalStorage";

export const routes = {
  chatRoom: "chats/:username",
  login: "/",
};

const ChatRoom = lazy(() => import("./components/ChatRoom"));
const Login = lazy(() => import("./components/Login"));

function App() {
  const [storageValue, setStorageValue] = useLocalStorage("userId", []);
  const users = useSelector((state) => state.chat.chatName);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatId(storageValue));
  }, [users, storageValue]);

  return (
    <div className="max-w-[768px] relative mx-auto h-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="chats/:username" element={<ChatRoom />} />
          <Route
            path="/"
            element={
              <Login
                storageValue={storageValue}
                setStorageValue={setStorageValue}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
