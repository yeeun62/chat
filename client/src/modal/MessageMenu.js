import styled from "styled-components";
import { useState } from "react";

const MenuWrap = styled.div `
    
`

function MessageMenu ({menuModalHandler, member, remindRequest, remindSetting}) {

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
                                return <li key={el.userId} className="remindMember" onClick={() => {
                                        remindSetting({receiver: el.userName})
                                        remindRequest();
                                    }}>
                                    {el.userName}
                                </li>
                            })
                        }
                    </ul>
                    <button onClick={() => {
                        menuModalHandler(false);
                        remindRequest();
                    }}>요청 전송</button>
                </li>
                {/* 메뉴 추가 예정 */}
                <li>
                    menu2
                </li>
                <li>
                    menu3
                </li>
            </ul>
            <p onClick={() => menuModalHandler(false)}>X</p>
        </MenuWrap>
    </>

}

export default MessageMenu;