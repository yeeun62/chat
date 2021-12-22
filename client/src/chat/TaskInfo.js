import React from "react";
import styled from "styled-components";

const Progress = styled.div`
    width: 100%;
	height: 50px;
	background-color: rgba(225, 222, 27, 0.2);

    > div {
        //.progress
        height: 22px;
        background: #ddd;
        padding: 4px 8px;
        border-radius: 20px;
        border-bottom: 1px solid #edefee;
        margin-bottom: 70px;
        overflow: visible;
        border-top: 1px solid rgba(239, 241, 240, 0.7);
        border-bottom: 1px solid #a0a5a8;
        position: relative;
        animation: animate-positive 2s;
        border-top: 1px solid rgba(239, 241, 240, 0.7);
        position: relative;
        animation: animate-positive 2s;
        margin: auto;
    }
`
const Progressbar = styled.div `
    width: 80%;
	background: #e0de1b;
    border-radius: 20px;
	border-top: 1px solid rgba(239, 241, 240, 0.7);
	border-bottom: 1px solid #a0a5a8;
	position: relative;
	animation: animate-positive 2s;
`

const TaskName = styled.h1`
    font-size: 10px;
	text-align: center;
`

const ProgressValue = styled.div`
    font-size: 16px;
	font-weight: bold;
	color: #9fa3a6;
	border-radius: 4px;
	position: absolute;
	bottom: -60px;
	right: 0;
	padding: 5px 7px;
	background: #ccd0d3;
	border: 5px solid #b7bcbf;
	text-shadow: 0px 1px #edefee;

    &::before {
        content: "";
        border-bottom: 13px solid #b7bcbf;
        border-left: 13px solid transparent;
        border-right: 13px solid transparent;
        position: absolute;
        top: -13px;
        left: 22.5%;
    }

    &::after {
        content: "";
        border-bottom: 7px solid #ccd0d3;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        position: absolute;
        top: -6px;
        left: 35%;
    }
`

function TaskInfo({ chatInfo }) {
	return (
		<Progress>
			<TaskName>현재 진행 중인 업무 표시</TaskName>
			{/* <ProgressBar now={20}></ProgressBar> */}
			<Progressbar>
				<ProgressValue>80%</ProgressValue>
			</Progressbar>
		</Progress>
	);
}

export default TaskInfo;
