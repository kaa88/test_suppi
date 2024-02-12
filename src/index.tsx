import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_PATH } from "./api/const";

import "./index.scss";

const TOKEN = process.env.REACT_APP_TOKEN;
const decodedToken = TOKEN?.replace(/-=#\.\$/g, "");
const prefix = "ghp_";

const client = new ApolloClient({
  uri: API_PATH,
  headers: {
    authorization: `bearer ${prefix + decodedToken}`,
  },
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
