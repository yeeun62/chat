import axios from 'axios';
import {useEffect, useState} from 'react';

function Conversation () {

    let logDate = (time) => {
        let date = new Date(time * 1000);
        let year = date.getFullYear().toString().slice(-4);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hour = ("0" + date.getHours()).slice(-2);
        let minute = ("0" + date.getMinutes()).slice(-2);
        let returnDate = `${month}월 ${day}일 ${hour}시${minute}분`;
        return returnDate;
    };


    return (
        <div className='Conversation'>
            <div className="chatWrapper">
                <div></div>
            </div>
        </div>
    )
}

export default Conversation;