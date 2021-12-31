import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";
import Loading from "./Loading";

const ChatWrap = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 500px;
  border: 3px solid #2d2d2d;
  background-color: #2d2d2d;
`;

function Chat() {
  let { code } = useParams();
  const [chat, setChat] = useState(null);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "chat");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      let boolean = true;
      console.log(Object.values(data));
      Object.values(data).map((el) => {
        if (el.site.code === code && true) {
          setChat(el);
          setResult(Object.values(el.send));
          boolean = false;
        }
      });
    });
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(code)));
  }, []);

  const searchResult = (sea) => {
    if (sea.length > 0) {
      setResult(
        Object.values(chat.send).filter((el) => {
          if (el.message.includes(sea) || el.sender.includes(sea)) {
            return el;
          }
        })
      );
    } else if (chat.send) {
      setResult(Object.values(chat.send));
    }
  };

  return (
    <ChatWrap>
      {chat ? (
        <>
          <ChatHeader
            chat={chat}
            searchResult={searchResult}
            setResult={setResult}
          ></ChatHeader>
          <TaskInfo></TaskInfo>
          <Conversation chat={chat} user={user} result={result}></Conversation>
          <Input code={code}></Input>
        </>
      ) : (
        <Loading></Loading>
      )}
    </ChatWrap>
  );
}

export default Chat;
