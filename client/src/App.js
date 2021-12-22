import axios from "axios";
import React, { useState } from "react";
import Chat from "./chat/Chat";
import Create from "./Create";
import Invited from "./Invited";
import { BrowserRouter, Routes, Route, useHref } from "react-router-dom";
import "./App.css";

function App() {
	const redirect = useHref;
	const [chatInfo, setChatInfo] = useState({});
	const [createChat, setCreateChat] = useState({
		siteName: "",
		roomTitle: "",
		userName: "",
		userPhoneNumber: "",
		userId: "",
	});

	const [errorInput, setErrorInptut] = useState(false);
	const createChatHandler = (e, name) => {
		setCreateChat({ ...createChat, [name]: e.target.value });
		console.log();
	};

	const createChatRoom = () => {
		let num = createChat.userPhoneNumber.toString().split("");
		const numCheck = num => num.filter(s => typeof s === "Number");
		setCreateChat({ ...createChat, userPhoneNumber: Number(numCheck(num)) });
		if (createChat.userPhoneNumber.toString().length !== 11) {
			setErrorInptut(true);
		} else {
			setChatInfo({
				code: "res.data.code",
				member: "res.data.member",
				room: "res.data.room",
			});
			axios.post(process.env.REACT_APP_HANDLE_CHAT, createChat).then(res => {
				if (res.status === 200) {
					console.log(res.data);
					setChatInfo({
						code: res.data.code,
						member: res.data.member,
						room: res.data.room,
					});
					console.log(chatInfo, "chatinfo");
					let ROOM_CODE = res.data.code;
					window.location.href = "http://localhost:3000/chat";
					//window.location.href=`https://chat.handle.market/${ROOM_CODE}`
				} else {
					alert("이런, 요청이 실패했어요 🥲 다시 입력해주세요!");
				}
			});
		}
	};

	const [invited, setInvited] = useState({
		userName: "",
		userPhoneNumber: "",
		userId: "",
		code: "",
	});
	const invitedHandler = (e, name) => {
		setInvited({ ...invited, [name]: e.target.value });
		let num = invited.userPhoneNumber.toString().split("");
		const numCheck = num => num.filter(s => typeof s === "Number");
		setInvited({ ...invited, userPhoneNumber: numCheck(num) });
		if (invited.userPhoneNumber.toString().length !== 11) setErrorInptut(true);
	};
	const invitedRoom = () => {
		let ROOM_CODE = invited.code;
		axios
			.post(`${process.env.REACT_APP_HANDLE_INVITE}/${ROOM_CODE}`, invited)
			.then(res => {
				if (res.status === 200) {
					redirect(`/${ROOM_CODE}`);
				} else {
					// 요청 조건에 맞게 잘 입력했는지 바로바로 피드백해주기.
					alert("이런, 요청이 실패했어요 🥲 다시 입력해주세요!");
				}
			});
	};

	return (
		<>
			<Chat chatInfo={chatInfo}></Chat>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Create
								createChatHandler={createChatHandler}
								createChatRoom={createChatRoom}
								errorInput={errorInput}
							/>
						}
					></Route>
					{/* <Route path="/chat" element={<Chat chatInfo={chatInfo} />}></Route> */}
					<Route
						path="/invited"
						element={
							<Invited
								invitedHandler={invitedHandler}
								invitedRoom={invitedRoom}
								errorInput={errorInput}
							/>
						}
					></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
