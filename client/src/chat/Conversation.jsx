import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import "../App.css";

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
	> ul {
		display: flex;
		align-items: center;
		> li {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background-color: #00adc7;
			color: #2d2d2d;
			text-align: center;
			font-weight: bold;
			line-height: 30px;
			margin-right: 0.4rem;
		}
	}
	.inviteLink {
		font-size: 0.8rem;
		font-weight: bold;
		line-height: 50px;
		cursor: pointer;
		> p {
			color: #3e9ece;
		}
	}
`;
const Content = styled.div`
	width: 100%;
	height: 91%;
	background-color: #686868;
	color: #fff;
	> ul {
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
		}
		.time {
			font-size: 0.6rem;
			color: #2d2d2d;
			margin-bottom: 1rem;
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

function Conversation({ chat }) {
	const scroll = useRef(null);
	const [user, setUser] = useState("");
	const [cookies, setCookie] = useCookies(["auth"]);

	const scrollDown = () => {
		const { scrollHeight, clientHeight } = scroll.current;
		scroll.current.scrollTop = scrollHeight - clientHeight;
	};

	useEffect(() => {
		if (chat) {
			scrollDown();
		}
	}, [chat]);

	useEffect(() => {
		setUser(cookies.auth.split("|")[0]);
	}, []);

	let logDate = (time) => {
		let returnDate;
		let date = new Date(time * 1000);
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);

		if (hour.slice(0, 1) !== "0") {
			returnDate = `${hour}시${minute}분 (${calculateTime(time)})`;
		} else {
			returnDate = `${month}월 ${day}일 ${hour}시${minute}분`;
		}

		return returnDate;
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
			{chat ? (
				<>
					<Member>
						<ul>
							{Object.values(chat.member).map((el, i) => {
								return (
									<li
										style={{ background: el.userColor }}
										key={Object.keys(el)[i]}
									>
										{el.userName.slice(0, 1)}
									</li>
								);
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
							{chat.send
								? Object.values(chat.send).map((el) => {
										return (
											<li
												key={el.time}
												className={
													el.sender === user ? "chatMsg me" : "chatMsg you"
												}
											>
												<p className="sender">{el.sender}</p>
												<div className="msg">{el.message}</div>
												<p className="time">{logDate(el.time)}</p>
											</li>
										);
								  })
								: null}
						</ul>
					</Content>
				</>
			) : (
				<p>로딩중~</p>
			)}
		</ChatWrap>
	);
}
export default Conversation;
