import classes from "./SavedItem.module.css";

const savedItem = (props) => {
  return (
    <div className={classes.SavedItem}>
      <div>
        <p>Date Created: {props.date}</p>
        <p>Total: {props.total}</p>
      </div>
      <button onClick={props.showBudget}>show more</button>
    </div>
  );
};

export default savedItem;
