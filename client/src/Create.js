import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import "./create.css";
//import { Tooltip } from "bootstrap";

function Create({ createChatHandler, createChatRoom, errorInput }) {
	return (
		<div className="createChatRoom">
			<form onSubmit={e => e.preventDefault()}>
				<div className="container">
					<div className="formCreate">
						<input
							name="siteName"
							id="siteName"
							className="createInput"
							onChange={e => {
								createChatHandler(e, "siteName");
							}}
						></input>
						<label htmlFor="siteName">site name</label>
					</div>

					<div className="formCreate">
						<input
							className="createInput"
							name="roomTitle"
							id="roomTitle"
							onChange={e => {
								createChatHandler(e, "roomTitle");
							}}
						></input>
						<label htmlFor="roomTitle">room title</label>
					</div>

					<div className="formCreate">
						<input
							className="createInput"
							name="userName"
							id="userName"
							onChange={e => {
								createChatHandler(e, "userName");
							}}
						></input>
						<label htmlFor="userName">user name</label>
					</div>

					<div className="formCreate">
						<input
							className="createInput"
							name="userPhoneNumber"
							id="userPhoneNumber"
							onChange={e => {
								createChatHandler(e, "userPhoneNumber");
							}}
						></input>
						{errorInput ? (
							// <Tooltip className="errorInput">
							// 	전화번호는 010부터 입력해주세요
							// </Tooltip>
							<p className="phoneNumErr">전화번호는 010부터 입력해주세요</p>
						) : null}
						<label htmlFor="userPhoneNumber">user phone number</label>
					</div>

					<div className="formCreate">
						<input
							className="createInput"
							name="userId"
							id="userId"
							onChange={e => {
								createChatHandler(e, "userId");
							}}
						></input>
						<label htmlFor="userId">user id</label>
					</div>

					<button className="createButton" onClick={createChatRoom}>
						create chatting room
					</button>
				</div>
			</form>
		</div>
	);
}

export default Create;
