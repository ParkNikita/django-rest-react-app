import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Context } from '..';
import { publicRoutes } from '../router';


const AppRouter = () => {
    const {store} = useContext(Context);

    return (
        <div>
            <Routes>
                {publicRoutes.map(route=>
                    <Route
                    path={route.path}
                    element={route.component}
                    exact={route.exact}
                    key={route.path}
                    />
                )}
            </Routes>     
           
        </div>
    );
};

export default AppRouter;