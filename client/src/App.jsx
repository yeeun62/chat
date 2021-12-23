import React, { useState, useEffect } from "react";
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
	
	.inviteWrap {
		margin: 3rem auto;
	width: 30rem;
	height: 80vh;
	background: #e0de1b;
	border-radius: 1rem;
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
	}

	.inviteSection {
		display: flex;
		justify-content: space-between;
		margin: 0.4rem 3.2rem;
	}

	.inviteTitle {
		color: #4b4b4b;
		font-size: 1.2rem;
		font-weight: bold;
	}

	.inviteInput {
		border: none;
		background-color: #b8b513;
		border-radius: 0.2rem;
	}

	.inviteButton {
		width: 7rem;
		height: 2.4rem;
		color: #3d3d3d;
		font-weight: bold;
		background-color: #b8b513;
		margin: 2rem auto;
	}

	button[type="button"],
	button[type="submit"],
	.handle-button,
	.handle-primary-button {
		margin: 2rem auto;
		width: 7rem;
		height: 2.4rem;
		display: inline-block;
		font-family: "GmarketSansLight", "Noto Sans TC", sans-serif;
		color: #282828;
		background-color: #b8b513;
		border: 1px solid #b8b513;
		border-bottom-left-radius: 7px;
	}
`;

function App() {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<Create />}></Route>
				<Route path="/chat/:code" element={<Chat />}></Route>
				<Route path="chat/invited/:code" element={<Invited />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
