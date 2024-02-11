import { useEffect, useRef, useState } from "react";
import classes from "./App.module.scss";
import { useQuery } from "@apollo/client";
import { GET_REPOS } from "../../query/repo";
import { ISearchResultItem, QueryData } from "../../api/types";
import Form from "../Form/Form";
import SeachResultItem from "../SeachResultItem/SeachResultItem";

const fetchLimit = 10;

const App = () => {
  const [isPaginationActive, setIsPaginationActive] = useState(false);
  const defaultPaginagionCursor = "";
  const [paginationCursor, setPaginationCursor] = useState(
    defaultPaginagionCursor
  );

  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (value: string) => {
    if (inputValue === value) return;
    setInputValue(value);
    setSearchResult(defaultSearchResult);
    setPaginationCursor(defaultPaginagionCursor);
    refetch();
  };

  const isQueryActive = !!inputValue;

  const { data, loading, error, refetch } = useQuery<QueryData>(GET_REPOS, {
    skip: !isQueryActive,
    variables: {
      data: inputValue,
      limit: fetchLimit,
      cursor: paginationCursor || null,
    },
  });

  const defaultSearchResult: ISearchResultItem[] = [];
  const [searchResult, setSearchResult] = useState(defaultSearchResult);

  useEffect(() => {
    if (data?.search?.nodes) {
      setSearchResult(
        [...searchResult, ...data.search.nodes] || defaultSearchResult
      );
      setTimeout(() => {
        setIsPaginationActive(true);
      }, 1000);
    }
  }, [data]); // eslint-disable-line

  const fetchNextPage = () => {
    const hasNextPage = data?.search?.pageInfo?.hasNextPage;
    const cursor = data?.search?.pageInfo?.endCursor;
    if (hasNextPage && cursor) {
      setPaginationCursor(cursor);
      setIsPaginationActive(false);
    }
  };

  // Intersection
  const intersectionRef = useRef<HTMLDivElement>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      fetchNextPage();
    }
  };
  const intersectionOptions = {
    root: null,
    threshold: 1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      intersectionOptions
    );
    if (intersectionRef.current) observer.observe(intersectionRef.current);

    return () => {
      if (intersectionRef.current) observer.unobserve(intersectionRef.current); // eslint-disable-line
    };
  }, [intersectionRef, intersectionOptions]); // eslint-disable-line
  // /Intersection

  let message = "";
  if (loading) message = "Loading...";
  if (error) message = error.message;

  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <div className={classes.container}>
          <Form onSubmit={handleSubmit} />
          <p>Items found: {data?.search?.repositoryCount || 0}</p>
        </div>
      </header>

      <main className={classes.content}>
        <div className={classes.container}>
          {!!searchResult.length && (
            <>
              {searchResult.map((item, index) => (
                <SeachResultItem data={item} index={index} key={item.id} />
              ))}
              {isPaginationActive && <div ref={intersectionRef}></div>}
            </>
          )}
          <p className={classes.message}>{message}</p>
        </div>
      </main>
    </div>
  );
};

export default App;
