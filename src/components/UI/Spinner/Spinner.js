import classes from "./Spinner.module.css";

const spinner = () => {
  return (
      <div class={classes.lds}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
  );
};

export default spinner;
