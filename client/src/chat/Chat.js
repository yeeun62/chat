import { getDatabase, ref, onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";

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
		<div>
			<ChatHeader chat={chat}></ChatHeader>
			<TaskInfo></TaskInfo>
			<Conversation chat={chat}></Conversation>
			<Input chat={chat}></Input>
		</div>
	);
}

export default Chat;
