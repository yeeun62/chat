import { getDatabase, set, ref, onValue, push } from "firebase/database";
import { useState } from "react";
import styled from "styled-components";
import addOnButton from "../img/plus-sign.png";
import sendButton from "../img/send.png";
import "./input.css";

const InputWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	box-shadow: inset -5px -5px 5px #ddd;

	> button img {
		width: 30px;
	}

	> form {
		width: calc(100%-30px);
		flex-grow: 1;
		display: flex;

		> input {
			flex-grow: 1;
			border-bottom: 2px solid #666;
			margin-bottom: 10px;
		}

		> button img {
			width: 30px;
		}
	}
`;

function Input() {
	const [msg, setMsg] = useState({
		message: "안녕하세요",
		sender: "방예은",
		read: true,
		time: "",
	});

	const message = (e) => {
		setMsg({ ...msg, message: e.target.value });
	};

	const msgSend = async () => {
		console.log(window.location.pathname.slice(6));
		const db = getDatabase();
		const dbRef = ref(db, "chat");

		const time = Math.floor(Date.now() / 1000);

		onValue(
			dbRef,
			async (snapshot) => {
				let data = snapshot.val();
				for (let el in data) {
					if (data[el].site.code === window.location.pathname.slice(6)) {
						const send = ref(db, `chat/${el}/send/${time}`);
						set(send, msg);
					}
				}
			},
			{
				onlyOnce: true,
			}
		);
	};

	return (
		<InputWrapper>
			<button className="addFunctionButton">
				<img
					src={addOnButton}
					className="addFunctionButton"
					alt="부가 기능 버튼"
				></img>
			</button>
			<form onSubmit={(e) => e.preventDefault()}>
				<input type="text" onChange={message} />
				<button className="sendChat" onClick={msgSend}>
					<img className="sendMsg" alt="메시지 전송버튼" src={sendButton} />
				</button>
			</form>
		</InputWrapper>
	);
}

export default Input;
