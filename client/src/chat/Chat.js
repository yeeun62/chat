import { getDatabase, ref, onValue, update } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";
import Loading from "./Loading";
axios.defaults.withCredentials = true;

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
  const [sendData, setSendData] = useState([]);
  const [translateSend, setTranslateSend] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "chat");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      let boolean = true;
      Object.values(data).map((el) => {
        if (el.site.code === code && boolean) {
          if (el.send) {
            setSendData(Object.values(el.send));
          }
          setChat(el);
          boolean = false;
        }
      });
    });
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(code)));
  }, []);

  useEffect(async () => {
    if (chat) {
      if (chat.language && Object.keys(chat.language).includes(user.userId)) {
        let userNum = Object.keys(chat.language).indexOf(user.userId);
        translation(
          Object.values(chat.language)[userNum].lang,
          true,
          Object.values(chat.language)[userNum].origin
        );
      }
    } else {
      return;
    }
  }, [chat]);

  const translation = async (lang, boolean, ol) => {
    const db = getDatabase();
    let translationRef = ref(
      db,
      `chat/${user.roomNum}/language/${user.userId}`
    );

    let transArr = sendData.map((el) => {
      return el.message;
    });

    let dbOrigin;
    let dbLang;
    // !번역옵션을 클릭해서 번역하는 거라면
    if (!boolean) {
      // !디비를 돌아 랭기지에 본인아이디가 존재한다면 -> 내가 번역을 선택한 적이 있다면
      if (chat.language && Object.keys(chat.language).includes(user.userId)) {
        if (Object.values(chat.language)[0].lang === lang) {
          window.alert("이미 번역되어 있습니다👀");
          return;
        }
        // !한국어로 바꾸고 싶다면 기존메세지로 교체 (한국어 번역이 이상하게되기 때문)
        if (lang === "kr") {
          setTranslateSend(sendData);
          // !기존언어를 Origin, lang을 kr로 업데이트
          update(translationRef, {
            lang: "kr",
            origin: Object.values(chat.language)[0].lang,
          });
          return;
        } else {
          // !한국어가 아니라면 본인이 전에 선택한 원본언어를 보내준다.
          // !디비의 lang언어를 디비의 origin에 온클릭 언어를 lang에 업데이트
          dbOrigin = Object.values(chat.language)[0].lang;
          dbLang = lang;
        }
      } else {
        // !디비를 돌아 랭기지에 본인아이디가 존재하지 않는다면 -> 번역을 선택한적이 없다면
        // !origin은 kr, 온클릭 언어를 lang에 업데이트
        dbOrigin = "kr";
        dbLang = lang;
      }
    } else if (boolean) {
      // !렌더링시 번역이라면
      dbOrigin = ol;
      dbLang = lang;
    }

    let translateArr = JSON.parse(JSON.stringify(sendData));
    await axios
      .post(`${process.env.REACT_APP_HANDLE_API}/v1/translation/kakao`, {
        text: transArr,
        source: "kr",
        lang: dbLang,
      })
      .then((res) => {
        translateArr.map((txt, i) => {
          txt.message = res.data.data[i];
        });
        setTranslateSend(translateArr);
        update(translationRef, { lang: dbLang, origin: dbOrigin });
      })
      .catch((err) => console.log("130번 에러", err));
  };

  const searchResult = (sea) => {
    if (sea.length > 0) {
      setSendData(
        sendData.filter((el) => {
          if (el.message.includes(sea) || el.sender.includes(sea)) {
            el.search = sea;
            return el;
          }
        })
      );
    } else if (chat.send) {
      setSendData(Object.values(chat.send));
    }
  };

  return (
    <ChatWrap>
      {chat ? (
        <>
          <ChatHeader
            chat={chat}
            searchResult={searchResult}
            setSendData={setSendData}
          ></ChatHeader>
          <TaskInfo translation={translation}></TaskInfo>
          <Conversation
            chat={chat}
            user={user}
            sendData={sendData}
            translateSend={translateSend}
          ></Conversation>
          <Input code={code}></Input>
        </>
      ) : (
        <Loading></Loading>
      )}
    </ChatWrap>
  );
}
export default Chat;
