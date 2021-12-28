import { getDatabase, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
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

const CustomColor = ({ modalHandler, id, name, user }) => {
	const colorList = ["#b2f299", "#FCE29F", "#E69089", "#C29DFC", "#94E8F2"];

	const [color, setColor] = useState("");

	const colorChange = () => {
		const db = getDatabase();

		if (user.userId === id) {
			let colorRef = ref(db, `chat/${user.roomNum}/member/${user.userNum}`);
			update(colorRef, { userColor: color });
		} else {
			let colorRef = ref(db, `chat/${user.roomNum}/color/${user.userId}`);
			update(colorRef, { [id]: color });
		}

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
