import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function Invited() {
	const navigate = useNavigate();

	const [createChat, setCreateChat] = useState({
		userName: "아바타",
		userPhoneNumber: "01011000000",
		userId: "avata",
	});

	const createChatHandler = (e) => {
		setCreateChat({ ...createChat, [e.target.name]: e.target.value });
	};

	const invite = async () => {
		let invite = await axios.post(
			`${process.env.REACT_APP_CHAT_INVITE}/${window.location.pathname.slice(
				14
			)}`,
			{
				userName: "아바타",
				userPhoneNumber: "01023232323",
				userId: "avata",
			}
		);
		if (invite.status === 200) {
			navigate(`/chat/${window.location.pathname.slice(14)}`);
		}
	};

	return (
		<div className="inviteWrap">
			<p className="title">핸들 채팅방에 오신걸 환영합니다🥳</p>
			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="inviteSection">
					<span className="inviteTitle">사용자 이름</span>
					<input
						name="userName"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					></input>
				</div>
				<div className="inviteSection">
					<span className="inviteTitle">사용자 아이디</span>
					<input
						name="userId"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					></input>
				</div>
				<div className="inviteSection">
					<span className="inviteTitle">사용자 전화번호</span>
					<input
						name="userPhoneNumber"
						className="inviteInput"
						onChange={(e) => {
							createChatHandler(e);
						}}
					></input>
				</div>
				<button type="button" className="inviteButton" onClick={invite}>
					채팅방 입장
				</button>
			</form>
		</div>
	);
}

export default Invited;
