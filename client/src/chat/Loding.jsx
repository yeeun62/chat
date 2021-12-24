import styled from "styled-components";

const LoadingWrap = styled.div`
	width: 100vw;
	height: 100%;
	background-color: #151719;
	display: flex;
	justify-content: center;
	align-items: center;

	.waviy {
		position: relative;
		-webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
	}

	.waviy span {
		position: relative;
		display: inline-block;
		color: #e0de1b;
		animation: waviy 1s infinite;
		animation-delay: calc(0.1s * var(--i));
		font-size: 5rem;
		font-weight: bold;
	}

	@keyframes waviy {
		0%,
		40%,
		100% {
			transform: translateY(0);
		}
		20% {
			transform: translateY(-20px);
		}
	}
`;

const Loding = () => {
	return (
		<LoadingWrap>
			<div className="waviy">
				{/* <span style={{ "--i": 1 }}>h</span>
				<span style={{ "--i": 2 }}>a</span>
				<span style={{ "--i": 3 }}>n</span>
				<span style={{ "--i": 4 }}>d</span>
				<span style={{ "--i": 5 }}>l</span>
				<span style={{ "--i": 6 }}>e</span> */}
				<span style={{ "--i": 1 }}>L</span>
				<span style={{ "--i": 2 }}>o</span>
				<span style={{ "--i": 3 }}>a</span>
				<span style={{ "--i": 4 }}>d</span>
				<span style={{ "--i": 5 }}>i</span>
				<span style={{ "--i": 6 }}>n</span>
				<span style={{ "--i": 8 }}>g</span>
				<span style={{ "--i": 9 }}>.</span>
				<span style={{ "--i": 10 }}>.</span>
			</div>
		</LoadingWrap>
	);
};

export default Loding;
