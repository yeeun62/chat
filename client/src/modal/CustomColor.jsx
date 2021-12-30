import { getDatabase, ref, update } from "firebase/database";
import { useState } from "react";
import styled from "styled-components";

const ColorModal = styled.div`
	.customUserName {
		font-size: 1.3rem;
		font-weight: bold;
		color: #fff;
		text-align: center;
		margin: 1rem;
	}

	.colorBallContainer {
		margin: auto;
		width: calc(250px + 3rem);
	}
`;

const ColorBall = styled.div`
	display: inline-block;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin: 0.3rem;
	cursor: pointer;
`;

const CustomColor = ({ colorModalHandler, id, name, user, chat }) => {
	const colorList = [
		"#B2F299",
		"#FCE29F",
		"#E69189",
		"#C19DFC",
		"#94E9F2",
		"#EB9DCE",
		"#A4BBF5",
		"#A0DEAE",
		"#F5E6A4",
		"#F5C0B8",
		"#138C82",
		"#F0EC14",
		"#F19B33",
		"#584632",
		"#D94C25",
		"#AE2771",
		"#F0B5D3",
		"#EF82A1",
		"#F5F5F5",
		"#CEEDE5",
		"#5D718C",
		"#80ADBF",
		"#F2EDD0",
		"#F2D5C4",
		"#BF4545",
		"#DB8181",
		"#977ABF",
		"#514873",
		"#BFADA8",
		"#8C6865",
	];

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

		window.location.replace(`/chat/${chat.site.code}`);
		colorModalHandler();
	};

	return (
		<ColorModal>
			<p className="customUserName">{name}</p>
			<div className="colorBallContainer">
				{colorList.map((el) => {
					if (color) {
						return (
							<ColorBall
								className="pick"
								key={el}
								onClick={() => {
									setColor(el);
								}}
								style={
									color === el
										? {
												background: el,
												boxShadow: "inset -2px -2px 3px #464646",
										  }
										: { background: el }
								}
							></ColorBall>
						);
					} else {
						return (
							<ColorBall
								key={el}
								onClick={() => {
									setColor(el);
								}}
								style={{ background: el }}
							></ColorBall>
						);
					}
				})}
			</div>
			<div className="modalButton">
				<p onClick={colorChange} className="modalComfirm">
					변경
				</p>
				<p onClick={colorModalHandler} className="modalClose">
					닫기
				</p>
			</div>
		</ColorModal>
	);
};

export default CustomColor;
