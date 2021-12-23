import React from "react";
import styled from "styled-components";

const TaskInformation = styled.div `
	text-align: center;
	font-weight: 700;
	line-height: calc(100%-40px);
	.nowStep {
		@media screen and (max-width: 500px) {
			font-size: 14px;
		}
	}
	border-bottom: 1px slid #999 !important;
`

const Progress = styled.div `
	width: 90%;
	height: 40px;
	background-color: #eee;
	margin: 10px auto;
	border-radius: 2rem;
	position: relative;
`
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
	color: #fff;
	font-weight: 900;
` 


function TaskInfo() {
	//const taskStep = 20;
	return (
		<TaskInformation>
			<p className="nowStep">현재 진행 중인 업무의 단계 표시</p>
			<Progress>
				<Bar>{'task'}</Bar>
			</Progress>
		</TaskInformation>
	);
}

export default TaskInfo;
