import { getDatabase, set, ref, push } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function Create() {
  const navigate = useNavigate();
  const [createChat, setCreateChat] = useState({
    name: "handle",
    title: "채팅방",
    userName: "방예은",
    userPhoneNumber: "01099720602",
    userId: "byebye62",
    userColor: "#00adc7",
    addon1: "-",
    addon2: "-",
    // name: "",
    // title: "",
    // userName: "",
    // userPhoneNumber: "",
    // userId: "",
    // userColor: "#00adc7",
    // addon1: "-",
    // addon2: "-",
  });

  const createChatHandler = (e) => {
    if (e.target.name === "userPhoneNumber") {
      setCreateChat({ ...createChat, [e.target.name]: e.target.value });
    }
    setCreateChat({ ...createChat, [e.target.name]: e.target.value });
  };

  const createChatRoom = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "chat");

    const newdbRef = push(dbRef);
    const chatId = newdbRef._path;

    const member = ref(db, `${chatId}/member`);
    const memberRef = push(member);
    const memberId = memberRef._path;

    const uuid = await axios.get(process.env.REACT_APP_UUID);
    const time = Math.floor(Date.now() / 1000);

    const {
      userName,
      userPhoneNumber,
      userId,
      title,
      name,
      userColor,
      addon1,
      addon2,
    } = createChat;

    let chat = {
      room: {
        title,
        siteCode: uuid.data.code,
        regDate: time,
        addon: { addon1, addon2 },
      },
      site: { name, color: "#E0DE1B", code: uuid.data.code },
    };

    set(newdbRef, chat);
    set(memberRef, {
      userName,
      userPhoneNumber,
      userId,
      userColor,
    });

    localStorage.setItem(
      uuid.data.code,
      JSON.stringify({
        userName: userName,
        userId: userId,
        userNum: memberId.pieces_[3],
        roomNum: chatId.pieces_[1],
        userColor,
      })
    );
    navigate(`/chat/${uuid.data.code}`);
  };

  let n = " ";

  return (
    <div className="inviteWrap">
      <p className="title">
        <span className="handle-logo-font">handle</span>
        {n}채팅방에 오신걸환영합니다🥳
      </p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="inviteSection">
          <span className="inviteTitle">사용자 이름</span>
          <input
            name="userName"
            className="inviteInput"
            onChange={(e) => {
              createChatHandler(e);
            }}
          ></input>
        </div>
        <div className="inviteSection">
          <span className="inviteTitle">사용자 아이디</span>
          <input
            name="userId"
            className="inviteInput"
            onChange={(e) => {
              createChatHandler(e);
            }}
          ></input>
        </div>
        <div className="inviteSection">
          <span className="inviteTitle">사용자 전화번호</span>
          <input
            maxLength={11}
            placeholder="01012345678"
            name="userPhoneNumber"
            className="inviteInput"
            onChange={(e) => {
              createChatHandler(e);
            }}
          ></input>
        </div>
        <div className="inviteSection">
          <span className="inviteTitle">사이트 명</span>
          <input
            name="name"
            className="inviteInput"
            onChange={(e) => {
              createChatHandler(e);
            }}
          />
        </div>
        <div className="inviteSection">
          <span className="inviteTitle">채팅방 이름</span>
          <input
            name="title"
            className="inviteInput"
            onChange={(e) => {
              createChatHandler(e);
            }}
          ></input>
        </div>
        <div className="inviteSection">
          <span className="inviteTitle">부가정보 1</span>
          <input
            name="addon1"
            className="inviteInput"
            onChange={(e) => {
              createChatHandler(e);
            }}
          ></input>
        </div>
        <div className="inviteSection">
          <span className="inviteTitle">부가정보 2</span>
          <input
            name="addon2"
            className="inviteInput"
            onChange={(e) => {
              createChatHandler(e);
            }}
          ></input>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            marginTop: "0.2rem",
            fontWeight: "bold",
          }}
          className="addon"
        >
          *부가정보는 선택사항입니다.
        </p>
        <button
          type="button"
          className="handle-button"
          onClick={createChatRoom}
          style={{ fontWeight: "bold" }}
        >
          채팅방 입장
        </button>
      </form>
    </div>
  );
}

export default Create;
