import { getDatabase, set, ref, push } from "firebase/database";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function Create() {
	const navigate = useNavigate();
	const [cookie, setCookie] = useCookies(["auth"]);

	const [createChat, setCreateChat] = useState({
		name: "handle",
		title: "채팅방",
		userName: "방예은",
		userPhoneNumber: "01099720602",
		userId: "byebye62",
	});

	const createChatHandler = (e) => {
		setCreateChat({ ...createChat, [e.target.name]: e.target.value });
	};

	const createChatRoom = async () => {
		const db = getDatabase();
		const dbRef = ref(db, "chat");

		const newdbRef = push(dbRef);
		const chatId = newdbRef._path;

		const member = ref(db, `${chatId}/member`);
		const memberRef = push(member);

		const uuid = await axios.get(process.env.REACT_APP_UUID);
		const time = Math.floor(Date.now() / 1000);

		const { userName, userPhoneNumber, userId, title, name } = createChat;

		let chat = {
			room: { title, siteCode: uuid.data.code, regDate: time },
			site: { name, color: "#E0DE1B", code: uuid.data.code },
		};

		set(newdbRef, chat);
		set(memberRef, { userName, userPhoneNumber, userId });
		setCookie("auth", `${userName}|${uuid.data.code}`);
		navigate(`/chat/${uuid.data.code}`);
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
						name="name"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					/>
				</div>
				<div className="inviteSection">
					<span className="inviteTitle">채팅방 이름</span>
					<input
						name="title"
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
