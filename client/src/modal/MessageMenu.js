import styled from "styled-components";
import { useState } from "react";

const MenuWrap = styled.div `
    
`

function MessageMenu ({menuModalHandler, member}) {
    const [receiver, setReceiver] = useState(window.location.pathname.slice(6));
    console.log(member)
    return <>
        <MenuWrap>
            <ul>
                <li>
                    <p>알림톡 리마인드 보내기</p>
                    <input type="date" id="dateInput"></input>
                    <input type="time" id="timeInput"></input>
                    <ul>
                        {
                            Object.values(member).map(el => {
                                return <li key={el.userId} onClick={() => setReceiver(el.userName)}>
                                    {el.userName}
                                </li>
                            })
                        }
                    </ul>
                    <button onClick={() => menuModalHandler(false, receiver)}>요청 전송</button>
                </li>
                {/* 메뉴 추가 예정 */}
            </ul>
            <p onClick={() => menuModalHandler(false, "", "", "")}>X</p>
        </MenuWrap>
    </>

}

export default MessageMenu;