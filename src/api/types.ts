export interface QueryData {
  search?: {
    repositoryCount?: number;
    pageInfo?: {
      hasNextPage?: boolean;
      endCursor?: "string";
    };
    nodes?: ISearchResultItem[];
  };
}

export interface ISearchResultItem {
  id: string;
  name: string;
  description: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  stargazers: IStargazers;
}

interface IStargazers {
  totalCount: number;
}
