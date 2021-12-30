import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const RemindWrap = styled.div`
	width: 100%;
	text-align: center;
	overflow-y: auto;
	overflow-x: hidden;

	.remindTitle {
		margin: 30px 0;
		font-size: 1.3rem;
		font-weight: bold;
		color: #dadada;
	}

	.remindList {
		font-weight: bold;
		color: #00adc7;
		margin: 3rem 0 1rem;
	}

	input {
		cursor: pointer;
	}

	ul {
		width: 45%;
		margin: auto;
		overflow-y: auto;
		cursor: pointer;

		.remindMember {
			width: 100%;
			border-bottom: 1px solid #2d2d2d;
			background-color: #dadada;
			color: #2d2d2d;
			font-size: 0.8rem;
			font-weight: bold;
			height: 1.6rem;
			line-height: 1.5rem;
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
		<RemindWrap>
			<p className="remindTitle">메세지 리마인드 보내기</p>
			<p className="remindList">리마인드를 받으실 날짜를 지정해주세요</p>
			<input
				type="date"
				className=""
				onChange={(e) => setDate({ ...date, data: e.target.value })}
			/>
			<input
				type="time"
				className=""
				onChange={(e) => setDate({ ...date, time: e.target.value })}
			/>
			<p className="remindList">리마인드 받는 분을 선택해주세요</p>
			<ul>
				{Object.values(member).map((el) => {
					return (
						<li
							key={el.userId}
							className="remindMember"
							onClick={() => {
								setReceiver(el.userName);
								setReceiverPhone(el.userPhoneNumber);
							}}
							style={
								receiver === el.userName ? { background: "#00adc7" } : null
							}
						>
							{el.userName}
						</li>
					);
				})}
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
				<p className="modalClose" onClick={remindModalHandler}>
					닫기
				</p>
			</div>
		</RemindWrap>
	);
}
export default RemindModal;
