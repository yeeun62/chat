import React from "react";
import "./taskInfo.css";

function TaskInfo() {
	return (
		<div className="TaskInfo">
			<h1 className="taskName">현재 진행 중인 업무 표시</h1>
			{/* <ProgressBar now={20}></ProgressBar> */}
			<div className="progress">
				<div className="progress-bar">
					<div className="progress-value">80%</div>
				</div>
			</div>
		</div>
	);
}

export default TaskInfo;
