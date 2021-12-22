import React, { useState } from "react";
import axios from "axios";
import "./chatHeader.css";

function ChatHeader({ chatInfo }) {
	const [keyword, setKeyword] = useState("");
	const keywordHandler = (e) => {
		setKeyword(e.target.value);
	};
	const searcher = (e) => {
		//axios.get('',)
	};

	return (
		<div className="ChatHeader">
			<h1>{chatData.title}</h1>
			<div className="convinience">🌞</div>
			<input
				className="searchInput"
				type="text"
				name="searchKeyword"
				onChange={keywordHandler}
			></input>
			<button onClick={() => searcher(keyword)}>
				<img className="searchButton" src="./img/search.png" alt="검색"></img>
			</button>
		</div>
	);
}

export default ChatHeader;
