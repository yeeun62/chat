import React, { useState } from "react";
import axios from "axios";

function Create ({createChatHandler, createChatRoom}) {
    

    return (
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
    )
}

export default Create;