// progress bar 에 대한 정보 appjs에서 받아와야 함.
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./taskInfo.css";

function TaskInfo({ chatInfo }) {
	return (
		<div className="TaskInfo">
			<h1 className="taskName">현재 진행 중인 업무 표시</h1>
			{/* <ProgressBar now={20}></ProgressBar> */}
			<div class="progress">
				<div class="progress-bar">
					<div class="progress-value">80%</div>
				</div>
			</div>
		</div>
	);
}

export default TaskInfo;
