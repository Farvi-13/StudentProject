import React, {useContext, useEffect, useState} from 'react';
import cl from "./pagesStyles/Resume.module.css"
import {useFetching} from "../hooks/useFetching";
import ReviewService from "../API/ReviewService";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import Loader from "../component/UI/Loader/Loader";
import MyModal from "../component/UI/MyModal/MyModal";
import {logDOM} from "@testing-library/react";

const Resume = () => {

    const [resume, setResume] = useState({languages: [], skills: []})
    const [modal, setModal] = useState(false)
    const [number, setNumber] = useState('');
    const {jwt, imdbId, setJwt, setUserId, setIsAuth} = useContext(AuthContext);
    const params = useParams()
    const navigate = useNavigate()

    const [fetchResumeById, isLoading, isError] = useFetching(async () => {
        const response = await ReviewService.getResumeById(params.id, jwt)
        console.log(response)
        if (typeof response.data === 'string' && response.data?.includes("JWT expired at")) {
            console.log("IM HERE 1")
            localStorage.removeItem("auth")
            localStorage.removeItem("jwt")
            localStorage.removeItem("userId")
            setJwt('')
            setUserId(0)
            setIsAuth(false)
            navigate("/login");
        }
        console.log("IM HERE 2")
        setResume(response.data)
        const contacts = await ReviewService.getNumber(response.data.ownerId, jwt)
        setNumber(contacts.data)
    })

    useEffect(() => {
        fetchResumeById()
    }, [])

    const decline = async () => {
        const response = await ReviewService.declineReview(resume.ownerId, imdbId, jwt);
        console.log(response)
        navigate("/reviews");
    }

    return (

        <div className={cl.resume__wrapper}>
            <MyModal visible={modal} setVisible={setModal}>
                <h1 style={{color: "white"}}>Номер телефону:</h1>
                <h1 style={{color: "white"}}>{number}</h1>
            </MyModal>
            {isLoading
                ? <Loader/>
                :
                <div className={cl.resume}>
                    <div className={cl.header}>
                        <div>{resume.fullName}</div>
                        <div>{resume.age} років</div>
                    </div>
                    <div className={cl.description}>
                        <h5>Про себе:</h5> {resume.aboutMe}
                    </div>
                    <div className={cl.goals}>
                        <h5>Цілі:</h5> {resume.goals}
                    </div>
                    <div className={cl.skills}>
                        <h5>Навички: </h5>
                        {resume.skills.map(skill =>
                            <div className={cl.skill}>{skill}</div>
                        )}
                    </div>
                    <div className={cl.languages}>
                        <h5>Володіння мовами: </h5>
                        {resume.languages.map(l =>
                            <div className={cl.skill}>{l}</div>
                        )}
                    </div>
                    <div className={cl.buttons}>
                        <button onClick={e => setModal(true)} className={cl.link}>Контакти</button>
                        <button onClick={decline} className={cl.link}>Відхилити</button>
                        <button className={cl.link}>Поділитись</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Resume;