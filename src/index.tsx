import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_PATH, TOKEN } from "./api/const";

import "./index.scss";

const client = new ApolloClient({
  uri: API_PATH,
  headers: {
    authorization: `bearer ${TOKEN}`,
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
