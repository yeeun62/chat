import axios from "axios";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";
import styled from "styled-components";

function Chat({ code }) {
	const [chatData, setChatData] = useState({
		code: "",
		title: "",
		createDate: "",
		member: "",
	});

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_CHAT_READ}/${code}`).then((el) =>
			setChatData({
				...chatData,
				code: el.data.chatData.room.siteCode,
				title: el.data.chatData.room.title,
				createDate: el.data.chatData.room.regDate,
				member: [el.data.chatData.member],
			})
		);
	}, []);

	const logDate = (time) => {
		let date = new Date(time * 1000);
		let year = date.getFullYear().toString().slice(-4);
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);

		let returnDate = `${hour}시 ${minute}분 ()`;
		return returnDate;
	};

	return (
		<div>
			<ChatHeader chatData={chatData}></ChatHeader>
			<TaskInfo chatData={chatData}></TaskInfo>
			<Conversation chatData={chatData} code={code}></Conversation>
			<Input></Input>
		</div>
	);
}

export default Chat;
