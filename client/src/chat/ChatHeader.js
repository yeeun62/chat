import styled from "styled-components";
import searchButton from "../img/search.png";

const Header = styled.div`
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
		display: flex;
		flex-direction: row;
		overflow: hidden;

		.searchInput {
			width: 20vw;
			height: 30px;
			border-bottom: 2px solid #666;
			margin: 15px 5px;
		}

		> button {
			background-color: transparent;
			border: none;
			margin: 15px 0;
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
	width: 30px;
`;
function ChatHeader({ chat }) {
	return (
		<Header>
			{chat ? (
				<>
					<h1>{chat.room.title}</h1>
					<Convinience>🌞</Convinience>
					<form>
						<input
							className="searchInput"
							type="text"
							name="searchKeyword"
						></input>
						<button type="button">
							<img className="searchButton" src={searchButton} alt="검색"></img>
						</button>
					</form>
				</>
			) : (
				<p>로딩중~</p>
			)}
		</Header>
	);
}

export default ChatHeader;
