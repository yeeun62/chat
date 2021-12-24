import React from "react";
import styled from "styled-components";

const TaskInformation = styled.div`
	height: 6%;
	padding: 0rem 2rem;
	text-align: center;
	background-color: #2d2d2d;
`;

const Progress = styled.div`
	height: 80%;
	background-color: #fffeb3;
	margin: 4px auto;
	border-radius: 2rem;
	position: relative;
`;

const Bar = styled.div`
	width: 50%;
	height: 80%;
	border-radius: 1.3rem;
	background-color: #e0de1b;
	position: absolute;
	left: 1%;
	top: 10%;
	text-align: center;
	line-height: 25px;
	color: #2d2d2d;
	font-weight: bold;
`;

function TaskInfo() {
	return (
		<TaskInformation>
			<Progress>
				<Bar>{"이만큼 진행해따,,"}</Bar>
			</Progress>
		</TaskInformation>
	);
}

export default TaskInfo;
