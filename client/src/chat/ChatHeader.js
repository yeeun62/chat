import React, { useState } from "react";
import styled from "styled-components";
import searchButton from '../img/search.png'


const Header = styled.div`
	width: 100%;
	height: 60px;
	border-bottom: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	padding: auto 0;
	overflow: hidden;
	/* box-shadow: inset -3px -3px 5px #ddd; */

	> h1 {
		font-weight: 600;
		width: calc(100%/3);
		height: 60px;
		line-height: 60px;
		text-align: left;
		margin: auto 10px;
		text-overflow: ellipsis;
		@media screen and (max-width: 500px) {
			font-size: 20px;
			font-weight: 600;
		}
		@media screen and (min-width: 500px) {
			font-size: 30px;
			font-weight: 600;
		}
	}

	> form {
		width: calc(100%/3);
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		overflow: hidden;
		align-items: center;
		
		.searchInput {
			width: 20vw;
			height: 30px;
			border-bottom: 2px solid #666;
			margin: 15px 5px;

			@media screen and (max-width: 500px) {
				width: 20vw;
			}
		}

		> button {
			background-color: transparent;
			border: none;
			margin: 15px 0;
			width: 50px;

			> img {
				width: 30px;
				height: 30px;
			}
		}
	}
`;

const Convinience = styled.div`
	font-size: 30px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	margin: auto 10px;
	width: calc(100%/3);
`;

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
			<h1>{chatData.title}</h1>
			<Convinience>🌞</Convinience>
			<form>
				<input
					className="searchInput"
					type="text"
					name="searchKeyword"
					onChange={keywordHandler}
				></input>
				<button type="button" onClick={() => searcher(keyword)}>
					<img className="searchButton" src={searchButton} alt="검색"></img>
				</button>
			</form>
		</Header>
	);
}

export default ChatHeader;
