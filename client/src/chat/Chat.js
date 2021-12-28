import { getDatabase, ref, onValue } from "firebase/database";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";
import Loading from "./Loading";

const ChatWrap = styled.div`
	width: 100%;
	height: 100vh;
	min-height: 500px;
	border: 3px solid #2d2d2d;
`;

function Chat() {
	const [chat, setChat] = useState();
	const [search, setSearch] = useState("");

	useEffect(() => {
		const db = getDatabase();
		const dbRef = ref(db, "chat");
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			let boolean = true;
			Object.values(data).map((el) => {
				if (el.site.code === window.location.pathname.slice(6) && true) {
					setChat(el);
					boolean = false;
				}
			});
		});
	}, []);

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	// const getSearchResult = (keyword) => {
	// 	let searchData = [];

	// 	if(keyword.length){
	// 		Object.values(chat.send).map(msg => {
	// 			if(msg.message.includes(keyword) || msg.sender.includes(keyword)) {
	// 				searchData.push(msg);
	// 				console.log(searchData);
	// 			}
	// 		});
	// 		console.log(chat)
	// 		if(searchData.length) setChat(searchData);
	// 		else setChat(originChat);
	// 	} else {
	// 		setChat(originChat);
	// 	}
	// }

	return (
		<ChatWrap>
			{chat ? (
				<>
					<ChatHeader chat={chat} searchHandler={searchHandler}></ChatHeader>
					<TaskInfo></TaskInfo>
					<Conversation chat={chat} search={search}></Conversation>
					<Input chat={chat}></Input>
				</>
			) : (
				<Loading></Loading>
			)}
		</ChatWrap>
	);
}

export default Chat;
