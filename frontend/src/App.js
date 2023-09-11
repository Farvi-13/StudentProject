import React, {useEffect, useState} from "react";
import {AuthContext} from "./context/AuthContext";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import Navbar from "./component/UI/Navbar/Navbar";
import "./styles/App.css"
import Footer from "./component/UI/Footer/Footer";

function App() {

    const [imdbId, setImdbId] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [jwt, setJwt] = useState('')
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true)
            setJwt(localStorage.getItem("jwt"));
            setUserId(parseInt(localStorage.getItem("userId")));
        }
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            jwt,
            setJwt,
            userId,
            setUserId,
            imdbId,
            setImdbId
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </AuthContext.Provider>
    )

}

export default App;
