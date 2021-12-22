import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import addMemberButton from "../img/add-friend.png";

const Chatting = styled.div`
	/* position: fixed; */
	height: calc(100% - 190px);
	width: 100%;
	background: #fff;

	&::-webkit-scrollbar-thumb {
		width: 5px;
		background-color: #ccc;
	}

	&::-webkit-scrollbar-track {
		width: 7px;
		background-color: #ccc;
	}
`;

const Member = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: #f9faf5;
	height: 60px;
	box-shadow: inset -5px -5px 5px #ddd;
	padding-right: 10px;

	> ul {
		display: flex;
		flex-direction: row;
		width: 100%;
		overflow-x: scroll;
		align-items: center;

		> li div {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background-color: #9de955;
			margin: 0 10px;
			color: #fff;
			text-align: center;
			line-height: 30px;
		}

		> p {
			margin-left: 10px;
		}
	}

	> img {
		margin: auto;
		@media screen and (max-width: 500px) {
			width: 30px;
			height: 30px;
		};

		@media screen and (min-width: 500px) {
			width: 50px;
			height: 50px;
		}
	}
`;

const Content = styled.div`
	width: 100%;
	height: calc(100% - 190px);
	overflow: scroll;
	position: fixed;
	background-color: #f9faf5;

	> ul {
		text-align: left;
		overflow-y: scroll;
		padding: 10px;
		> li {
			position: relative;
			margin: 10px 0;
			overflow: visible;
			

			> h5 {
				@media screen and (min-width: 500px) {
					font-size: 22px;
				}
				@media screen and (max-width: 500px) {
					font-size: 4vw;
				}
			}
			> p {
				font-size: 10px;
				color: #333;
				position: absolute;
			}
		}
		.receivedMessage {
			height: 140px;
			> div {
				position: absolute;
				padding: 10px;
				background-color: #00adc7;
				border-radius: 10px 30px;
				left: 7px;
				width: 200px;
				color: #fff;
				box-shadow:5px 5px 2px 2px #ccc;
			}
			> p {
				@media screen and (max-width: 500px){
					bottom: -5vw;
				}
				@media screen and (min-width: 500px){
					bottom: -25px;
				}
				
			}
		}

		.myMessage {
			overflow: visible;
			height: 120px;
			margin-bottom: 10px;
			> div {
				text-align: left;
				padding: 10px;
				background-color: #e0de1b;
				border-radius: 30px 10px;
				position: absolute;
				right: 7px;
				width: 200px;
				box-shadow:5px 5px 2px 2px #ccc;
			}
			> p {
				right: 10px;
				@media screen and (max-width: 500px){
					bottom: -10px;
					margin-bottom: 5px;
				}
				@media screen and (min-width: 500px){
					bottom: -15px;

				}
			}
		}
	}
`;

function Conversation({ chatData, code }) {
	const scroll = useRef(null);

	const scrollDown = () => {
		const { scrollHeight, clientHeight } = scroll.current;
		scroll.current.scrollTop = scrollHeight - clientHeight;
	};

	useEffect(() => {
		console.log(chatData);
		scrollDown();
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
		<Chatting>
			<Member>
				<ul>
					{chatData.member.length ? (
						chatData.member.map((el) => {
							return Object.values(el).map((user, i) => {
								return (
									<li>
										<div key={Object.keys(el)[i]} className="userNameTaskInfo">
											{user.userName.slice(0,1)}
										</div>
									</li>
								);
							});
						})
					) : (
						<p>로딩중~</p>
					)}
				</ul>
				<CopyToClipboard text={`http://localhost:3000/chat/invited/${code}`}>
					<img src={addMemberButton} alt="초대링크 복사 버튼"></img>
				</CopyToClipboard>
			</Member>
			<Content ref={scroll}>
				<ul>
					{/* 여기서 div 클래스이름은 사용자가 누구냐에 따라서 컬러 받아오고 왼쪽인지 오른쪽인지 정할 수 있도록 프롭스로 . */}
					<li className="receivedMessage">
						<h5>user name</h5>
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>{logDate(chatData.createDate)}</p>
					</li>
					<li className="myMessage">
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>시간</p>
					</li>
					<li className="myMessage">
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>시간</p>
					</li>
					<li className="myMessage">
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>시간</p>
					</li>
					<li className="myMessage">
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>시간</p>
					</li>
					<li className="myMessage">
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>시간</p>
					</li>
					<li className="myMessage">
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>시간</p>
					</li>
					<li className="myMessage">
						<div>
							채팅 내용 내용 내용 채팅 내용 내용 내용채팅 내용 내용 내용채팅
							내용 내용 내용
						</div>
						<p>시간</p>
					</li>

					{/* <div>{logDate(chatData.createDate)}</div> */}
				</ul>
			</Content>
		</Chatting>
	);
}

export default Conversation;
