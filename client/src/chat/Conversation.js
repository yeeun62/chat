import { CopyToClipboard } from "react-copy-to-clipboard";

function Conversation({ chatData, code }) {
	let logDate = (time) => {
		let date = new Date(time * 1000);
		let year = date.getFullYear().toString().slice(-4);
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);
		let returnDate = `${month}월 ${day}일 ${hour}시${minute}분`;
		return returnDate;
	};

	return (
		<>
			<div>
				<ul>
					<li>
						{chatData.member.length ? (
							chatData.member.map((el) => {
								return Object.values(el).map((user, i) => {
									return (
										<div key={Object.keys(el)[i]} className="userNameTaskInfo">
											{user.userName}
										</div>
									);
								});
							})
						) : (
							<p>로딩중~</p>
						)}
					</li>
				</ul>
				<CopyToClipboard text={`http://localhost:3000/chat/invited/${code}`}>
					<button>초대링크 복사</button>
				</CopyToClipboard>
			</div>
			<div className="Conversation">
				<div className="chatWrapper">
					<div>{logDate(chatData.createDate)}</div>
				</div>
			</div>
		</>
	);
}

export default Conversation;
