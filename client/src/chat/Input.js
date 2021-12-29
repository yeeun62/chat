import { getDatabase, set, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
		align-items: center;
		padding: 0 0.4rem;
		overflow: hidden;
	}

	.sendInput {
		top: 12%;
		left: 1%;
		width: 90%;
		height: 80%;
		border-radius: 0.3rem;
		background-color: #dadada;
		padding-left: 0.2rem;
		font-size: 1.2rem;
		font-weight: bold;
		resize: none;
	}

	.send {
		text-align: center;
		display: block;
		width: 10%;
		color: #fff;
		font-size: 1.2rem;
		font-weight: bold;
		cursor: pointer;
		overflow: hidden;
		line-height: 100%;

		@media screen and (max-width: 390px) {
			font-size: 4vw;
			font-weight: bold;
		}
	}
`;

function Input({ code }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem(code)));
	}, []);

	const [msg, setMsg] = useState({
		message: "",
		sender: "",
		read: true,
		time: 1,
	});

	const msgSend = async () => {
		setMsg({ ...msg, message: "" });

		if (msg.message.length >= 2) {
			const db = getDatabase();
			const dbRef = ref(db, "chat");
			const time = Math.floor(Date.now() / 1000);
			onValue(
				dbRef,
				async (snapshot) => {
					let data = snapshot.val();
					for (let el in data) {
						if (data[el].site.code === code) {
							const send = ref(db, `chat/${el}/send/${time}`);
							set(send, {
								message: msg.message,
								sender: user.userName,
								userId: user.userId,
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
				<textarea
					className="sendInput"
					value={msg.message}
					cols="50"
					rows="10"
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
