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

	.colorBall {
		display: inline-block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0.3rem;
		cursor: pointer;
	}

	.pick {
		box-shadow: inset -2px -2px 3px #464646
	}
`;

const ColorBall = styled.div `
	display: inline-block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0.3rem;
		cursor: pointer;
`

const CustomColor = ({ colorModalHandler, id, name, user, chat }) => {
	const colorList = ["178, 242, 153", "252, 226, 159", "230, 145, 137", "193, 157, 252", "148, 233, 242", 
	"235, 157, 206", "164, 187, 245", "160, 222, 174", "245, 230, 164", "245, 192, 184", 
	"19, 140, 130", "240, 238, 205", "241, 156, 51", "88, 70, 50", "217, 76, 37",
	"174, 39, 113", "240, 181, 211", "239, 130, 161", "245, 245, 245", "206, 237, 229", 
	"93, 113, 140", "128, 173, 191", "242, 237, 208", "242, 213, 196", "191, 69, 69",
	"219, 129, 129", "151, 122, 191", "81, 72, 115", "191, 173, 168", "140, 104, 101"];

	const [color, setColor] = useState("");
	const [pick, setPick] = useState("colorBall");

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
				return (
					<ColorBall
						className={pick}
						key={el}
						onClick={(e) => {
							console.log(e.target.style.background);
							setColor(el);
							setPick((e.target.style.background === el && pick === "colorBall") ? "colorBall pick" : "colorBall");
						}}
						style={{ background: `rgb(${el})`}} 
					></ColorBall>
				);
			})}
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
