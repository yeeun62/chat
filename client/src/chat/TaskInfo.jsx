import React, { useState } from "react";
import styled from "styled-components";

const TaskInformation = styled.div`
	height: 7%;
	text-align: center;
	font-weight: 700;
	line-height: 20px;
	background-color: #2d2d2d;
	padding: 0rem 2rem;

	.nowStep {
		@media screen and (max-width: 500px) {
			font-size: 14px;
		}
		margin-top: 5px;
	}
	border-bottom: 1px slid #999 !important;

	.false {
		display: none;
	}
`;

const Progress = styled.div`
	width: 90%;
	height: 40px;
	background-color: #fffeb3;
	margin: 10px auto;
	border-radius: 2rem;
	position: relative;
`;
const Bar = styled.div`
	width: 50%;
	height: 30px;
	border-radius: 2rem;
	background-color: #e0de1b;
	position: absolute;
	left: 7px;
	top: 5px;
	text-align: center;
	line-height: 30px;
	color: #2d2d2d;
`;

const MoreInfo = styled.div`
	width: 100%;
	height: auto;
	> p {
		font-size: 12px;
		width: 40px;
		height: 20px;
		background-color: #01010194;
		color: #fff;
	}
`;

function TaskInfo() {
	const [more, setMore] = useState(false);
	const moreButton = () => setMore(true);
	const closeButton = () => setMore(false);
	//const taskStep = 20;
	return (
		<TaskInformation>
			<Progress>
				<Bar>{"task"}</Bar>
			</Progress>
			{/* <button onClick={moreButton}>추가 정보 표시</button>
			<MoreInfo className={more}>
				<h5>업무 관련 자세한 정보</h5>
				<p onClick={closeButton}>닫기</p>
				<ul>
					<li>업무 정보 1</li>
					<li>업무 정보 2</li>
					<li>업무 정보 3</li>
				</ul>
			</MoreInfo> */}
		</TaskInformation>
	);
}

export default TaskInfo;
