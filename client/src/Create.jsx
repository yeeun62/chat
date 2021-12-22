import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

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
		console.log(process.env.REACT_APP_CHAT)
		let createRoom = await axios.post(
			`${process.env.REACT_APP_CHAT}/create`,
			createChat
		);
		if (createRoom.status === 200) {
			setCode(createRoom.data.code);
			navigate(`/chat/${createRoom.data.code}`);
		} else {
			alert("이런, 요청이 실패했어요 🥲 다시 입력해주세요!");
		}
	};

	return (
		<div className="inviteWrap">
			<p className="title">핸들 채팅방에 오신걸 환영합니다🥳</p>
			<form className="form" onSubmit={(e) => e.preventDefault()}>
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
				<button
					type="button"
					className="handle-button"
					onClick={createChatRoom}
				>
					채팅방 입장
				</button>
			</form>
		</div>
	);
}

export default Create;
