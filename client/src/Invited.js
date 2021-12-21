function Invited ({invitedHandler, invitedRoom}) {
    return (
        <div className="Invited">
            <form onSubmit={(e) => e.preventDefault()}>
                <input id="userName" className="formInvited" onChange={(e) => {invitedHandler(e, 'userName')}}></input>
                <label forHTML="userName">user name</label>

                <input id="userPhoneNumber" className="formInvited" onChange={(e) => {invitedHandler(e, 'userPhoneNumber')}}></input>
                <label forHTML="userPhoneNumber">user phone number</label>

                <input id="userId" className="formInvited" onChange={(e) => {invitedHandler(e, 'userId')}}></input>
                <label forHTML="userId">user id</label>

                <button className="invitedButton" onClick={invitedRoom} >초대 채팅방 참여</button>
            </form>
        </div>
    )
}

export default Invited;