import { getDatabase, ref, onValue } from "firebase/database";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";

const ChatWrap = styled.div`
	margin: 4rem auto;
	width: 80vw;
	/* height: 759px; */
	/* height: 100%; */
	height: 86vh;
	border: 2px solid #2d2d2d;
	border-radius: 1rem;
`;

function Chat() {
	const [chat, setChat] = useState();

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

	return (
		<ChatWrap>
			<ChatHeader chat={chat}></ChatHeader>
			<TaskInfo></TaskInfo>
			<Conversation chat={chat}></Conversation>
			<Input chat={chat}></Input>
		</ChatWrap>
	);
}

export default Chat;
