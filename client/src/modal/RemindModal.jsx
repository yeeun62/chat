import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

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

function RemindModal({ remindModalHandler, member, user, msg }) {
	const [date, setDate] = useState({});
	const [receiver, setReceiver] = useState("");
	const [receiverPhone, setReceiverPhone] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	useEffect(async () => {
		let shortUrl = await axios.post(
			`${process.env.REACT_APP_HANDLE_API}/v1/short/naver`,
			{
				url: `https://chat.handle.market/chat/${window.location.pathname.slice(
					6
				)}`,
			}
		);
		setShortUrl(shortUrl.data.url);
	}, []);
	console.log(shortUrl);

	//! 나중에 https://chat.handle.market/chat/${window.location.pathname.slice(6)} 변경 & 단축 url
	let messageContent = `
    안녕하세요 언제나 친절한 handle입니다??
    ${receiver} 고객님의 확인이 필요한 메시지가 있습니다.?
    
    ? 내용 : ${msg}
    ? 요청일시 : ${date.date} ${date.time}
    ? 보낸사람 : ${user.userName}
    
    ? 아래의 URL을 통해서 확인해 주세요!
    ${shortUrl}
    
    오늘도 행복한 하루되세요~?`;

	const dateFuc = (dateNum) => {
		let date = "";
		for (let i = 0; i < dateNum.length; i++) {
			if (dateNum[i] !== "-" && dateNum[i] !== ":") {
				date += dateNum[i];
			}
		}
		return `${date}00`;
	};

	const remindData = {
		receiver: receiverPhone,
		template: "TA_8354", //! 나중에 TH_0067 로 변경
		message: messageContent,
		date: dateFuc(`${date.date}${date.time}`),
	};

	const remindRequest = async () => {
		console.log("!", remindData);
		let a = await axios.post("http://localhost:80/v1/talk/aligo", remindData, {
			withCredentials: true,
		});
		console.log("요청!", a);
	};

	return (
        <MenuWrap>
            <p className="remindTitle">메세지 리마인드 보내기</p>
            <div>
                <p className="whenRemind">리마인드 날짜 지정</p>
                <input type="date" id="dateInput" onChange={e => setDate({...date, data: e.target.value})}></input>
                <input type="time" id="timeInput" onChange={e => setDate({...date, time: e.target.value})}></input>
            </div>
            <p className="memberList">리마인드 받는 사람 지정</p>
            <ul>
                {
                    Object.values(member).map(el => {
                        return <li key={el.userId} className="remindMember" onClick={() => {setReceiver(el.userName);
								setReceiverPhone(el.userPhoneNumber)}}>
                            {el.userName}
                        </li>
                    })
                }
            </ul>
            <div className="modalButton">
                <p 
                    onClick={() => {
                      remindModalHandler();
						          remindRequest();
                    }}
                    className="confirm"
                >
                    생성
                </p>
                <p className="modalClose" onClick={remindModalHandler}>닫기</p>
            </div>
            
        </MenuWrap>
	);
}
export default RemindModal;