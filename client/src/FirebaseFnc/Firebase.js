import {
	getDatabase,
	set,
	ref,
	onValue,
	push,
	update,
} from "firebase/database";
import { useEffect } from "react";
import config from "../config";
import axios from "axios";

const Firebase = async () => {
	const db = getDatabase();
	const dbRef = ref(db, "chat");

	useEffect(() => {
		const starCountRef = ref(db, "chat");
		onValue(starCountRef, (snapshot) => {
			let chatData = snapshot.val();
			console.log(chatData);
		});
	}, []);

	const create = async () => {
		// const newdbRef = push(dbRef);
		// const chatId = newdbRef._path;

		// const member = ref(db, `${chatId}/member`);
		// const memberRef = push(member);

		// const uuid = await axios.get(process.env.REACT_APP_UUID, {
		// 	headers: {
		// 		"HANDLE-API-KEY": process.env.REACT_APP_HANDLE_API_KEY,
		// 	},
		// });
		// const time = Date.parse(new Date().toLocaleString()) / 1000;

		// let chat = {
		// 	room: { title: roomTitle, siteCode: uuid.data.data.uuid, regDate: time },
		// 	site: { name: siteName, color: "#E0DE1B", code: uuid.data.data.uuid },
		// };

		// set(newdbRef, chat);
		// set(memberRef, { userName, userPhoneNumber, userId });
		return "aa";
	};
};

export default Firebase.create;
