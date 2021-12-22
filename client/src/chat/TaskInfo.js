// progress bar 에 대한 정보 appjs에서 받아와야 함.
import "bootstrap/dist/css/bootstrap.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";

function TaskInfo() {
	return (
		<div className="TaskInfo">
			<h1 className="taskName">업무 관련 정보들</h1>
			<ProgressBar now={20}></ProgressBar>
		</div>
	);
}

export default TaskInfo;
