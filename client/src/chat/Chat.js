import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
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
	background-color: #2d2d2d;
`;

function Chat() {
	let { code } = useParams();
	const [chat, setChat] = useState(null);
	const [user, setUser] = useState(null);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const db = getDatabase();
		const dbRef = ref(db, "chat");
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			let boolean = true;
			Object.values(data).map((el) => {
				if (el.site.code === code && true) {
					setChat(el);
					boolean = false;
				}
			});
		});
	}, []);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem(code)));
	}, []);

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	return (
		<ChatWrap>
			{chat ? (
				<>
					<ChatHeader chat={chat} searchHandler={searchHandler}></ChatHeader>
					<TaskInfo></TaskInfo>
					<Conversation
						chat={chat}
						search={search}
						user={user}
						code={code}
					></Conversation>
					<Input code={code}></Input>
				</>
			) : (
				<Loading></Loading>
			)}
		</ChatWrap>
	);
}

export default Chat;
