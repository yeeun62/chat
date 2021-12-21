import axios from 'axios';
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";


function Chat ({chatInfo}) {
	console.log(chatInfo)
	let logDate = (time) => {
        var date = new Date(time * 1000);
        var year = date.getFullYear().toString().slice(-4);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var hour = ("0" + date.getHours()).slice(-2);
        var minute = ("0" + date.getMinutes()).slice(-2);

        var returnDate = `${hour}시${minute}분 ()`;
        return returnDate;
    };

	const [header, setHeader] = useState({
		code: chatInfo.code,
		title: chatInfo.room.title,
		createDate: logDate(chatInfo.room.time),
		member: chatInfo.member
	})

	//const chatCode = 

    return (<div>
		<ChatHeader header={header}></ChatHeader>
		<TaskInfo ></TaskInfo>
		<Conversation ></Conversation>
		<Input></Input>
	</div>)
}

export default Chat;
