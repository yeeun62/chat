import axios from "axios";
import React, { useState } from "react";
import Chat from "./chat/Chat";

import "./App.css";

function App() {
	const [isExistChat, setIsExistChat] = useState(false);
	const [chatInfo, setChatInfo] = useState({});
	const [createChat, setCreateChat] = useState({
		siteName: "",
		roomTitle: "",
		userName: "",
		userPhoneNumber: "",
		userId: "",
	});

	const createChatHandler = (e, name) => {
		setCreateChat({ ...createChat, [name]: e.target.value });
		console.log(createChat);
	};

	const createChatRoom = () => {
		axios.post(process.env.REACT_APP_HANDLE_CHAT, createChat)
		.then(res => {
			console.log(res)
			if(res.status === 200) setIsExistChat(true);
			setChatInfo({
				code: res.data.code,
				member: res.data.member,
				room: res.data.room
			});
		})
	}

	return <div className='Appjs'>
		{
			isExistChat ? <Chat chatInfo={chatInfo}></Chat> 
			:
			<div className='createChatRoom'>
			<form onSubmit={(e) => e.preventDefault()}>
				<input name="siteName" id="siteName" className='formCreate' onChange={(e) => {createChatHandler(e, 'siteName')}}></input>
				<label htmlFor="siteName">site name</label>
				<input name="roomTitle" id="roomTitle" className='formCreate' onChange={(e) => {createChatHandler(e, 'roomTitle')}}></input>
				<label htmlFor="roomTitle">room title</label>
				<input name="userName" id="userName" className='formCreate' onChange={(e) => {createChatHandler(e, 'userName')}}></input>
				<label htmlFor="userName">user name</label>
				<input name="userPhoneNumber" id="userPhoneNumber" className='formCreate' onChange={(e) => {createChatHandler(e, 'userPhoneNumber')}}></input>
				<label htmlFor="userPhoneNumber">user phone number</label>
				<input name="userId" id="userId" className='formCreate' onChange={(e) => {createChatHandler(e, 'userId')}}></input>
				<label htmlFor="userId">user id</label>
				<button className="createButton" onClick={createChatRoom}>
					create chatting room
				</button>
			</form>
		</div>
		}
	</div>;

}

export default App;
