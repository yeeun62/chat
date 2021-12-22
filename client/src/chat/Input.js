import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import "./input.css";

function Input() {
	const [content, setContent] = useState("");
	const [viewFunction, setVeiwFunction] = useState(false);

	const viewFunctionHandler = () =>
		viewFunction ? setVeiwFunction(false) : setVeiwFunction(true);
	const contentHandeler = e => {
		setContent(e.target.value);
		console.log(content);
	};

	return (
		<div className="Input">
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
					onChange={e => {
						contentHandeler(e);
					}}
				></input>
				<button className="sendChat">
					<img className="sendMsg" alt="메시지 전송버튼" src="./img/send.png" />
				</button>
			</form>
		</div>
	);
}

export default Input;
