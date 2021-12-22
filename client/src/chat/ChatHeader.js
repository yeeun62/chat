import React, { useState } from "react";
import axios from "axios";

function ChatHeader({ chatData, code }) {
	const [view, setView] = useState(true);
	const [keyword, setKeyword] = useState("");

	const viewHandler = () => {
		setView(!view);
	};

	const keywordHandler = (e) => {
		setKeyword(e.target.value);
	};

	const searcher = (e) => {
		//axios.get('',)
	};

	return (
		<div className="ChatHeader">
			<h1>{chatData.title}</h1>
			<div>맑음☀️</div>
			<button className="searchViewButton" onClick={viewHandler}>
				검색
			</button>
			{view ? (
				<div className="headerSearch">
					<input
						className="searchInput"
						type="text"
						name="searchKeyword"
						onChange={keywordHandler}
					></input>
					<button
						className="searchButton"
						onClick={() => searcher(keyword)}
					></button>
				</div>
			) : (
				<div className="headerSearch"></div>
			)}
		</div>
	);
}

export default ChatHeader;
