import axios from "axios";
import React, { useState } from "react";
import Chat from "./chat/Chat";
import Create from "./Create";
import Invited from "./Invited";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
	const [code, setCode] = useState("");

	const [invited, setInvited] = useState({
		userName: "",
		userPhoneNumber: "",
		userId: "",
		code: "",
	});

	// const invitedHandler = (e, name) => {
	// 	setInvited({ ...invited, [name]: e.target.value });
	// 	let num = invited.userPhoneNumber.toString().split("");
	// 	const numCheck = (num) => num.filter((s) => typeof s === "Number");
	// 	setInvited({ ...invited, userPhoneNumber: numCheck(num) });
	// 	if (invited.userPhoneNumber.toString().length !== 11) setErrorInptut(true);
	// };
	// const invitedRoom = () => {
	// 	let ROOM_CODE = invited.code;
	// 	axios
	// 		.post(`${process.env.REACT_APP_CHAT_INVITE}/${ROOM_CODE}`, invited)
	// 		.then((res) => {
	// 			if (res.status === 200) {
	// 				redirect(`/${ROOM_CODE}`);
	// 			} else {
	// 				// 요청 조건에 맞게 잘 입력했는지 바로바로 피드백해주기.
	// 				alert("이런, 요청이 실패했어요 🥲 다시 입력해주세요!");
	// 			}
	// 		});
	// };

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Create setCode={setCode} />}></Route>
				<Route path="/chat" element={<Chat code={code} />}></Route>
				{/* <Route
					path="/invited"
					element={
						<Invited
							invitedHandler={invitedHandler}
							invitedRoom={invitedRoom}
							errorInput={errorInput}
						/>
					}
				></Route> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
