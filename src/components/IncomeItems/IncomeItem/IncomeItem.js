import classes from "./IncomeItem.module.css";

const incomeItem = props => {
    return (
        <div className={classes.Item}>
            <p>{props.desc}:</p>
            <p>Rs. {props.value}</p>
            <span className={classes.remove} onClick={props.remove}>remove</span>
        </div>
    );
}

export default incomeItem;