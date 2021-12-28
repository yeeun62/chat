import { getDatabase, ref, onValue, push, update } from "firebase/database";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function Invited() {
	const navigate = useNavigate();
	const [cookie, setCookie] = useCookies(["auth"]);

	const [createChat, setCreateChat] = useState({
		userName: "아바타",
		userPhoneNumber: "01011000000",
		userId: "avata",
		userColor: getRandomColor(),
	});

	function getRandomColor() {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
	}

	const createChatHandler = (e) => {
		setCreateChat({ ...createChat, [e.target.name]: e.target.value });
	};

	// const invite = async () => {
	// 	const db = getDatabase();
	// 	const dbRef = ref(db, "chat");
	// 	onValue(
	// 		dbRef,
	// 		async (snapshot) => {
	// 			let data = snapshot.val();
	// 			for (let el in data) {
	// 				if (data[el].site.code === window.location.pathname.slice(14)) {
	// 					const member = ref(db, `chat/${el}/member`);
	// 					const memberRef = push(member);
	// 					update(memberRef, createChat);
	// 					navigate(`/chat/${window.location.pathname.slice(14)}`);
	// 					break;
	// 				}
	// 			}
	// 		},
	// 		{
	// 			onlyOnce: true,
	// 		}
	// 	);
	// 	setCookie(
	// 		"auth",
	// 		`${createChat.userName}|${window.location.pathname.slice(14)}`
	// 	);
	// };

	const invite = async () => {
		const db = getDatabase();
		const dbRef = ref(db, "chat");

		const newdbRef = push(dbRef);
		const chatId = newdbRef._path;

		onValue(
			dbRef,
			async (snapshot) => {
				let data = snapshot.val();
				for (let el in data) {
					if (data[el].site.code === window.location.pathname.slice(14)) {
						const member = ref(db, `chat/${el}/member`);
						const memberRef = push(member);
						update(memberRef, createChat);
						navigate(`/chat/${window.location.pathname.slice(14)}`);
						break;
					}
				}
			},
			{
				onlyOnce: true,
			}
		);
		setCookie("auth", `${createChat.userName}|${chatId.pieces_[1]}`);
	};

	return (
		<div className="inviteWrap">
			<p className="title">handle 채팅방에 오신걸 환영합니다🥳</p>
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
				<button type="button" className="inviteButton" onClick={invite}>
					채팅방 입장
				</button>
			</form>
		</div>
	);
}

export default Invited;
