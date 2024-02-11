import { ChangeEvent, ComponentProps, FormEvent, useState } from "react";
import classes from "./Form.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface FormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
  onSubmit?: (value: string) => void;
}

const Form = ({ className = "", onSubmit, ...props }: FormProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit(inputValue);
  };

  return (
    <form
      {...props}
      className={`${className} ${classes.form}`}
      onSubmit={handleSubmit}
    >
      <Input value={inputValue} onChange={handleInputChange} />
      <Button>Search</Button>
    </form>
  );
};
export default Form;
