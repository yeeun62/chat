import { useEffect, useRef, useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomColor from "../modal/CustomColor";
import RemindModal from "../modal/RemindModal";
import styled from "styled-components";
import Modal from "react-modal";
import "../App.css";
import "../modal/modal.css";

const ChatWrap = styled.div`
  width: 100%;
  height: 79%;
  border: 3px solid #2d2d2d;
`;

const Member = styled.div`
  padding: 0rem 2rem;
  height: 9%;
  display: flex;
  justify-content: space-between;
  background-color: #2d2d2d;
  ul {
    display: flex;
    align-items: center;
    li {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #00adc7;
      color: #2d2d2d;
      text-align: center;
      font-weight: bold;
      line-height: 30px;
      margin-right: 0.4rem;
      cursor: pointer;
    }
  }
  .inviteLink {
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 50px;
    cursor: pointer;

    p {
      color: #3e9ece;
    }
  }
`;

const Content = styled.div`
  &::-webkit-scrollbar {
    background-color: #000;
    width: 2px;
  }

  width: 100%;
  height: 91%;
  background-color: #686868;
  color: #fff;
  ul {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .chatMsg {
    position: relative;
    width: 40%;
    margin-top: 1rem;
    height: auto;
    overflow: hidden;

    .sender {
      font-weight: bold;
      color: #2d2d2d;
      text-align: right;
    }
    .msg {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 0.5rem;
      margin: 0.2rem 0;
      background-color: #dadada;
      font-weight: bold;
      .msg-search {
        background-color: #e0de1b;
      }
    }
    .time {
      font-size: 0.6em;
      color: #2d2d2d;
      margin-bottom: 1rem;
      font-weight: bold;
    }
  }

  .contextMenu {
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    background-color: #2d2d2d;
    border-radius: 0.5rem;

    .remindBtn {
      padding: 0.4rem;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
      font-size: 0.8rem;

      &:hover {
        color: #e0de1b;
      }
    }
  }

  .me {
    right: -58%;
    .msg {
      border-radius: 1rem 1rem 0rem 1rem;
    }
    .time {
      text-align: right;
    }
    .sender {
      text-align: right;
    }
  }
  .you {
    left: 2%;
    .msg {
      border-radius: 1rem 1rem 1rem 0rem;
    }
    .time {
      text-align: left;
    }
    .sender {
      text-align: left;
    }
  }
`;

function Conversation({ chat, user, result }) {
  const scroll = useRef(null);
  const [colorOpen, setColorOpen] = useState(false);
  const [remindOpen, setRemindOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [customUser, setCustomUser] = useState(null);
  const [msg, setMsg] = useState("");

  const scrollDown = () => {
    const { scrollHeight, clientHeight } = scroll.current;
    scroll.current.scrollTop = scrollHeight - clientHeight;
  };

  useEffect(() => {
    if (result) {
      scrollDown();
    }
  }, [result]);

  useEffect(() => {
    if (chat.color) {
      if (Object.keys(chat.color).includes(user.userId)) {
        setCustomUser(chat.color[user.userId]);
      }
    }
  }, []);

  let logDate = (time) => {
    let returnDate;
    let date = new Date(time * 1000);
    let today = ("0" + new Date(Math.floor(Date.now())).getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    if (day >= today) {
      returnDate = `${hour}시${minute}분 (${calculateTime(time)})`;
    } else {
      returnDate = `${month}월 ${day}일 ${hour}시${minute}분`;
    }
    return returnDate;
  };

  const colorModalHandler = () => {
    setColorOpen(!colorOpen);
  };

  const remindModalHandler = () => {
    setRemindOpen(!remindOpen);
  };

  function calculateTime(time) {
    const today = new Date();
    const timeValue = new Date(time * 1000);
    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  return (
    <ChatWrap>
      <Modal
        isOpen={colorOpen}
        onRequestClose={colorModalHandler}
        className="content"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <CustomColor
          colorModalHandler={colorModalHandler}
          id={id}
          name={name}
          chat={chat}
          user={user}
        />
      </Modal>
      <Modal
        isOpen={remindOpen}
        onRequestClose={remindModalHandler}
        className="content"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <RemindModal
          remindModalHandler={remindModalHandler}
          member={chat.member}
          user={user}
          msg={msg}
        />
      </Modal>
      <Member>
        <ul>
          {Object.values(chat.member).map((el, i) => {
            if (customUser) {
              for (let user in customUser) {
                if (el.userId === user) {
                  return (
                    <li
                      style={{ background: customUser[user] }}
                      key={Object.keys(el)[i]}
                      onClick={() => {
                        colorModalHandler();
                        setId(el.userId);
                        setName(el.userName);
                      }}
                    >
                      {el.userName.slice(0, 1)}
                    </li>
                  );
                } else {
                  return (
                    <li
                      style={{ background: el.userColor }}
                      key={Object.keys(el)[i]}
                      onClick={() => {
                        colorModalHandler();
                        setId(el.userId);
                        setName(el.userName);
                      }}
                    >
                      {el.userName.slice(0, 1)}
                    </li>
                  );
                }
              }
            } else {
              return (
                <li
                  style={{ background: el.userColor }}
                  key={Object.keys(el)[i]}
                  onClick={() => {
                    colorModalHandler();
                    setId(el.userId);
                    setName(el.userName);
                  }}
                >
                  {el.userName.slice(0, 1)}
                </li>
              );
            }
          })}
        </ul>
        <div className="inviteLink">
          <CopyToClipboard
            text={`http://localhost:3000/chat/invited/${chat.site.code}`}
            // text={`https://chat.handle.market/chat/invited/${chat.site.code}`}
          >
            <p>초대링크복사📎</p>
          </CopyToClipboard>
        </div>
      </Member>
      <Content>
        <ul ref={scroll}>
          {chat.send && user
            ? result.map((el) => {
                //본인이라면
                if (el.userId === user.userId) {
                  return (
                    <li key={el.time} className="chatMsg me">
                      <p className="sender">{el.sender}</p>
                      <ContextMenuTrigger id="trigger">
                        <div
                          className="msg"
                          onClick={() => {
                            remindModalHandler();
                            setMsg(el.message);
                          }}
                          style={{
                            border: `2px solid ${origin.userColor}`,
                          }}
                        >
                          {el.search ? (
                            <>
                              <span>{el.message.split(el.search)[0]}</span>
                              <span className="msg-search">{el.search}</span>
                              <span>{el.message.split(el.search)[1]}</span>
                            </>
                          ) : (
                            el.message
                          )}
                        </div>
                      </ContextMenuTrigger>
                      <p className="time">{logDate(el.time)}</p>
                    </li>
                  );
                } else {
                  //본인이아니라면
                  // 커스텀 유저가 존재한다면
                  if (customUser) {
                    for (let custom in customUser) {
                      // 커스텀 유저목록에 있다면
                      if (el.userId === custom) {
                        return (
                          <li key={el.time} className="chatMsg you">
                            <p className="sender">{el.sender}</p>
                            <ContextMenuTrigger id="trigger">
                              <div
                                className="msg"
                                onClick={() => {
                                  setMsg(el.message);
                                }}
                                style={{
                                  border: `2px solid ${customUser[custom]}`,
                                }}
                              >
                                {el.search ? (
                                  <>
                                    <span>
                                      {el.message.split(el.search)[0]}
                                    </span>
                                    <span className="msg-search">
                                      {el.search}
                                    </span>
                                    <span>
                                      {el.message.split(el.search)[1]}
                                    </span>
                                  </>
                                ) : (
                                  el.message
                                )}
                              </div>
                            </ContextMenuTrigger>
                            <p className="time">{logDate(el.time)}</p>
                          </li>
                        );
                      } else {
                        // 커스텀 유저목록에 없다면 일치하는 유저찾아 본인의 색
                        return Object.values(chat.member).map((origin) => {
                          if (origin.userId === el.userId) {
                            return (
                              <li key={el.time} className="chatMsg you">
                                <p className="sender">{el.sender}</p>
                                <ContextMenuTrigger id="trigger">
                                  <div
                                    className="msg"
                                    onClick={() => {
                                      setMsg(el.message);
                                    }}
                                    style={{
                                      border: `2px solid ${origin.userColor}`,
                                    }}
                                  >
                                    {el.search ? (
                                      <>
                                        <span>
                                          {el.message.split(el.search)[0]}
                                        </span>
                                        <span className="msg-search">
                                          {el.search}
                                        </span>
                                        <span>
                                          {el.message.split(el.search)[1]}
                                        </span>
                                      </>
                                    ) : (
                                      el.message
                                    )}
                                  </div>
                                </ContextMenuTrigger>
                                <p className="time">{logDate(el.time)}</p>
                              </li>
                            );
                          }
                        });
                      }
                    }
                  } else {
                    // 커스텀유저가 존재하지 않는다면 본인의 색
                    return Object.values(chat.member).map((origin) => {
                      if (origin.userId === el.userId) {
                        return (
                          <li key={el.time} className="chatMsg you">
                            <p className="sender">{el.sender}</p>
                            <ContextMenuTrigger id="trigger">
                              <div
                                className="msg"
                                onClick={() => {
                                  setMsg(el.message);
                                }}
                                style={{
                                  border: `2px solid ${origin.userColor}`,
                                }}
                              >
                                {el.search ? (
                                  <>
                                    <span>
                                      {el.message.split(el.search)[0]}
                                    </span>
                                    <span className="msg-search">
                                      {el.search}
                                    </span>
                                    <span>
                                      {el.message.split(el.search)[1]}
                                    </span>
                                  </>
                                ) : (
                                  el.message
                                )}
                              </div>
                            </ContextMenuTrigger>
                            <p className="time">{logDate(el.time)}</p>
                          </li>
                        );
                      }
                    });
                  }
                }
              })
            : null}
        </ul>
        <ContextMenu id="trigger">
          <MenuItem onClick={remindModalHandler} className="contextMenu">
            <p className="remindBtn">리마인더</p>
          </MenuItem>
        </ContextMenu>
      </Content>
    </ChatWrap>
  );
}
export default Conversation;
