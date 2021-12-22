import { useState } from "react";
import styled from "styled-components";

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
				<img src="./img/plus-sign.png" className="addFunctionButton"></img>
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
					<img className="sendMsg" alt="메시지 전송버튼" src="./img/send.png" />
				</button>
			</form>
		</InputWrapper>
	);
}

export default Input;
