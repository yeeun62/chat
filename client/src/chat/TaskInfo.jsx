import styled from "styled-components";

const TaskInformation = styled.div`
	width: 96%;
	margin: auto;
	height: 7%;
	text-align: center;
	font-weight: 700;
	line-height: 20px;
	background-color: #2d2d2d;
	padding: auto 2rem;
	overflow: hidden;
	border-bottom: 1px slid #999 !important;
	display: flex;

	> select {
		margin: auto;
		width: 14%;
	}
`;

const Progress = styled.div`
	width: 80%;
	height: 70%;
	background-color: #fffeb3;
	margin: 1.05% auto;
	border-radius: 2rem;
	position: relative;
`;

const Bar = styled.div`
	width: 50%;
	height: 80%;
	border-radius: 2rem;
	background-color: #e0de1b;
	position: absolute;
	left: 7px;
	top: 10%;
	text-align: center;
	line-height: 30px;
	color: #2d2d2d;
	font-weight: 900;
`;

function TaskInfo({ translation }) {
	return (
		<TaskInformation>
			<Progress>
				<Bar>{"task"}</Bar>
			</Progress>
			<select onChange={(e) => translation(e.target.value, false)}>
				{/* <option value="choice">번역선택</option> */}
				<option value="kr">한국어</option>
				<option value="en">영어</option>
				<option value="jp">일본어</option>
				<option value="cn">중국어</option>
			</select>
		</TaskInformation>
	);
}
export default TaskInfo;
