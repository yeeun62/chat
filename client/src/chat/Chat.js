import axios from "axios";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";

function Chat() {
	const [chatData, setChatData] = useState({
		code: "",
		title: "",
		createDate: "",
		member: "",
	});

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_CHAT}/${window.location.pathname.slice(6)}`)
			.then((el) =>
				setChatData({
					...chatData,
					code: el.data.chatData.room.siteCode,
					title: el.data.chatData.room.title,
					createDate: el.data.chatData.room.regDate,
					member: [el.data.chatData.member],
				})
			);
	}, []);

	return (
		<div>
			<ChatHeader chatData={chatData}></ChatHeader>
			<TaskInfo chatData={chatData}></TaskInfo>
			<Conversation
				chatData={chatData}
				code={window.location.pathname.slice(6)}
			></Conversation>
			<Input></Input>
		</div>
	);
}

export default Chat;
