import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PublicationService from "../API/PublicationService";
import cl from "./pagesStyles/CurrentPublication.module.css"
import MyModal from "../component/UI/MyModal/MyModal";
import BacklinkingItem from "../component/UI/Items/BacklinkingItem";
import {AuthContext} from "../context/AuthContext";
import Loader from "../component/UI/Loader/Loader";


const CurrentPublication = () => {

    const {jwt, userId, isAuth, setJwt, setUserId, setIsAuth} = useContext(AuthContext);
    const params = useParams()
    const [publication, setPublication] = useState({})
    const [modal, setModal] = useState(false);
    const [isResume, setIsResume] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const navigate = useNavigate()
    const rootClasses = [cl.isAcces]

    const [fetchPublicationById, isLoading, isError] = useFetching(async (id) => {
        const response = await PublicationService.getById(params.id);
        console.log(response)
        if (isAuth) {
            const resume = await PublicationService.isResume(userId, jwt)
            if (resume?.response?.data.includes("JWT expired at")) {
                localStorage.removeItem("auth")
                localStorage.removeItem("jwt")
                localStorage.removeItem("userId")
                setJwt('')
                setUserId(0)
                setIsAuth(false)
            } else {
                setIsResume(resume.data)
                const owner = await PublicationService.isOwner(params.id, jwt);
                setIsOwner(owner.data === userId)
            }
        }
        if (isOwner || !isResume || !isAuth) {
            rootClasses.push(cl.noAcces)
            console.log(rootClasses)
        }
        setPublication(response.data)
    })


    useEffect(() => {
        fetchPublicationById(params.id);
    }, [])

    console.log(publication)

    return (

        <div className={cl.publication__wrapper}>
            <MyModal visible={modal} setVisible={setModal}>
                <BacklinkingItem imdbId={params.id}/>
            </MyModal>
            {isLoading
                ? <Loader/>
                : <>
                    <div className={cl.publication}>

                        <div className={cl.Title}>
                            {publication.title}
                        </div>

                        <div className={cl.description}>
                            {publication.description}
                        </div>

                        <div className={cl.footer}>
                            <div>Опубліковано: {publication.date}</div>
                            <div>Переглядів: {publication.views}</div>
                        </div>
                    </div>
                    <div className={cl.window}>
                        <h2 style={{padding: "10px"}}>Теги</h2>
                        <div className={cl.tags}>
                            {publication.requirements?.map(tag =>
                                <div className={cl.tag}>{tag}</div>
                            )}
                        </div>
                        <hr/>
                        <hr/>

                        {isOwner
                            && <div className={cl.noAcces}>Ви є власником</div>
                        }
                        {(!isResume && isAuth && !isOwner)
                            && <div className={cl.noAcces}>У вас немає резюме</div>
                        }
                        {!isAuth
                            && <div className={cl.noAcces}>Ви не авторизовані</div>
                        }
                        <div className={cl.buttons}>
                            <button
                                disabled={isOwner || !isResume || !isAuth}
                                onClick={() => setModal(true)}
                                className={cl.link}>Відгукнутися
                            </button>
                            <button
                                disabled={isOwner || !isResume || !isAuth}
                                onClick={() => setModal(true)}
                                className={cl.link}>Поскаржитись
                            </button>
                            <button className={cl.link}>Поділитись</button>
                        </div>
                    </div>

                </>
            }

        </div>
    );
};

export default CurrentPublication;