import {StyleSheet, View} from 'react-native';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { NativeRouter, Route, Routes } from 'react-router-native';
import FilmList from './components/FilmList';
import { NativeBaseProvider } from 'native-base';
import { Provider } from "react-redux";
import fetch from 'cross-fetch';
import { relayStylePagination } from "@apollo/client/utilities";
import store from "./redux/store";
import React from 'react';


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
          <View style={{backgroundColor: '#38405F', flex: 1, height: "100%"}}>
            <NativeRouter>
              <Routes>
                <Route path="/" element={<FilmList />} />
              </Routes>
            </NativeRouter>
          </View>
        </Provider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}

