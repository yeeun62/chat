import { useState } from "react";
import styled from "styled-components";
import addOnButton from '../img/plus-sign.png';
import sendButton from '../img/send.png';
import './input.css';

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
			<button className="addFunctionButton" onClick={viewFunctionHandler}>
				<img src={addOnButton} className="addFunctionButton" alt="부가 기능 버튼"></img>
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
					id="chatInput"
					onChange={(e) => {
						contentHandeler(e);
					}}
				></input>
				<button className="sendChat">
					<img className="sendMsg" alt="메시지 전송버튼" src={sendButton} />
				</button>
			</form>
		</InputWrapper>
	);
}

export default Input;
