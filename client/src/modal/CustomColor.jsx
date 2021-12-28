import { getDatabase, ref, update, push } from "firebase/database";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ColorModal = styled.div`
	.customUserName {
		font-size: 1.3rem;
		font-weight: bold;
		color: #fff;
		text-align: center;
		margin: 1rem;
	}

	.colorBall {
		display: inline-block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0.3rem;
		cursor: pointer;
	}

	div {
		margin: 1rem;
		display: flex;
		justify-content: space-around;

		p {
			color: #fff;
			font-weight: bold;
			cursor: pointer;
		}
	}
`;

const CustomColor = ({ modalHandler, name }) => {
	const navigate = useNavigate();

	const colorList = ["#b2f299", "#FCE29F", "#E69089", "#C29DFC", "#94E8F2"];

	const [color, setColor] = useState("");
	const [myName, setMyName] = useState("");
	const [userNum, setUserNum] = useState("");
	const [roomNum, setRoomNum] = useState("");

	const [cookies, setCookie] = useCookies(["auth"]);

	useEffect(() => {
		setMyName(cookies.auth.split("|")[0]);
		setRoomNum(cookies.auth.split("|")[1]);
		setUserNum(cookies.auth.split("|")[2]);
	}, []);

	const colorChange = () => {
		const db = getDatabase();
		let addColor;
		if (myName === name) {
			addColor = ref(db, `chat/${roomNum}/member/${userNum}`);
			update(addColor, { userColor: color });
		} else {
			console.log("다름");
			addColor = ref(
				db,
				`chat/${roomNum}/member/${userNum}/customColor/${name}`
			);
			update(addColor, { color });
		}

		//window.location.replace("/chat/2b6f1b6b-5086-429c-a514-f9df16ff7c87");
		//navigate(`/chat/2b6f1b6b-5086-429c-a514-f9df16ff7c87`);
		modalHandler();
	};

	return (
		<ColorModal>
			<p className="customUserName">{name}</p>
			{colorList.map((el) => {
				return (
					<div
						className="colorBall"
						key={el}
						onClick={() => setColor(el)}
						style={{ background: el }}
					></div>
				);
			})}
			<div>
				<p onClick={colorChange}>변경</p>
				<p onClick={modalHandler}>닫기</p>
			</div>
		</ColorModal>
	);
};

export default CustomColor;
