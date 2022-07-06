import React from 'react';
import classes from './MyLink.module.css'
import { Link } from 'react-router-dom';

const MyLink = ({children, ...props}) => {
    return (
        <Link {...props}  className={classes.myLink}>{children}</Link>
    );
};

export default MyLink;