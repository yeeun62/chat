import { getDatabase, set, ref, onValue } from "firebase/database";
import { useCookies } from "react-cookie";
import { useState } from "react";
import styled from "styled-components";
import sendButton from "../img/send.png";

const InputWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 50px;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	background-color: #fff;

	.button {
		background-color: transparent;
		@media screen and (max-width: 500px) {
			width: 30px;
		}
		@media screen and (min-width: 500px) {
			width: 40px;
		}
	}

	> form {
		width: calc(100%-30px);
		flex-grow: 1;
		display: flex;

		> input {
			height: 50px;
			flex-grow: 1;
			border-bottom: 2px solid #666;
			margin-bottom: 10px;
			word-break: keep-all;
			white-space: pre-line;
		}
	}
`;

function Input() {
	const [cookie, setCookie] = useCookies(["auth"]);

	const [msg, setMsg] = useState({
		message: "",
		sender: "",
		read: true,
		time: 1,
	});

	const msgSend = async () => {
		setMsg({ ...msg, message: "" });

		if (msg.message.length) {
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
							set(send, {
								message: msg.message,
								sender: cookie.auth.split("|")[0],
								read: msg.read,
								time: time,
							});
						}
					}
				},
				{
					onlyOnce: true,
				}
			);
		}
	};

	return (
		<InputWrapper>
			<button className="addFunctionButton button">
				{/* <img
					src={addOnButton}
					className="addFunctionButton button"
					alt="부가 기능 버튼"
				></img> */}
			</button>
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					value={msg.message}
					type="text"
					onChange={(e) =>
						setMsg({
							...msg,
							message: e.target.value,
						})
					}
				/>
				<button className="sendChat button" onClick={msgSend}>
					<img
						className="sendMsg button"
						alt="메시지 전송버튼"
						src={sendButton}
					/>
				</button>
			</form>
		</InputWrapper>
	);
}

export default Input;
