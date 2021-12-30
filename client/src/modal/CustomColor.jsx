import { getDatabase, ref, update } from "firebase/database";
import { useState } from "react";
import styled from "styled-components";

const ColorModal = styled.div`
  .customUserName {
    font-size: 1.3rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin: 1rem;
  }
  .colorBallContainer {
    margin: auto;
    width: calc(250px + 3rem);
  }
`;

const ColorBall = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0.3rem;
  cursor: pointer;
`;

const CustomColor = ({ colorModalHandler, id, name, user, chat }) => {
  const colorList = [
    "#b2f299",
    "#fce29f",
    "#e69189",
    "#c19dfc",
    "#94e9f2",
    "#eb9dce",
    "#a4bbf5",
    "#a0deae",
    "#f5e6a4",
    "#f5c0b8",
    "#138c82",
    "#f0ec14",
    "#f19b33",
    "#584632",
    "#d94c25",
    "#ae2771",
    "#f0b5d3",
    "#ef82a1",
    "#f5f5f5",
    "#ceede5",
    "#5d718c",
    "#80adbf",
    "#f2edd0",
    "#f2d5c4",
    "#bf4545",
    "#db8181",
    "#977abf",
    "#514873",
    "#bfada8",
    "#8c6865",
  ];

  const [color, setColor] = useState("");
  const colorChange = () => {
    const db = getDatabase();
    if (user.userId === id) {
      let colorRef = ref(db, `chat/${user.roomNum}/member/${user.userNum}`);
      update(colorRef, { userColor: color });
    } else {
      let colorRef = ref(db, `chat/${user.roomNum}/color/${user.userId}`);
      update(colorRef, { [id]: color });
    }
    window.location.replace(`/chat/${chat.site.code}`);
    colorModalHandler();
  };

  return (
    <ColorModal>
      <p className="customUserName">{name}</p>
      <div className="colorBallContainer">
        {colorList.map((el) => {
          if (color) {
            return (
              <ColorBall
                className="pick"
                key={el}
                onClick={() => {
                  setColor(el);
                }}
                style={
                  color === el
                    ? {
                        background: el,
                        boxShadow: "inset -2px -2px 3px #464646",
                      }
                    : { background: el }
                }
              ></ColorBall>
            );
          } else {
            return (
              <ColorBall
                key={el}
                onClick={() => {
                  setColor(el);
                }}
                style={{ background: el }}
              ></ColorBall>
            );
          }
        })}
      </div>
      <div className="modalButton">
        <p onClick={colorChange} className="modalComfirm">
          변경
        </p>
        <p onClick={colorModalHandler} className="modalClose">
          닫기
        </p>
      </div>
    </ColorModal>
  );
};
export default CustomColor;
