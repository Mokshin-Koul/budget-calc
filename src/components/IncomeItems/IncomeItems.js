import classes from "./IncomeItems.module.css";
import IncomeItem from './IncomeItem/IncomeItem';

const incomeItems = props => {

    let incomeItems = props.items.map((current,index) => {
        return <IncomeItem key={current} desc={props.desc[index]} value={current} remove={() => props.remove(current,props.desc[index])}/>
    });

    return (
        <div className={classes.IncomeItems}>
            {incomeItems}
        </div>
    );
}

export default incomeItems;