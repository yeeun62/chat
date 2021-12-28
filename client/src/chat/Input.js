import { getDatabase, set, ref, onValue } from "firebase/database";
import { useCookies } from "react-cookie";
import { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
	width: 100%;
	height: 7%;
	background-color: #2d2d2d;
	position: relative;

	> form {
		display: flex;
		justify-content: space-between;
		height: 100%;
	}

	.sendInput {
		padding-left: 0.3rem;
		margin: 0.5rem 0 0 0.4rem;
		top: 12%;
		left: 1%;
		width: 90%;
		height: 80%;
		border-radius: 0.3rem;
		background-color: #dadada;
		font-size: 1.2rem;
		font-weight: bold;
	}

	.send {
		text-align: center;
		display: block;
		width: 10%;
		margin: 1rem 0 0 0;
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

	const enter = (e) => {
		if (e.key == "Enter") msgSend();
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
					onKeyPress={(e) => enter(e)}
				/>
				<span className="send" onClick={msgSend}>
					전송
				</span>
			</form>
		</InputWrapper>
	);
}

export default Input;
