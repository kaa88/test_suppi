import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query getRepos($data: String!, $limit: Int!, $cursor: String) {
    search(type: REPOSITORY, query: $data, first: $limit, after: $cursor) {
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          description
          url
          createdAt
          updatedAt
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;
