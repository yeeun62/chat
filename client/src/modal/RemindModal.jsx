import styled from "styled-components";
import { useState } from "react";

const MenuWrap = styled.div `
    text-align: center;
    overflow-y: auto;
    overflow-x: hidden;

    .remindTitle {
            font-size: 1.3rem;
            font-weight: bold;
            color: #fff;
            text-align: center;
            margin: 1rem;
            padding-bottom: 30px;
        }

    > div {
        width: 100%;
        margin-bottom: 40px;

        .whenRemind {
            font-size: 1rem;
            color: #fff;
            font-weight: bold;
        }

        > input {
            display: block;
            margin: 20px auto;
            cursor: pointer;
        }
    }
    
    .memberList {
        font-size: 1rem;
        color: #fff;
        font-weight: bold;
        margin-bottom: 20px;
    }
    
    > ul {
        width: 40%;
        padding: 10px 0;
        text-align: center;
        margin: auto;
        overflow-y: auto;
        cursor: pointer;
        border-radius: 1rem;

        .remindMember {
            width: 90%;
            border-bottom: 1px solid #4b4b4b;
            color: #fff;
            margin: auto;
            height: 1.6rem;
            line-height: 1.5rem;
            background: linear-gradient(45deg, #2f2d2d, #383636);
            box-shadow:  23px -23px 100px #2e2c2c,
                        -23px 23px 100px #3a3838;
        }
    }

`;

function MessageMenu ({menuModalHandler, member, remindRequest, remindSetting}) {
    const [date, setDate] = useState({});

    return <>
        <MenuWrap>
            <p className="remindTitle">메세지 리마인드 보내기</p>
            <div>
                <p className="whenRemind">리마인드 날짜 지정</p>
                <input type="date" id="dateInput" onChange={e => setDate({...date, data: e.target.values})}></input>
                <input type="time" id="timeInput" onChange={e => setDate({...date, time: e.target.values})}></input>
            </div>
            <p className="memberList">리마인드 받는 사람 지정</p>
            <ul>
                {
                    Object.values(member).map(el => {
                        return <li key={el.userId} className="remindMember" onClick={() => remindSetting({receiver: el.userName})}>
                            {el.userName}
                        </li>
                    })
                }
            </ul>
            <div className="modalButton">
                <p 
                    onClick={() => {
                        menuModalHandler(false);
                        remindRequest();
                    }}
                    className="confirm"
                >
                    생성
                </p>
                <p className="modalClose" onClick={() => menuModalHandler(false)}>닫기</p>
            </div>
            
        </MenuWrap>
    </>

}

export default MessageMenu;