import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NativeRouter, Route, Routes } from 'react-router-native';
import FilmList from './components/FilmList';
import { Provider } from "react-redux";
import { relayStylePagination } from "@apollo/client/utilities";
import store from "./redux/store";
import React from 'react';
import { NativeBaseProvider } from 'native-base';

const client = new ApolloClient({
  uri: 'http://it2810-34.idi.ntnu.no:8080/graphql', 
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