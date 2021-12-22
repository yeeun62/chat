import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";


const Header = styled.div `
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
		padding: auto 0;
		box-shadow: inset -3px -3px 5px #ddd;

		> h1 {
			font-size: 30px;
			font-weight: 500;
			width: 100px;
			height: 60px;
			line-height: 60px;
			text-align: center;
			margin: auto 10px;
			text-overflow: ellipsis;
		}

		> form {
			width: calc(100%-130px);
			height: 30px;
			margin: 15px 0;

			> input {
				width: 20vw;
				height: 30px;
				margin: 15px 10px 15px 0;
			}
	
			> button img {
				width: 30px;
				height: 30px;
				
			}
		}
	`

const Convinience = styled.div `
	font-size: 30px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	margin: auto 10px;
	width: 30px
`
function ChatHeader({ chatData }) {
	const [keyword, setKeyword] = useState("");
	const keywordHandler = (e) => {
		setKeyword(e.target.value);
	};
	const searcher = (e) => {
		//axios.get('',)
	};

	return (
		<Header>
			<h1>{chatData.title}title</h1>
			<Convinience>🌞</Convinience>
			<form>
			<input
				className="searchInput"
				type="text"
				name="searchKeyword"
				onChange={keywordHandler}
			></input>
			<button type="button" onClick={() => searcher(keyword)}>
				<img className="searchButton" src="./img/search.png" alt="검색"></img>
			</button>
			</form>
		</Header>
	);
}

export default ChatHeader;
