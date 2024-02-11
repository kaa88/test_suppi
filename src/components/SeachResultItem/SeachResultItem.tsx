import { ComponentProps } from "react";
import classes from "./SeachResultItem.module.scss";
import { ISearchResultItem } from "../../api/types";

interface SeachResultItemProps extends ComponentProps<"div"> {
  data: ISearchResultItem;
  index: number;
}

const SeachResultItem = ({
  className = "",
  data,
  index,
  ...props
}: SeachResultItemProps) => {
  return (
    <div className={`${className} ${classes.wrapper}`} {...props}>
      <h3>
        <span className={classes.index}># {index + 1}</span>
        {data.name}
      </h3>
      <p className={classes.id}>ID: {data.id}</p>
      <p className={classes.descr}>Description: {data.description}</p>
      <a
        className={classes.link}
        href={data.url}
        target="_blank"
        rel="noreferrer"
      >
        {data.url}
      </a>
      <p className={classes.date}>Created at: {data.createdAt}</p>
      <p className={classes.date}>Updated at: {data.updatedAt}</p>
      <p className={classes.stargazers}>
        Stargazers: {data.stargazers.totalCount}
      </p>
    </div>
  );
};
export default SeachResultItem;
