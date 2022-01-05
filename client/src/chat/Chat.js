import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";
import Loading from "./Loading";
import axios from "axios";

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
      Object.values(data).map((el) => {
        if (el.site.code === code && boolean) {
          setChat(el);
          boolean = false;
          if (el.send) {
            setResult(Object.values(el.send));
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(code)));
  }, []);

  const searchResult = (sea) => {
    if (sea.length > 0) {
      let res = Object.values(chat.send).filter((el) => {
        if (el.message.includes(sea) || el.sender.includes(sea)) {
          el["search"] = sea;
          return el;
        }
      });
      setResult(res);
    } else if (chat.send) {
      setResult(Object.values(chat.send));
    }
  };

  const translatedResult = async (resultArr, lang) => {
    let trans = resultArr.map((el) => {
      return {
        text: el.message,
        source: "kr",
        lang: lang,
      };
    });
    let arr = result;
    for (let i = 0; i < trans.length; i++) {
      await axios
        .post(
          `${process.env.REACT_APP_HANDLE_API}/v1/translation/kakao`,
          trans[i]
        )
        .then((res) => {
          console.log(res.data);
          arr[i].message = res.data.data;
          setResult(arr);
        });
    }

    console.log(result);
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
          <TaskInfo
            translatedResult={translatedResult}
            result={result}
          ></TaskInfo>
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
