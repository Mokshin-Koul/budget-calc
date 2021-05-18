import { NavLink } from 'react-router-dom';
import classes from './navigationItem.module.css';

const navItem = props => {
    return <NavLink to={props.link} activeClassName={classes.active} className={classes.normal} exact={props.exact}>{props.children}</NavLink>
}

export default navItem;