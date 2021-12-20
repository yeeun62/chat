import React, { useState } from "react";

function ChatHeader() {
	const [view, setView] = useState(true);
	const viewHandler = () => {
		view ? setView(false) : setView(true);
	};

	return (
		<div>
			<h1>title</h1>
			<div>날씨??</div>
			<button className="search-button"></button>
			<div className="headerSearch">
				<input className="searchInput" type="text"></input>
			</div>
		</div>
	);
}

export default ChatHeader;
