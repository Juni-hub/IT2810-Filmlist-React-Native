import '@testing-library/jest-dom'
import { render, screen, } from '@testing-library/react';
import {FilmCard} from '../components/FilmCard';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from "react-test-renderer";
import store from '../redux/store';

const film = {"_id":"63453c374d8655244d2aa472","title":"After Dark in Central Park",
"year":"1900","cast":[],"genres":[]}
const handleClick = jest.fn();

const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
/** 
* Test for loading card and that it shows correct information
*/
it("shows information about film" , async () => {
    render(
    <NativeBaseProvider initialWindowMetrics={inset}>
    <Provider store={store}>
      <FilmCard film={film} handleClick={handleClick}/>
    </Provider>
    </NativeBaseProvider>
  );
  expect(await screen.getByTestId("title")).toHaveTextContent("After Dark in Central Park");
  expect(await screen.getByTestId("year")).toHaveTextContent("Year Released: 1900");
});

/** 
* Test for that it opens a filmitem when clicked on
*/
it("runs handleClick function when clicked on" , async () => {
  const card = render(
  <NativeBaseProvider initialWindowMetrics={inset}>
  <Provider store={store}>
    <FilmCard film={film} handleClick={handleClick}/>
  </Provider>
  </NativeBaseProvider>
);
  card.getByText("After Dark in Central Park").click();
  expect(handleClick.mock.calls.length).toBe(1);
});

/** 
* Snapshot test for loading card
*/
describe("Jest Snapshot testing suite",  () => {
    it("Matches DOM Snapshot",   () => {
      const domTree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}><Provider store={store}>
      <FilmCard film={film} handleClick={handleClick}/></Provider></NativeBaseProvider>).toJSON();
      expect(domTree).toMatchSnapshot();
  
      
    });
  });

