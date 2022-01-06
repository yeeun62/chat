import { getDatabase, ref, onValue, push, update } from "firebase/database";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Invited() {
  const navigate = useNavigate();
  let { code } = useParams();

  useEffect(() => {
    if (localStorage.getItem(code)) {
      navigate(`/chat/${code}`);
    }
  }, []);

  const [isFull, setIsFull] = useState("fillMe");

  const [createChat, setCreateChat] = useState({
    userName: "아바타",
    userPhoneNumber: "01011000000",
    userId: "avata",
    userColor: getRandomColor(),
  });

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const createChatHandler = (e) => {
    setCreateChat({ ...createChat, [e.target.name]: e.target.value });
  };

  const invite = async () => {
    if (
      Object.values(createChat).filter((el) => createChat[el].length === 0)
        .length === 0
    ) {
      const db = getDatabase();
      const dbRef = ref(db, "chat");

      onValue(
        dbRef,
        async (snapshot) => {
          let data = snapshot.val();
          for (let el in data) {
            if (data[el].site.code === code) {
              const member = ref(db, `chat/${el}/member`);
              const memberRef = push(member);
              const memberId = memberRef._path;
              localStorage.setItem(
                data[el].site.code,
                JSON.stringify({
                  userName: createChat.userName,
                  userId: createChat.userId,
                  userColor: createChat.userColor,
                  userNum: memberId.pieces_[3],
                  roomNum: el,
                })
              );
              update(memberRef, createChat);
              navigate(`/chat/${code}`);
              break;
            }
          }
        },
        {
          onlyOnce: true,
        }
      );
    } else alert("모든 칸을 다 입력해 주세요! 👐");
  };

  return (
    <div className="background">
      <div className="inviteWrap">
        <p className="title">handle 채팅방에 오신걸 환영합니다🥳</p>
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
              name="userPhoneNumber"
              className="inviteInput"
              onChange={(e) => {
                createChatHandler(e);
              }}
            ></input>
          </div>
          <button type="button" className="inviteButton" onClick={invite}>
            채팅방 입장
          </button>
        </form>
      </div>
    </div>
  );
}

export default Invited;
