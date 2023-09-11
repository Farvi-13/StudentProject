import React, {useContext, useEffect, useState} from 'react';
import cl from "./pagesStyles/CreatePublication.module.css"
import Tag from "../component/UI/Tags/Tag";
import PublicationService from "../API/PublicationService";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";


export const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(false);
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {

        for (const validation in validations) {
            switch (validation) {
                case "isEmpty":
                    value ? setEmpty(false) : setEmpty(true)
                    break
            }
        }

    }, [value])

    useEffect(() => {
        if (isEmpty) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty])

    return {
        isEmpty, inputValid
    }
}

export  const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBadResp = (value) => {
        setValue(value);
    }

    const onBlur = (e) => {
        setDirty(true);
    }

    return {
        value, onChange, onBlur, onBadResp, ...valid, isDirty
    }
}

const CreatePublication = () => {

    const title = useInput('', {isEmpty: true})
    const description = useInput('', {isEmpty: true})
    const [tags, setTags] = useState([])

    const {jwt, userId, setJwt, setUserId, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const changeTags = (e) => {
        console.log(e.target.id)
        console.log(e.target.checked)

        if (e.target.checked){
            setTags([...tags, e.target.id])
            console.log("PASSED")
        }
        else {
            const newFilter = tags.filter(t => t !== e.target.id)
            setTags(newFilter)
        }
    }


    const addPubl = async () => {
        try{
            const response = await PublicationService.createPublication(
                {
                    title: title.value,
                    description: description.value,
                    tags: tags
                },
                userId,
                jwt
            );
            if (typeof response.data === 'string' && response.data.includes("JWT expired at")){
                localStorage.removeItem("auth")
                localStorage.removeItem("jwt")
                localStorage.removeItem("userId")
                setJwt('')
                setUserId(0)
                setIsAuth(false)
                navigate("/login");
            }
            navigate("/publications");
            console.log(response)
        }catch (e){
            console.log(e)
        }
    }


    return (
        <div className={cl.wrapper}>
            <div className={cl.header}>
                <h1>Створення нової публікації!</h1>
            </div>
            <div className={cl.content}>
                <div className={cl.texts}>
                    <div className={cl.title}>
                        <h2 style={{marginLeft: '15px', marginBottom: '10px', marginTop: '10px'}}>
                            Вкажіть заголовок вашої публікації
                        </h2>
                        {(title.isDirty && title.isEmpty) &&
                            <div style={{color: "purple"}}>Поле не може бути пустим!</div>}
                        <input
                            onChange={title.onChange}
                            onBlur={title.onBlur}
                            placeholder="Type here..."
                            className={[cl.input, cl.input__title].join(' ')}
                            name="text" type="text"
                        />
                    </div>
                    <div className={cl.description}>
                        <h2 style={{marginLeft: '15px', marginBottom: '10px', marginTop: '10px'}}>Детально опишіть
                            публікацію!</h2>
                        {(description.isDirty && description.isEmpty) &&
                            <div style={{color: "purple"}}>Поле не може бути пустим!</div>}
                        <textarea
                            onChange={description.onChange}
                            onBlur={description.onBlur}
                            placeholder="Type here..."
                            className={[cl.input, cl.input__description].join(' ')}
                            name="text"/>
                    </div>
                </div>
                <div className={cl.tags}>
                    <h3>Програмування:</h3>
                    <div className={cl.tagsLangContainer}>
                        <div className={cl.tagsLang}>
                            <Tag click={changeTags} id="Java">Java</Tag>
                            <Tag click={changeTags} id="React.js">React.js</Tag>
                            <Tag click={changeTags} id="Angular.js">Angular.js</Tag>
                            <Tag click={changeTags} id="Node.js">Node.js</Tag>
                            <Tag click={changeTags} id="Python">Python</Tag>
                            <Tag click={changeTags} id="Assembler">Assembler</Tag>
                            <Tag click={changeTags} id="Kotlin">Kotlin</Tag>
                            <Tag click={changeTags} id="JavaScript">JavaScript</Tag>
                        </div>
                        <div className={cl.tagsLang}>
                            <Tag click={changeTags} id="Vue.js">Vue.js</Tag>
                            <Tag click={changeTags} id="Unreal">Unreal</Tag>
                            <Tag click={changeTags} id="Ruby">Ruby</Tag>
                            <Tag click={changeTags} id=".Net">.Net</Tag>
                            <Tag click={changeTags} id="C++">C++</Tag>
                            <Tag click={changeTags} id="GO">GO</Tag>
                            <Tag click={changeTags} id="C#">C#</Tag>
                            <Tag click={changeTags} id="C">C</Tag>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.submit}>
                <button
                    onClick={addPubl}
                    disabled={!title.inputValid || !description.inputValid}
                    className={[cl.bttn, cl.button].join(' ')}>
                    Створити!
                </button>
            </div>
        </div>
    );
};

export default CreatePublication;