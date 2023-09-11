import React, {useContext, useEffect, useState} from 'react';
import cl from "./pagesStyles/FillResume.module.css"
import Tag from "../component/UI/Tags/Tag";
import MySelect from "../component/UI/MySelect/MySelect";
import {AuthContext} from "../context/AuthContext";
import resume from "./Resume";
import ReviewService from "../API/ReviewService";
import {wait} from "@testing-library/user-event/dist/utils";
import {useNavigate} from "react-router-dom";

const FillResume = () => {

    const [languages, setLanguages] = useState(["Англійська", "Українська", "Французька", "Німецька", "Італійська", "Іспанська", "Японська", "Корейська"]);
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"]
    const [currentLevelInSelect, setCurrentLevel] = useState('')
    const [currentLanguageInSelect, setCurrentLanguageInSelect] = useState('')
    const [isFormEmpty, setIsFormEmpty] = useState(true)
    const [process, setProcess] = useState(false);
    const {jwt, userId, setJwt, setUserId, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate();

    const [resume, setResume] = useState({
        fullName: '',
        age: '',
        aboutMe: '',
        goals: '',
        skills: [],
        languages: []
    })

    const changeTags = (e) => {
        if (e.target.checked) {
            const tags = resume.skills;
            tags.push(e.target.id)
            setResume({...resume, skills: tags})
        } else {
            const newFilter = resume.skills.filter(t => t !== e.target.id)
            setResume({...resume, skills: newFilter})
        }
    }

    useEffect(() => {
        if (resume.fullName.length
            && resume.age.length
            && resume.aboutMe.length
            && resume.goals.length
            && resume.skills.length
            && resume.languages.length) {
            setIsFormEmpty(false)
        } else {
            setIsFormEmpty(true)
        }
    }, [resume])

    const currentLanguage = (e) => {
        setCurrentLanguageInSelect(e)
    }

    const currentLevel = (e) => {
        setCurrentLevel(e);
    }

    const addSelectedLanguageWithLevel = (e) => {
        e.preventDefault()
        if (currentLanguageInSelect !== '' && currentLevelInSelect !== '') {
            const languageWithLevel = currentLanguageInSelect + ': ' + currentLevelInSelect;
            const languagesOnThisMoment = resume.languages;
            languagesOnThisMoment.push(languageWithLevel)
            setResume({...resume, languages: languagesOnThisMoment})
            const newLanguages = languages.filter(l => !l.includes(currentLanguageInSelect))
            setLanguages(newLanguages)
            setCurrentLanguageInSelect('')
            setCurrentLevel('')
        }
    }

    const saveResume = async (e) => {
        e.preventDefault()
        setProcess(true)
        const info = {
            ownerId: userId,
            fullName: resume.fullName,
            age: Number(resume.age),
            aboutMe: resume.aboutMe,
            goals: resume.goals,
            skills: resume.skills,
            languages: resume.languages
        }
        try {
            const response = await ReviewService.addResume(info, jwt)
            await wait(2100)
            setProcess(false)
            navigate("/profile")
        } catch (er) {
            console.log(er)
        }

    }

    return (
        <div className={cl.container}>
            <form className={cl.wrapper}>
                <label style={{alignSelf: "center", marginTop: "10px", fontSize: "20px"}}
                       htmlFor="skills">Персональне:</label>
                <div className={cl.person}>
                    <div className={cl.inputbox}>
                        <input
                            value={resume.fullName}
                            required="required"
                            type="text"
                            onChange={e => setResume({...resume, fullName: e.target.value})}
                        />
                        <span>Повне ім'я:</span>
                        <i></i>
                    </div>
                    <div className={cl.inputbox}>
                        <input
                            value={resume.age}
                            required="required"
                            type="number"
                            onKeyPress={e => !/^[0-9]{0,1}$/.test(e.currentTarget.value) && e.preventDefault()}
                            onChange={e => setResume({...resume, age: e.target.value})}
                        />
                        <span>Вік:</span>
                        <i></i>
                    </div>
                </div>
                <label style={{alignSelf: "center", marginTop: "10px", fontSize: "20px"}}
                       htmlFor="skills">Подробиці:</label>
                <div className={cl.form__group}>
                    <label htmlFor="aboutme">Про себе</label>
                    <textarea
                        value={resume.aboutMe}
                        onChange={e => setResume({...resume, aboutMe: e.target.value})}
                        required="required"
                        rows="5"
                        cols="9"
                        name="aboutme"
                        id="aboutme"
                    />
                </div>
                <div className={cl.form__group}>
                    <label htmlFor="goals">Цілі:</label>
                    <textarea
                        value={resume.goals}
                        onChange={e => setResume({...resume, goals: e.target.value})}
                        required="required"
                        rows="5"
                        cols="9"
                        name="goals"
                        id="goals"
                    />
                </div>
                <label style={{alignSelf: "center", marginTop: "10px", fontSize: "20px"}}
                       htmlFor="skills">Навички:</label>
                <div id="skills" className={cl.skills}>
                    <Tag click={changeTags} id="Java">Java</Tag>
                    <Tag click={changeTags} id="React.js">React.js</Tag>
                    <Tag click={changeTags} id="Angular.js">Angular.js</Tag>
                    <Tag click={changeTags} id="Node.js">Node.js</Tag>
                    <Tag click={changeTags} id="Python">Python</Tag>
                    <Tag click={changeTags} id="Assembler">Assembler</Tag>
                    <Tag click={changeTags} id="Kotlin">Kotlin</Tag>
                    <Tag click={changeTags} id="JavaScript">JavaScript</Tag>
                    <Tag click={changeTags} id="Vue.js">Vue.js</Tag>
                    <Tag click={changeTags} id="Unreal">Unreal</Tag>
                    <Tag click={changeTags} id="Ruby">Ruby</Tag>
                    <Tag click={changeTags} id=".Net">.Net</Tag>
                    <Tag click={changeTags} id="C++">C++</Tag>
                    <Tag click={changeTags} id="GO">GO</Tag>
                    <Tag click={changeTags} id="C#">C#</Tag>
                    <Tag click={changeTags} id="C">C</Tag>
                </div>
                <label style={{alignSelf: "center", marginTop: "20px", fontSize: "20px"}} htmlFor="skills">Володіння
                    мовами:</label>
                <div className={cl.languages}>
                    <div className={cl.selects}>
                        <MySelect
                            options={languages}
                            defaultValue={"Оберіть мову"}
                            onChange={currentLanguage}
                            value={currentLanguageInSelect}>
                        </MySelect>
                        <MySelect
                            options={levels}
                            defaultValue={"Оберіть рівень"}
                            onChange={currentLevel}
                            value={currentLevelInSelect}>
                        </MySelect>
                        <div className={cl.button_plus} onClick={addSelectedLanguageWithLevel}>
                            <div className={cl.plus}></div>
                        </div>
                    </div>

                    <div className={cl.selected}>
                        {resume.languages.length
                            ? resume.languages.map((language, index) => (
                                <div key={index} className={cl.language}>{language}</div>
                            ))
                            : <p style={{color: "red"}}>Додайте мову і рівень володіння нею!</p>
                        }
                    </div>
                </div>
                {
                    isFormEmpty
                        ? <div>Заповніть форму повністю, щоб з'явилася кнопка "Зберегти"</div>
                        : process
                            ?
                                <div className={cl.nendoveb__kubscupon}>
                                    <h3>Загрузка, пожалуйста подождите.</h3>
                                   <div className={cl.kacekagen__protsem}>
                                       <div className={cl.akemobvous}></div>
                                   </div>
                                </div>
                            : <button onClick={saveResume} className={cl.submit}>Зберегти</button>
                }

            </form>
        </div>
    );
};

export default FillResume;