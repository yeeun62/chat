import React, { useState } from "react";
import axios from 'axios';

function ChatHeader() {
	const [view, setView] = useState(true);
	const [keyword, setKeyword] = useState('');

	const viewHandler = () => {
		view ? setView(false) : setView(true);
	};

	const keywordHandler = (e) => {
		setKeyword(e.target.value)
	}

	const searcher = (e) => {
		//axios.get('',)
	}

	return (
		<div className="ChatHeader">
			<h1>title</h1>
			<div>날씨??</div>
			<button className="searchViewButton" onClick={viewHandler}></button>
			{view ? (<div className="headerSearch">
				<input className="searchInput" type="text" name="searchKeyword" onChange={keywordHandler}></input>
				<button className="searchButton" onClick={() => searcher(keyword)}></button>
			</div>) : 
				<div className="headerSearch">
			</div>
			}
			
		</div>
	);
}

export default ChatHeader;