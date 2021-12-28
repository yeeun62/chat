import { useState } from "react";
import styled from "styled-components";
import searchButton from "../img/search.png";

const Header = styled.div`
	width: 100%;
	height: 7%;
	background-color: #2d2d2d;
	display: flex;
	justify-content: space-between;
	padding: 0rem 2rem;

	> p {
		font-weight: bold;
		font-size: 1.2rem;
		margin: auto 0;
		color: #e0de1b;
	}

	> div {
		width: calc(100% / 3);
		display: flex;
		justify-content: flex-end;
		overflow: hidden;
		align-items: center;

		.searchInput {
			position: relative;
			height: 1.9rem;
			background-color: #686868;
			border-radius: 0.4rem;
			color: #2d2d2d;
			padding-left: 0.2rem;
		}

		.searchImg {
			position: absolute;
			width: 2rem;
			cursor: pointer;
		}
	}
`;

const Convenience = styled.div`
	font-size: 30px;
	text-align: center;
`;

function ChatHeader({ chat, searchHandler }) {

	return (
		<Header>
			{chat ? (
				<>
					<p>{chat.room.title}</p>
					<Convenience>🌤</Convenience>
					<div>
						<input className="searchInput" type="text" onChange={e => searchHandler(e)}/>
						<img className="searchImg" src={searchButton} alt="검색"/>
					</div>
				</>
			) : (
				<p>로딩중~</p>
			)}
		</Header>
	);
}

export default ChatHeader;
