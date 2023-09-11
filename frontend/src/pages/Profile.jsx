import React, {useContext, useEffect, useState} from 'react';
import cl from "./pagesStyles/Profile.module.css";
import ProfilePicture from "./pagesSource/ProfilePicture.jpg";
import gitPicture from "./pagesSource/git_icon.png";
import linkedInPicture from "./pagesSource/linkedin_icon.png";
import telegramIcon from "./pagesSource/telegramIcon.png"
import {useFetching} from "../hooks/useFetching";
import {AuthContext} from "../context/AuthContext";
import Loader from "../component/UI/Loader/Loader";
import PublicationItem from "../component/UI/Items/PublicationItem";
import ProfileService from "../API/ProfileService";
import {useNavigate} from "react-router-dom";
import MyModal from "../component/UI/MyModal/MyModal";
import PublicationService from "../API/PublicationService";
import MyInput from "../component/UI/MyInput/MyInput";
import {useInput} from "../utils/ustils";


const Profile = () => {

    const [myPublications, setMyPublications] = useState([]);
    const [myInfo, setMyInfo] = useState({});
    const [select, setSelect] = useState('Мої Проекти')
    const {jwt, userId, setIsAuth, setUserId, setJwt} = useContext(AuthContext);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
    const [settings, setSettings] = useState(false)
    const [isResume, setIsResume] = useState(false)
    const [social, setSocial] = useState({
        Telegram: '', LinkedIn: '', GitHub: ''
    })

    const email = useInput('', {minLength: 3, isEmpty: true, isEmail: true})
    const newPassword = useInput('', {minLength: 3, isEmpty: true, maxLength: 21})
    const passwordCheck = useInput('', {isEmpty: true, passwordCheck: newPassword.value})
    const firstname = useInput('', {minLength: 3, isEmpty: true, maxLength: 21})
    const lastname = useInput('', {minLength: 3, isEmpty: true, maxLength: 21})


    const [fetchUser, isUserLoading, userError] = useFetching(
        async () => {
            const resume = await PublicationService.isResume(userId, jwt)
            setIsResume(resume.data)
            const response = await ProfileService.getCurrentUser(userId, jwt);

            if (typeof response.data === 'string' && response.data?.includes("JWT expired at")) {
                localStorage.removeItem("auth")
                localStorage.removeItem("jwt")
                localStorage.removeItem("userId")
                setJwt('')
                setUserId(0)
                setIsAuth(false)
                navigate("/login");
            } else {
                setMyInfo(response.data);
            }
        }
    )

    const [fetchPublications, isPublicationLoading, publicationError] = useFetching(
        async () => {

            let response;

            if (select.includes("Мої Проекти")) {
                response = await ProfileService.getOwnerPublications(userId, jwt);
            } else {
                response = await ProfileService.getMyReviews(userId, jwt);
            }

            if (typeof response.data === 'string' && response.data?.includes("JWT expired at")) {

                localStorage.removeItem("auth")
                localStorage.removeItem("jwt")
                localStorage.removeItem("userId")
                setJwt('')
                setUserId(0)
                setIsAuth(false)
                navigate("/login");

            } else {
                setMyPublications(response.data.reverse());
            }
        }
    )

    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        fetchPublications();
    }, [select])

    const click = (e) => {
        setSelect(e.target.outerText)
    }

    const updateSocials = async (e) => {
        const contacts = []
        setModal(false)
        if (social.Telegram.length) {
            contacts.push({messangerName: "Telegram", messangerCode: social.Telegram, user_id: userId})
        }
        if (social.GitHub.length) {
            contacts.push({messangerName: "GitHub", messangerCode: social.GitHub, user_id: userId})
        }
        if (social.LinkedIn.length) {
            contacts.push({messangerName: "LinkedIn", messangerCode: social.LinkedIn, user_id: userId})
        }
        const response = await ProfileService.setContacts(contacts, jwt);
        console.log("RESPONSE:", response)
        window.location.reload()
    }

    const goToResume = () => {
        navigate("/resume/add")
    }

    return (
        <div className={cl.wrapper}>

            <MyModal visible={modal} setVisible={setModal}>
                <div>
                    Telegram: <input
                        className={cl.inputContact}
                        onChange={e => setSocial({...social, Telegram: e.target.value})}
                        value={social.Telegram} />
                </div>
                <div>
                    LinkedIn: <input
                        className={cl.inputContact}
                        onChange={e => setSocial({...social, LinkedIn: e.target.value})}
                        value={social.LinkedIn} />
                </div>
                <div>
                    GitHub: <input
                        className={cl.inputContact}
                        onChange={e => setSocial({...social, GitHub: e.target.value})}
                        value={social.GitHub} />
                </div>
                <div>
                    <button className={cl.submitContacts} onClick={updateSocials}>Save changes</button>
                </div>
            </MyModal>

            <MyModal visible={settings} setVisible={setSettings}>
                <h2 style={{color: "snow"}}>Налаштування</h2>
                <div className={cl.changeFirstName}>
                    {(firstname.isDirty && firstname.minLengthError) &&
                        <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                    {(firstname.isDirty && firstname.maxLengthError) &&
                        <div style={{color: "white"}}>Довжина поля не може бути більше ніж 21!</div>}
                    <MyInput onChange={e => firstname.onChange(e)} onBlur={e => firstname.onBlur(e)}
                             value={firstname.value} name="firstname" placeholder="Змінити ім'я" type="text"/>
                </div>
                <div className={cl.changeLastName}>
                    {(lastname.isDirty && lastname.minLengthError) &&
                        <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                    {(lastname.isDirty && lastname.maxLengthError) &&
                        <div style={{color: "white"}}>Довжина поля не може бути більше ніж 21!</div>}
                    <MyInput onChange={e => lastname.onChange(e)} onBlur={e => lastname.onBlur(e)}
                             value={lastname.value} name="lastname" placeholder="Змінити прізвище" type="text"/>
                </div>
                <div className={cl.changeEmail}>
                    {(email.isDirty && email.minLengthError) &&
                        <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                    {(email.isDirty && email.emailError) &&
                        <div style={{color: "white"}}>Неккоректна email адреса!</div>}
                    <MyInput onChange={email.onChange} onBlur={e => email.onBlur(e)} value={email.value}
                             name="email" placeholder="Змінити Email" type="email"/>
                </div>
                <div className={cl.changePassword}>
                    {(newPassword.isDirty && newPassword.minLengthError) &&
                        <div style={{color: "white"}}>Довжина поля не може бути менше ніж 3!</div>}
                    {(newPassword.isDirty && newPassword.maxLengthError) &&
                        <div style={{color: "white"}}>Довжина поля не може бути більше ніж 21!</div>}
                    <MyInput onChange={e => newPassword.onChange(e)} onBlur={e => newPassword.onBlur(e)}
                             value={newPassword.value} name="password" placeholder="Новий пароль" type="password"/>
                </div>
                <div className={cl.confirmPassword}>
                    {(passwordCheck.isDirty && passwordCheck.passwordCheckError) &&
                        <div style={{color: "white"}}>Паролі не однакові!</div>}
                    {(passwordCheck.isDirty && passwordCheck.isEmpty) &&
                        <div style={{color: "white"}}>Поле не може бути пустим!</div>}
                    <MyInput onChange={passwordCheck.onChange} onBlur={e => passwordCheck.onBlur(e)}
                             value={passwordCheck.value} placeholder="Вкажіть старий пароль" type="password"/>
                </div>
            </MyModal>

            <div className={cl.leftSide}>
                <div className={cl.person}>
                    <img src={ProfilePicture} alt={"Profile Picture"}/>
                    {isUserLoading
                        ? <Loader/>
                        : <div className={cl.info}>
                            <p><b>{myInfo.firstname + ' ' + myInfo.lastname}</b></p>
                            <p><b>{myInfo.email}</b></p>
                            <p><b>{myInfo.phone}</b></p>
                        </div>
                    }

                    <div style={{justifySelf: "center", alignSelf: "center"}}>
                        <button className={cl.contactChange} onClick={e => setModal(true)}>Change socials</button>
                    </div>
                    <div style={{justifySelf: "center", alignSelf: "center"}}>
                        {myInfo.contacts?.map((contact, index) =>
                            (contact.messangerName.includes("Telegram")
                                && <img key={index}
                                    src={telegramIcon}
                                    title={contact.messangerCode}
                                    alt={contact.messangerCode}
                                />

                            )
                            ||
                            (contact.messangerName.includes("GitHub")
                                && <img key={index}
                                    src={gitPicture}
                                    title={contact.messangerCode}
                                    alt={contact.messangerCode}
                                />

                            )
                            ||
                            (contact.messangerName.includes("LinkedIn")
                                && <img key={index}
                                    src={linkedInPicture}
                                    title={contact.messangerCode}
                                    alt={contact.messangerCode}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className={cl.buttons}>
                    {
                        isResume
                            ? <button className={cl.button} onClick={goToResume}>Замінити резюме</button>
                            : <button className={cl.button} onClick={goToResume}>Заповнити резюме</button>
                    }
                    <button className={cl.button} onClick={e => setSettings(true)}>Налаштування</button>
                    <button className={[cl.button, cl.buttonR].join(' ')}>Вимкнути аккаунт</button>
                </div>
            </div>

            <div className={cl.rightSide}>
                <div className={cl.switcher}>
                    <div className={cl.radioInputs}>
                        <label className={cl.radio}>
                            <input type="radio" name="radio"/>
                            <span onClick={click} className={cl.name}>Мої Відгуки</span>
                        </label>
                        <label className={cl.radio}>
                            <input type="radio" name="radio"/>
                            <span onClick={click} className={cl.name}>Мої Проекти</span>
                        </label>
                    </div>
                </div>
                <div className={cl.results}>
                    {publicationError && <h1>Щось пішло не так</h1>}
                    {isPublicationLoading
                        && <Loader/>
                    }
                    {myPublications.length
                        ? myPublications.map((publication, index) =>
                            <PublicationItem key={index} publication={publication}/>)
                        : <h2 style={{color: "white"}}>Тут нічого нема(</h2>
                    }
                </div>
            </div>

        </div>
    );
};

export default Profile;