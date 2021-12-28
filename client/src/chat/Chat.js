import { getDatabase, ref, onValue } from "firebase/database";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";
import Loding from "./Loding";

const ChatWrap = styled.div`
	width: 100%;
	height: 100vh;
	min-height: 500px;
	border: 3px solid #2d2d2d;
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
			{chat ? (
				<>
					<ChatHeader chat={chat}></ChatHeader>
					<TaskInfo></TaskInfo>
					<Conversation chat={chat}></Conversation>
					<Input chat={chat}></Input>
				</>
			) : (
				<Loding></Loding>
			)}
		</ChatWrap>
	);
}

export default Chat;
