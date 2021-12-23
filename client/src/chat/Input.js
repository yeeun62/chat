import { getDatabase, set, ref, onValue } from "firebase/database";
import { useCookies } from "react-cookie";
import { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
	width: 100%;
	height: 50px;
	background-color: #2d2d2d;
	position: relative;

	.sendInput {
		position: absolute;
		top: 12%;
		left: 1%;
		width: 90%;
		height: 35px;
		background-color: #dadada;
	}

	.send {
		position: absolute;
		right: 1%;
		top: 12%;
		margin: 0.3rem;
		color: #fff;
		font-size: 1.2rem;
		font-weight: bold;
		cursor: pointer;
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
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					className="sendInput"
					value={msg.message}
					type="text"
					onChange={(e) =>
						setMsg({
							...msg,
							message: e.target.value,
						})
					}
				/>
				<span className="send" onClick={msgSend}>
					전송
				</span>
			</form>
		</InputWrapper>
	);
}

export default Input;
