import axios from 'axios';
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import TaskInfo from "./TaskInfo";
import Conversation from "./Conversation";
import Input from "./Input";


function Chat ({chatInfo}) {
    return (<div>
		<ChatHeader></ChatHeader>
		<TaskInfo></TaskInfo>
		<Conversation ></Conversation>
		<Input></Input>
	</div>)
}

export default Chat;
