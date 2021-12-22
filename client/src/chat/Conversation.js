import axios from "axios";
import { useEffect, useState } from "react";

function Conversation({ chatData, code }) {
	const invite = async () => {
		let a = await axios.post(
			`${process.env.REACT_APP_CHAT_INVITE}/${code}`,
			{
				userName: "아바타",
				userPhoneNumber: "01023232323",
				userId: "avata",
			},
			{ withCredentials: true }
		);
		console.log("!!", a);
	};

	let logDate = (time) => {
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
		<>
			<div>
				<ul>
					<li>
						{chatData.member.length ? (
							chatData.member.map((el) => {
								return (
									<div key={Object.keys(el)[0]} className="userNameTaskInfo">
										{Object.values(el)[0].userName}
									</div>
								);
							})
						) : (
							<p>로딩중~</p>
						)}
					</li>
				</ul>
				<button className="inviteNewMember" onClick={invite}>
					초대하기
					{/* <img alt="새로운 멤버 초대" src="../../public/img/add-friend.png"></img> */}
				</button>
			</div>
			<div className="Conversation">
				<div className="chatWrapper">
					<div>{logDate(chatData.createDate)}</div>
				</div>
			</div>
		</>
	);
}

export default Conversation;
