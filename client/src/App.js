import axios from "axios";
import React, { useState } from "react";
import Chat from "./chat/Chat";
import Create from "./Create";
import Invited from "./Invited";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
	const [chatInfo, setChatInfo] = useState({});
	const [createChat, setCreateChat] = useState({
		siteName: "",
		roomTitle: "",
		userName: "",
		userPhoneNumber: "",
		userId: "",
	});
	const ROOM_CODE = chatInfo.code;

	const createChatHandler = (e, name) => {
		setCreateChat({ ...createChat, [name]: e.target.value });
		console.log(createChat);
	};

	const createChatRoom = () => {
		axios.post(process.env.REACT_APP_HANDLE_CHAT, createChat).then((res) => {
			console.log(res);
			if (res.status === 200) {
				setChatInfo({
					code: res.data.code,
					member: res.data.member,
					room: res.data.room,
				});
			}
		});
	};

	const [invited, setInvited] = useState({
		userName: "",
		userPhoneNumber: "",
		userId: "",
	});
	const invitedHandler = (e, name) => {
		setInvited({ ...invited, [name]: e.target.value });
	};
	const invitedRoom = () => {
		axios.post(`${process.env.REACT_APP_HANDLE_INVITE}/${ROOM_CODE}`, invited);
		// .then(res => {
		// 	if(res.status === 200) {

		// 	}
		// })
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Create
							createChatHandler={createChatHandler}
							createChatRoom={createChatRoom}
						/>
					}
				></Route>
				<Route path="/chat" element={<Chat chatInfo={chatInfo} />}></Route>
				<Route
					path="/invited"
					element={
						<Invited
							invitedHandler={invitedHandler}
							invitedRoom={invitedRoom}
						/>
					}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
