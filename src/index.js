import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({ uri: "http://localhost:8000/graphql/", cache: new InMemoryCache() });

// const test = "Matt Damon"
// client
//   .query({
//     query: gql`
//         mutation {
//             actorUpdateById(_id:"606b4a0f86b9b68d59f576e5", record: {Name: "${test}"}) {
//             record{
//                 Name,
//                 _id
//             }
//         }
//     }
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
