import { ComponentProps } from "react";
import classes from "./Button.module.scss";

const Button = ({
  className = "",
  children,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button className={`${className} ${classes.button}`} {...props}>
      {children}
    </button>
  );
};
export default Button;
