import NavigationItem from './NavigationItem/NavigationItem';
import classes from './navigationItems.module.css';

const navItems = props => {
    return (
        <div className={classes.Items}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {props.auth ? <NavigationItem link="/saved">Saved</NavigationItem> : null}
            {props.auth ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem>}
        </div>
    );
}

export default navItems;