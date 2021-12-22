import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

function Conversation({ chatInfo }) {
	let logDate = time => {
		let date = new Date(time * 1000);
		let year = date.getFullYear().toString().slice(-4);
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);
		let returnDate = `${month}월 ${day}일 ${hour}시${minute}분`;
		return returnDate;
	};

	return (
		<div className="Conversation">
			<div className="information">
				<ul className="memberUl">
					<li className="memberWrapper">
						<div className="memberList">박</div>
					</li>
					<li className="memberWrapper">
						<div className="memberList">방</div>
					</li>
					<li className="memberWrapper">
						<div className="memberList">채</div>
					</li>
					{/* {chatInfo.member.map(mem => {
					return (
						<li className="memberWrapper">
							<div className="memberList"></div> {mem.userName}
						</li>
					);
				})} */}
				</ul>
				<button className="inviteNewMember">
					<img
						alt="새로운 멤버 초대"
						src="./img/add-friend.png"
						className="inviteNewMember"
					></img>
				</button>
			</div>
			<div className="chatWrapper">
				<div className=""></div>
			</div>
		</div>
	);
}

export default Conversation;
