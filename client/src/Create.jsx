import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = true;

const InviteWrap = styled.div`
	margin: 3rem auto;
	width: 30rem;
	height: 80vh;
	background: #e0de1b;
	border-radius: 1rem;
`;

const Title = styled.p`
	padding-top: 2rem;
	font-size: 1.3rem;
	text-align: center;
	font-weight: bold;
	color: #006495;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin-top: 2rem;

	.inviteSection {
		display: flex;
		justify-content: space-between;
		margin: 0.4rem 3.2rem;
	}

	.inviteTitle {
		color: #4b4b4b;
		font-size: 1.2rem;
		font-weight: bold;
	}

	.inviteInput {
		border: none;
		background-color: #b8b513;
		border-radius: 0.2rem;
	}

	.inviteButton {
		width: 7rem;
		height: 2.4rem;
		color: #3d3d3d;
		font-weight: bold;
		background-color: #b8b513;
		margin: 2rem auto;
	}
`;

function Create({ setCode }) {
	const navigate = useNavigate();

	const [createChat, setCreateChat] = useState({
		siteName: "handle",
		roomTitle: "채팅방",
		userName: "방예은",
		userPhoneNumber: "01099720602",
		userId: "byebye62",
	});

	const createChatHandler = (e) => {
		setCreateChat({ ...createChat, [e.target.name]: e.target.value });
	};

	const createChatRoom = async () => {
		let createRoom = await axios.post(
			process.env.REACT_APP_CHAT_CREATE,
			createChat
		);
		if (createRoom.status === 200) {
			setCode(createRoom.data.code);
			navigate("/chat");
		} else {
			alert("이런, 요청이 실패했어요 🥲 다시 입력해주세요!");
		}
	};

	return (
		<InviteWrap>
			<Title>핸들 채팅방에 오신걸 환영합니다🥳</Title>
			<Form onSubmit={(e) => e.preventDefault()}>
				<div className="inviteSection">
					<span className="inviteTitle">사용자 이름</span>
					<input
						name="userName"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					></input>
				</div>
				<div className="inviteSection">
					<span className="inviteTitle">사용자 아이디</span>
					<input
						name="userId"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					></input>
				</div>
				<div className="inviteSection">
					<span className="inviteTitle">사용자 전화번호</span>
					<input
						name="userPhoneNumber"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					></input>
				</div>
				<div className="inviteSection">
					<span className="inviteTitle">사이트 명</span>
					<input
						name="siteName"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					/>
				</div>
				<div className="inviteSection">
					<span className="inviteTitle">채팅방 이름</span>
					<input
						name="roomTitle"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					></input>
				</div>
				<button type="button" className="inviteButton" onClick={createChatRoom}>
					채팅방 입장
				</button>
			</Form>
		</InviteWrap>
	);
}

export default Create;
