import React from 'react';
import cl from "./Tag.module.css"

const Tag = ({children, ...props}) => {

    return (
        <div className={cl.checkbox__wrapper__4}>
            <input onClick={props.click} type="checkbox" id={props.id} className={cl.inp__cbx}></input>
            <label htmlFor={props.id} className={cl.cbx}>
                            <span><svg height="10px" width="12px"></svg>
                            </span><span>{children}</span></label>
            <svg className={cl.inline__svg}>
                <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
            </svg>
        </div>
    );
};

export default Tag;