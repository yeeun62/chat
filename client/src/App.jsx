import Chat from "./chat/Chat";
import Create from "./Create.jsx";
import Invited from "./Invited";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import config from "./config";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		border: none;
		outline: none;
		list-style: none;
		text-decoration: none;
		box-sizing: border-box;
	}

	.background {
		height: 100vh;
		width: 100%;
		background: #e0de1b;
	}
	
	.inviteWrap {
		margin: 3rem auto;
		width: 30rem;
		height: auto;
	}

	.title{
		padding-top: 2rem;
		font-size: 1.3rem;
		text-align: center;
		font-weight: bold;
		color: #006495;
	}

	.form{
		display: flex;
		flex-direction: column;
		margin-top: 2rem;
		width: 85%;
		margin: 30px auto;
	}

	.inviteSection {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0.8rem 3.2rem;
	}

	.inviteTitle {
		color: #4b4b4b;
		font-size: 1rem;
		font-weight: bold;
	}

	.inviteInput {
		height: 2rem;
		border: none;
		border-radius: 0.2rem;
		padding-left: 0.4rem;
		font-weight: bold;
		background-color: #b8b513;

		&:focus {
			border: 2px solid #fffb16;
			background-color: #f1f0b4;
		}
	}

	.inviteButton {
		width: 7rem;
		height: 2.4rem;
		color: #3d3d3d;
		font-weight: bold;
		background-color: #b8b513;
	}

	button[type="button"],
	button[type="submit"],
	.handle-button,
	.handle-primary-button {
		margin: 1rem auto;
		width: 7rem;
		height: 2.4rem;
		display: inline-block;
		font-family: "GmarketSansLight", "Noto Sans TC", sans-serif;
		color: #282828;
		background-color: #b8b513;
		border: 1px solid #b8b513;
		border-bottom-left-radius: 7px;
		cursor: pointer;
		margin: 2rem auto;
	}
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Create />}></Route>
        <Route path="/chat/:code" element={<Chat />}></Route>
        <Route path="/chat/invited/:code" element={<Invited />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
