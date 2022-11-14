import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import FilmList from '../components/FilmList';
import { MockedProvider} from "@apollo/client/testing";
import { SEARCH_FILMS } from '../queries/filmQueries';
import { Provider } from 'react-redux';
import store from '../redux/store';
import React from 'react';
import { NativeBaseProvider} from 'native-base';

const mocks=  [
  {
    request: {
      query: SEARCH_FILMS,
      variables: {
        limit: 8,
        offset:0 ,
        titleFilter: "",
        genreFilter: "",
        yearFilter: 0,
        sorting: 1

      }
    },
    result: {
      data: {
        getFilteredPosts: [{"_id":"63453c374d8655244d2aa472","title":"After Dark in Central Park","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa473","title":"Boarding School Girls' Pajama Parade","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa474","title":"Buffalo Bill's Wild West Parad","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa475","title":"Caught","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa476","title":"Clowns Spinning Hats","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa477","title":"Capture of Boer Battery by British","year":1900,"cast":[],"genres":["Short","Documentary"]},
        {"_id":"63453c374d8655244d2aa478","title":"The Enchanted Drawing","year":1900,"cast":[],"genres":[]},
        {"_id":"63453c374d8655244d2aa479","title":"Feeding Sea Lions","year":1900,"cast":["Paul Boyton"],"genres":[]},
      ]
      }
    }
  }
];

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

/** 
* Test for loading page
*/
it("renders without error", async () => {
  render(
    <NativeBaseProvider initialWindowMetrics={inset}>
    <Provider store = {store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <FilmList />
    </MockedProvider>
    </Provider>
    </NativeBaseProvider>
  );
  
 expect(await screen.findByText("Loading...")).toBeInTheDocument();  
});

/** 
* Test for error handling in UI
*/
it("should show error UI", async () => {

  const filmMock = {
    request: {
      query: SEARCH_FILMS,
      variables: { 
        limit: 8,
        offset:0 ,
        titleFilter: "",
        genreFilter: "",
        yearFilter: 0,
        sorting: 1
       }
    },
    error: new Error("Something went wrong when trying to connect to the server...")
  };

  render(
    <NativeBaseProvider initialWindowMetrics={inset}>
    <Provider store={store}>
    <MockedProvider mocks={[filmMock]} addTypename={false}>
      <FilmList />
    </MockedProvider>
    </Provider>
    </NativeBaseProvider>
  );
  
  expect(await screen.findByText("Something went wrong when trying to connect to the server...")).toBeInTheDocument();

});

/** 
* Test for rendering films
*/
it("should render films", async () => {
  
  render(
    <NativeBaseProvider initialWindowMetrics={inset}>
    <Provider store={store}>
    <MockedProvider mocks={mocks} addTypename={false}>
      <FilmList  />
    </MockedProvider>
    </Provider>
    </NativeBaseProvider>
  );
  
 expect(await screen.findByText("After Dark in Central Park")).toBeInTheDocument();
});

/** 
* Snapshot test for FilmList component
*/
describe("Jest Snapshot testing suite",  () => {
  it("Matches DOM Snapshot",   async () => {
    const domTree = render(
    <NativeBaseProvider initialWindowMetrics={inset}><MockedProvider mocks = {mocks}><Provider store={store}>
    <FilmList /></Provider></MockedProvider></NativeBaseProvider>)
    
    await screen.findByText('After Dark in Central Park');
    expect(domTree).toMatchSnapshot()

    
  });
});

  

  

