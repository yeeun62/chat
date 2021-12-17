const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
	})
);

app.get("/", (req, res) => {
	res.send("채팅서버");
});

app.listen(80, () => console.log("채팅 서버"));
