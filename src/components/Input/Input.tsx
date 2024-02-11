import { ComponentProps } from "react";
import classes from "./Input.module.scss";

const Input = ({ className = "", ...props }: ComponentProps<"input">) => {
  return (
    <input type="text" className={`${className} ${classes.input}`} {...props} />
  );
};
export default Input;
