import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import {useEffect, useRef} from 'react'
import * as React from 'react'
import addMemberButton from '../img/link.png';
import '../App.css';


const Chatting = styled.div`
	height: calc(100% - 160px);
	width: 100%;
	background: #fff;

	@media screen and (min-width: 700px){
		font-weight: 600;
		max-width: 700px;
	}

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
	background-color: #fff;
	height: 50px;
	padding-right: 15px;
	overflow-y: hidden;

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

	> button {
		font-size: 10px!important;
		font-weight: 800!important;
		margin: auto 0 !important;
		width: 130px !important;
		height: 30px !important;
		line-height: 30px !important;
		word-break: keep-all!important;
		&:hover{
			cursor: pointer!important;
		}
		background-color: #b8b513!important;
		padding: 10px auto!important;
		display: flex!important;
		flex-direction: row!important;
		text-align: center!important;
		overflow: hidden!important;
		background: linear-gradient(145deg, #c5c214, #a6a311);
		box-shadow:  5px 5px 5px #88860e, -5px -5px 5px #e8e418;
		

		.inviteButton {
			color: #fff !important;
			margin: 0!important;
			background-color: transparent!important;
		}

		> img {
			width: 20px!important;
			margin: 5px 0 5px 5px!important;
		}
	}
`;

const Content = styled.div`
	width: 100%;
	height: calc(100% - 245px);
	overflow-y: scroll;
	overflow-x: hidden;
	position: fixed;
	background-color: #f9faf5;
	@media screen and (min-width: 700px) {
		width: 700px;
		overflow-x: hidden;
	}
	
	> ul {
		text-align: left;
		overflow-y: scroll;
		overflow-x: hidden;
		padding: 10px;
		> li {
			position: relative;
			margin: 20px 0;
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

			> div {
				@media screen and (max-width: 500px) {
					width: 200px;
				}
				@media screen and (min-width: 500px) {
					width: 500px;
				}
				
			}
		}
		.receivedMessage {
			@media screen and (max-width: 500px){
				height: 120px;
				}
			@media screen and (min-width: 500px){
				height: 100px;
			}
			> div {
				position: absolute;
				padding: 10px;
				background-color: #eff5c6;
				border-radius: 10px 30px;
				left: 7px;
				box-shadow:5px 5px 2px 2px #ccc;
				margin: 5px 0;
				@media screen and (max-width: 500px) {
					font-size: 14px;
				}
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
			margin-bottom: 10px;
			@media screen and (max-width: 500px){
				height: 110px;
				}
			@media screen and (min-width: 500px){
				height: 75px;
			}
			> div {
				margin: 5px 0;
				text-align: left;
				padding: 10px;
				background-color: #a9c5c9;
				border-radius: 30px 10px;
				position: absolute;
				right: 7px;
				box-shadow:5px 5px 2px 2px #ccc;
				@media screen and (max-width: 500px) {
					font-size: 14px;
				}
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

function Conversation({ chat }) {
	const scroll = useRef(null);

	const scrollDown = () => {
		const { scrollHeight, clientHeight } = scroll.current;
		scroll.current.scrollTop = scrollHeight - clientHeight;
	};

	useEffect(() => {
		if (chat) {
			scrollDown();
		}
	}, [chat]);

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
			{chat ? (
				<>
					<Member>
						<ul>
							{Object.values(chat.member).map((el, i) => {
								return (
									<li>
										<div key={Object.keys(el)[i]} className="userNameTaskInfo">
											{el.userName.slice(0,1)}
										</div>
									</li>
								);
							})}
						</ul>
						<CopyToClipboard
							text={`http://localhost:3000/chat/invited/${chat.site.code}`}
						>
							<button type="button" id="inviteMember">
								<img src={addMemberButton} alt="초대링크 복사 버튼"></img>
								<p className="inviteButton">초대링크복사</p>
							</button>
							
						</CopyToClipboard>
					</Member>
					<Content ref={scroll}>
						<ul>
							{chat.send
								? Object.values(chat.send).map((el) => {
										return (
											<li key={el.time} className="receivedMessage">
												<h5>{el.sender}</h5>
												<div>{el.message}</div>
												<p>{logDate(el.time)}</p>
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
		</Chatting>
	);
}

export default Conversation;
