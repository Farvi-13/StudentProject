import React from 'react';
import cl from "./pagesStyles/NotFound.module.css"

const NotFound = () => {
    return (
        <div className={cl.main}>
            <div className={cl.fof}>
                <h1>Error 404. Not Found!</h1>
            </div>
        </div>
    );
};

export default NotFound;