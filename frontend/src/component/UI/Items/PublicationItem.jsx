import React from 'react';
import cl from "../ItemsStyles/PublicationItem.module.css"
import {useNavigate} from "react-router-dom";

const PublicationItem = (publication) => {

    const navigate = useNavigate()
    const openPublication = () => {
        navigate(`/publications/${publication.publication.imdbId}`)
    }

    return (
        <div onClick={openPublication} className={cl.publication}>
            <div className={cl.content}>
                <h2 className={cl.title}>
                    {publication.publication.title}
                </h2>
                <div className={cl.description}>
                    {publication.publication.description.substring(0, 400).concat('...')}
                </div>
                <div className={cl.publ__footer}>
                    <div>Опубліковано:{publication.publication.date}</div>
                    <div>Переглядів:{publication.publication.views}</div>
                </div>
            </div>
        </div>
    );
};

export default PublicationItem;