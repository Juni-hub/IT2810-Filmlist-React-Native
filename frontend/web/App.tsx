import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { NativeRouter, Route, Routes } from 'react-router-native';

import FilmList from './components/FilmList';
import { NativeBaseProvider } from 'native-base';
import { Provider } from "react-redux";
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import fetch from 'cross-fetch';
import { relayStylePagination } from "@apollo/client/utilities";
import store from "./redux/store";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://it2810-34.idi.ntnu.no:8080/graphql', fetch }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          films: relayStylePagination(),
        },
      },
    },
  }),
})

export default function App() {
  return (
    <NativeBaseProvider>
    <ApolloProvider client={client}>
    <Provider store = {store}>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<FilmList />} />
          </Routes>
        </NativeRouter>
        </Provider>
      </ApolloProvider>
      </NativeBaseProvider>
  );
}



/**
 * 
 * const { Paragraph } = Typography;

          <PageHeader
            className="site-page-header m-4"
            title="The film database"
          >
            <>
            <Paragraph
            style={{fontSize: 18}}>
              The database shows a selection of films released from 1900 to the present day. 
              Each film is described with its title, year of release, cast and genre. 
              It is possible to find a desired movie by filtering on one or a combination of these values. 
              Furthermore, it is possible to sort the data in ascending or descending order by its year of release. 
              It is also possible for the user to add their own films to the database.
            </Paragraph>
            </>
          </PageHeader>
 */