import axios from 'axios';
import React, { useState } from "react";
import Chat from './chat/Chat';

import "./App.css";


function App() {
	const [isExistChat, setIsExistChat] = useState(false);
	const [chatInfo, setChatInfo] = useState({});
	const [createChat, setCreateChat] = useState({
		siteName: '',
		roomTitle: '',
		userName: '',
		userPhoneNumber: '',
		userId: ''
	});
	const createChatHandler = (e, name) => {
		setCreateChat({...createChat,  [name]: e.target.value});
		console.log(createChat)
	}

	const createChatRoom = () => {
		axios.post('https://api.handle.market/v1/chat/create', createChat)
		.then(res => {
			console.log(res)
			if(res.message === "") setIsExistChat(true);
			setChatInfo(res.data);
		})
	}

	return <div className='Appjs'>
		<div className='createChatRoom'>
			<form>
				<input name="siteName" onChange={(e) => {createChatHandler(e, 'siteName')}}></input>
				<label for="siteName">site name</label>
				<input name="roomTitle" onChange={(e) => {createChatHandler(e,'roomTitle')}}></input>
				<label for="roomTitle">room title</label>
				<input name="userName" onChange={(e) => {createChatHandler(e,'userName')}}></input>
				<label for="userName">user name</label>
				<input name="userPhoneNumber" onChange={(e) => {createChatHandler(e, 'userPhoneNumber')}}></input>
				<label for="userPhoneNumber">user phone number</label>
				<input name="userId" onChange={(e) => {createChatHandler(e, 'userId')}}></input>
				<label for="userId">user id</label>
				<button className="createButton" onClick={createChatRoom}>
					create chatting room
				</button>
			</form>
		</div>
		<Chat></Chat>
		{
			// isExistChat ? <Chat chatInfo={chatInfo}></Chat> : null
		}
	</div>;
}

export default App;
