import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({ uri: "http://localhost:8000/graphql/", cache: new InMemoryCache() });

// client
//   .query({
//     query: gql`
//       query actorMany {
//         actorMany {
//         Name,
//         _id
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
