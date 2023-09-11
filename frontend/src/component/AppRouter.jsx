import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {privateRoutes, publicRoutes} from "../router/router";

function Loader() {
    return null;
}

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(rout =>
                    <Route key={rout.path} path={rout.path} element={rout.element}/>
                )}
                <Route path="/*" element={<Navigate to="/error"/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(rout =>
                    <Route key={rout.path} path={rout.path} element={rout.element}/>
                )}
                <Route path="/*" element={<Navigate to="/login"/>}/>
            </Routes>
    );
};

export default AppRouter;