import React, {useContext} from 'react';
import cl from "../ItemsStyles/BacklinkingItem.module.css"
import MyInput from "../MyInput/MyInput";
import {useInput} from "../../../pages/CreatePublication";
import MyButton from "../MyButton/MyButton";
import PublicationService from "../../../API/PublicationService";
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const BacklinkingItem = (params) => {

    const navigate = useNavigate()
    const message = useInput('', {isEmpty: true})
    const {jwt, userId} = useContext(AuthContext);
    const send = async (e) => {

        console.log(message.value, params.imdbId, userId, jwt)
        const response = await PublicationService.publicationApply(message.value, params.imdbId, userId, jwt)
        console.log(response);
        navigate(`/publications/${params.imdbId}`);
    }

    return (
        <form className={cl.backlinking__form}>
            {(message.isEmpty && message.isDirty) &&
                <div style={{color: "white"}}>Поле не може бути пустим</div>}
            <MyInput onBlur={message.onBlur}
                     onChange={message.onChange}
                     value={message.value} name="message"
                     placeholder="Введіть повідомленя..."
                     type="text"
            />
            <MyButton onClick={send} disabled={!message.inputValid}>Відправити</MyButton>
        </form>
    );
};

export default BacklinkingItem;