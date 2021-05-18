import classes from "./Input.module.css";

const input = props => {

    switch(props.type) {
        case 'income': return <input type="text" placeholder="Income" className={classes.Income} onChange={props.changed} value={props.value}/>
        case 'expense': return <input type="text" placeholder="expense" className={classes.Expense} onChange={props.changed} value={props.value}/>
        default: return;
    }
}

export default input;