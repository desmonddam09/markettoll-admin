import React, { useContext, useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import {
  addDoc,
  collection,
  db,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { IoSend } from "react-icons/io5";

function ChatUIComponent() {
  const { isUserData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");

  const handleMessage = async () => {
    if (message.trim() === "") return;
    const chat_id = chatId?.chatId;
    const messageData = {
      senderId: isUserData?._id,
      text: message,
      timestamp: new Date().toISOString(),
    };

    try {
      const messagesRef = collection(db, "Adminchats", chat_id, "messages");
      await addDoc(messagesRef, messageData);
      await setDoc(doc(db, "userChats", chatId?.id), {
        user: {
          name: chatId?.user?.name,
          pic: chatId?.user?.pic,
        },
        chatId: chat_id,
        lastMessage: message,
        timestamp: new Date().toISOString(),
      });
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const fetchMessages = () => {
    const messagesRef = collection(
      db,
      "Adminchats",
      chatId?.chatId,
      "messages"
    );
    const messagesQuery = query(messagesRef);
    const unsubscribe = onSnapshot(messagesQuery,(querySnapshot) => {
        const messagesList = querySnapshot.docs.map((doc) => doc.data());
        console.log(messagesList, "messageList");
        setMessages(messagesList);
      },
      (error) => {
        console.error("Error fetching messages: ", error);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    if (chatId?.chatId) {
      const unsubscribe = fetchMessages();
      return () => unsubscribe();
    }
  }, [chatId]);

  const [originalUserList, setOriginalUserList] = useState([]);
  useEffect(() => {
    const fetchUsers = () => {
      // Create a reference to the "userChats" collection
      const usersRef = collection(db, "userChats");

      // Create a query for the "userChats" collection
      const usersQuery = query(usersRef);

      // Listen for real-time changes in the "userChats" collection
      const unsubscribe = onSnapshot(
        usersQuery,
        (querySnapshot) => {
          const usersList = querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }; // Add document ID to the data
          });

          // Update state with the fetched users
          setUsers(usersList);
          setOriginalUserList(usersList); // Assuming you want to keep a backup of the list
        },
        (error) => {
          console.error("Error fetching users: ", error);
        }
      );

      // Cleanup the real-time listener when the component unmounts or message changes
      return unsubscribe;
    };

    // Fetch users only if the "message" dependency changes
    const unsubscribe = fetchUsers();

    // Cleanup the listener on component unmount or when "message" changes
    return () => unsubscribe();
  }, [message]); // The effect runs when "message" changes

  const filterUser = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "") {
      setUsers(originalUserList);
    } else {
      console.log(originalUserList, "userListt");
      const dataFilter = originalUserList.filter((item) =>
        item.user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      console.log(dataFilter, filterValue, originalUserList, "filteration");
      setUsers(dataFilter);
    }
  };

  console.log(users, "userListss");

  return (
    <div className="grid grid-cols-[400px_1fr] h-[85vh]">
      <div className="flex flex-col w-[400px] max-h-[600px] border rounded-lg overflow-y-auto">
        {/* search compt */}
        <div className="border border-b-0 py-4 px-2">
          <input
            type="text"
            onChange={filterUser}
            placeholder="search chatting"
            className="flex-1 p-2 border w-full rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50"
          />
        </div>
        {/* end search compt */}
        {/* user list */}
        {users
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          ?.map((item) => (
            <div
              onClick={() => {
                setChatId(item);
              }}
              className="flex gap-2 cursor-pointer flex-row py-4 px-2 justify-center items-center border"
            >
              <div className="">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-[13px]  font-semibold">
                  {item?.user?.name}
                </div>
                <span className="text-gray-500 text-[12px] font-[400]">
                  {item?.lastMessage}
                </span>
              </div>
            </div>
          ))}
        {/* end user list */}
      </div>

      <div className="flex flex-col  w-full mx-auto border rounded-lg">
        {chatId ? (
          <>
            <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
                  alt="Avatar"
                  className="w-10 object-cover rounded-full"
                />
                <span className="ml-2 font-semibold">{chatId?.user?.name}</span>
              </div>
            </header>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 description-scroll max-h-[450px]">
              {messages
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                .map((item) => (
                  <div
                    className={`w-full px-2 flex flex-col ${
                      item.senderId == isUserData?._id
                        ? "items-end"
                        : "items-start"
                    }`}
                  >
                    <div
                      className={`w-[80%] lg:w-[307px] ${
                        item.senderId == isUserData?._id
                          ? " bg-[#0098EA] text-white"
                          : "bg-[#F7F7F7] text-[#000000]"
                      } p-3 rounded-xl text-wrap break-words text-xs lg:text-sm`}
                    >
                      {item.text}
                    </div>
                    <span className="text-[10px] text-[#5c5c5c]">
                      {new Date(item?.timestamp).toLocaleTimeString({
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
            </div>
            {/* Input Area */}
            <div className="w-full  px-5 flex items-center justify-center bg-white">
              <div className="border rounded-[20px] w-full flex items-center gap-2 px-4 py-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-sm outline-none border-none"
                  placeholder="Type here..."
                />
                <button
                  onClick={handleMessage}
                  type="button"
                  className="w-[40px] h-[40px] rounded-full bg-blue-500 p-2.5"
                >
                  <IoSend className="text-white w-full h-full" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[100%] space-y-4">
            <img
              src="/nochats-image.png"
              alt="nochats-image"
              className="w-[389.25px] h-[205px]"
            />
            <h3 className="font-bold text-lg blue-text">
              Its nice to chat with someone
            </h3>
            <p className="text-sm text-[#5c5c5c]">
              Pick a person from left menu and start your conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatUIComponent;
