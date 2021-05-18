import classes from "./IncomeItem.module.css";

const incomeItem = props => {
    return (
        <div className={classes.Item}>
            <p>{props.desc}:</p>
            <p>Rs. {props.value}</p>
            <div onClick={props.remove}>
                <p>X</p>
                <p>Remove</p>
            </div>
        </div>
    );
}

export default incomeItem;