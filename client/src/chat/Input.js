import { useState } from "react";
import styled from "styled-components";
import addOnButton from "../img/plus-sign.png";
import sendButton from "../img/send.png";

const InputWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 60px;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	box-shadow: inset -5px -5px 5px #ddd;
	background-color: #f1f1f1;

	.button {
		background-color: transparent;
		@media screen and (min-width:500px) {
			width: 50px;
		}

		@media screen and (max-width:500px) {
			width: 30px;
		}
	}


	> form {
		width: calc(100%-30px);
		flex-grow: 1;
		display: flex;

		> input {
			flex-grow: 1;
			border: 1px solid #999;
			margin-bottom: 10px;
			word-break: keep-all;
			white-space: pre-line;
		}
	}
`;

function Input() {
	const [content, setContent] = useState("");
	const [viewFunction, setVeiwFunction] = useState(false);

	const viewFunctionHandler = () =>
		viewFunction ? setVeiwFunction(false) : setVeiwFunction(true);

	const contentHandeler = (e) => {
		setContent(e.target.value);
		console.log(content);
	};

	return (
		<InputWrapper>
			<button className="addFunctionButton button" onClick={viewFunctionHandler}>
				<img
					src={addOnButton}
					className="addFunctionButton button"
					alt="부가 기능 버튼"
				></img>
			</button>
			{viewFunction ? (
				<div className="addFunction">
					<ul>
						<li></li>
					</ul>
				</div>
			) : null}

			<form>
				<input
					type="text"
					id="chatInput"
					onChange={(e) => {
						contentHandeler(e);
					}}
				></input>
				<button className="sendChat button">
					<img className="sendMsg button" alt="메시지 전송버튼" src={sendButton} />
				</button>
			</form>
		</InputWrapper>
	);
}

export default Input;
