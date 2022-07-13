import React, { useContext } from 'react';
import classes from './Navbar.module.css'
import MyButton from '../button/MyButton';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

import MyLink from '../link/MyLink';
import { useEffect } from 'react';

const Navbar = () => {
  const {store} = useContext(Context)

  useEffect( () => {
    if (localStorage.getItem('token')) {
        store.checkAuth()
    }
  }, [])

  if (store.isAuth) {
    return (
        <div className={classes.navbar}>
          <div className={classes.navContainer}>
            <div className={classes.navLogo}>
              Sendme
            </div>
            <div className={classes.navLinks}>
              <MyLink to=''>Tweets</MyLink>
              <MyLink to='/me'>My Tweets</MyLink>
              <MyLink to='/profile'>Profile</MyLink>
            </div>
            <div className={classes.navAuth}>
            <MyButton onClick={() => store.logout()}>Log Out</MyButton>
            </div>

        </div>
      </div>
    );    
  }else {
    return (
        <div className={classes.navbar}>
          <div className={classes.navContainer}>
            <div className={classes.navLogo}>
              Sendme
            </div>

            <div className={classes.navLinks}>
              <MyLink to='/tweets'>Tweets</MyLink>

            </div>

            <div className={classes.navAuth}>
              <MyLink to='/registration'>Registration</MyLink>
              <MyLink to='/login'>Log in</MyLink>
              
            </div>

          </div>
      </div>
    );    
  } 
};


export default observer(Navbar);