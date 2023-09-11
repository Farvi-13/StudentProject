import React from 'react';
import cl from "./MyButton2.module.css";

const MyButton2 = ({children, ...props}) => {
    return (
        <button {...props} className={cl.btn2}>
            {children}
        </button>
    );
};

export default MyButton2;