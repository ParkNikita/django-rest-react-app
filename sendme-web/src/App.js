import './App.css';
import {observer} from 'mobx-react-lite'
import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Context } from '.';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/navbar/Navbar';


function App() {

  return (

    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>

  )

}

export default observer(App);
