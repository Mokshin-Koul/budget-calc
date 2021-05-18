import classes from './toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
    return (
        <header className={classes.Header}>
            <NavigationItems auth={props.auth}/>
        </header>
    );
}

export default toolbar;