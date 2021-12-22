import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
//import { Tooltip } from "bootstrap";

function Create({ setCode }) {
	const navigate = useNavigate();
	const [errorInput, setErrorInptut] = useState(false);

	const [createChat, setCreateChat] = useState({
		siteName: "handle",
		roomTitle: "채팅방",
		userName: "방예은",
		userPhoneNumber: "01099720602",
		userId: "byebye62",
	});

	const createChatHandler = (e) => {
		setCreateChat({ ...createChat, [e.target.name]: e.target.value });
		// let num = createChat.userPhoneNumber.toString().split("");
		// const numCheck = (num) => num.filter((s) => typeof s === "Number");
		// setCreateChat({ ...createChat, userPhoneNumber: numCheck(num) });
		// if (createChat.userPhoneNumber.toString().length !== 11)
		// 	setErrorInptut(true);
	};

	const createChatRoom = async () => {
		let createRoom = await axios.post(
			process.env.REACT_APP_CHAT_CREATE,
			createChat,
			{
				withCredentials: true,
			}
		);
		if (createRoom.status === 200) {
			setCode(createRoom.data.code);
			navigate("/chat");
		} else {
			alert("이런, 요청이 실패했어요 🥲 다시 입력해주세요!");
		}
	};

	return (
		<div className="createChatRoom">
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="siteName">site name</label>
				<input
					name="siteName"
					id="siteName"
					className="formCreate"
					onChange={(e) => {
						createChatHandler(e);
					}}
				></input>
				<br />
				<label htmlFor="roomTitle">room title</label>
				<input
					name="roomTitle"
					id="roomTitle"
					className="formCreate"
					onChange={(e) => {
						createChatHandler(e);
					}}
				></input>
				<br />
				<label htmlFor="userName">user name</label>
				<input
					name="userName"
					id="userName"
					className="formCreate"
					onChange={(e) => {
						createChatHandler(e);
					}}
				></input>
				<br />
				<label htmlFor="userPhoneNumber">user phone number</label>
				<input
					name="userPhoneNumber"
					id="userPhoneNumber"
					className="formCreate"
					onChange={(e) => {
						createChatHandler(e);
					}}
				></input>
				{errorInput ? (
					<p className="errorInput">전화번호는 010부터 입력해주세요</p>
				) : null}
				<br />
				<label htmlFor="userId">user id</label>
				<input
					name="userId"
					id="userId"
					className="formCreate"
					onChange={(e) => {
						createChatHandler(e);
					}}
				></input>
				<br />
				<button className="createButton" onClick={createChatRoom}>
					create chatting room
				</button>
			</form>
		</div>
	);
}

export default Create;
