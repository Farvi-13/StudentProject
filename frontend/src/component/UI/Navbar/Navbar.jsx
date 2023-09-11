import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import cl from "./Navbar.module.css"
import logo from "./Logo.png"
import {AuthContext} from "../../../context/AuthContext";
import MyButton2 from "../MyButton/MyButton2";
import profButton from "./profButton.png";

const Navbar = () => {

    const {isAuth, setIsAuth, setJwt, setUserId} = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("auth")
        localStorage.removeItem("jwt")
        localStorage.removeItem("userId")
        setJwt('')
        setUserId(0)
        setIsAuth(false)
    }

    return (
        <div className={cl.navbar}>
            <div className={cl.content}>
                <div className={cl.logo}>
                    <Link to={"/"}>
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <div className={cl.links}>
                    <Link className={cl.link} to={"/publications"}>Проєкти</Link>
                    {isAuth
                        ?
                        <>
                            <Link className={cl.link} to={"/reviews"}>Відгуки</Link>
                            <Link className={cl.link} to={"/publications/add"}>Додати проект</Link>
                            <MyButton2 onClick={logout}>Вихід</MyButton2>
                            <Link to={"/profile"}>
                                <img src={profButton} alt="profile"/>
                            </Link>

                        </>
                        : <Link className={cl.link} to={"/registration"}>Sign in</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;