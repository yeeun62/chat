import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import "../App.css";

const ChatWrap = styled.div`
	height: 80%;
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

		.sender {
			font-weight: bold;
			color: #2d2d2d;
			text-align: right;
		}

		.msg {
			width: 100%;
			height: 5rem;
			padding: 0.5rem;
			margin: 0.2rem 0;
			background-color: #dadada;
			font-weight: bold;
		}

		.time {
			font-size: 0.6rem;
			color: #2d2d2d;
			font-weight: bold;
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
		let date = new Date(time * 1000);
		let year = date.getFullYear().toString().slice(-4);
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);
		let returnDate = `${month}월 ${day}일 ${hour}시${minute}분`;
		return returnDate;
	};

	return (
		<ChatWrap>
			{chat ? (
				<>
					<Member>
						<ul>
							{Object.values(chat.member).map((el, i) => {
								console.log(el);
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
