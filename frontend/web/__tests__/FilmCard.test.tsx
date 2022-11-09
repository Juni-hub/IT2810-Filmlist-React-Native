import { Provider } from 'react-redux';
import store from '../redux/store';
import renderer from "react-test-renderer";
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { MockedProvider} from "@apollo/client/testing";
import { SEARCH_FILMS } from '../queries/filmQueries';
import {FilmCard} from '../components/FilmCard';
import { CreateFilmCard } from "../utils/Interface";


const mocks=  [
    {
      request: {
        query: SEARCH_FILMS,
        variables: {
          limit: 15,
          offset:"" ,
          titleFilter: "",
          genreFilter: "",
          yearFilter: 0,
          sorting: 1
  
        }
      },
      result: {
        data: {
          getFilteredPosts: [{"_id":"63453c374d8655244d2aa472","title":"After Dark in Central Park","year":1900,"cast":[],"genres":[]},
          {"_id":"63453c374d8655244d2aa473","title":"Boarding School Girls' Pajama Parade","year":1900,"cast":[],"genres":[]},
          {"_id":"63453c374d8655244d2aa474","title":"Buffalo Bill's Wild West Parad","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa475","title":"Caught","year":1900,"cast":[],"genres":[]},
          {"_id":"63453c374d8655244d2aa476","title":"Clowns Spinning Hats","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa477","title":"Capture of Boer Battery by British","year":1900,"cast":[],"genres":["Short","Documentary"]},
          {"_id":"63453c374d8655244d2aa478","title":"The Enchanted Drawing","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa479","title":"Feeding Sea Lions","year":1900,"cast":["Paul Boyton"],"genres":[]},{"_id":"63453c374d8655244d2aa47b","title":"New Life Rescue","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47c","title":"New Morning Bath","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47d","title":"Searching Ruins on Broadway, Galveston, for Dead Bodies","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47e","title":"The Tribulations of an Amateur Photographer","year":1900,"cast":[],"genres":[]},{"_id":"63453c374d8655244d2aa47f","title":"Trouble in Hogan's Alley","year":1900,"cast":[],"genres":["Comedy"]},{"_id":"63453c374d8655244d2aa480","title":"Two Old Sparks","year":1900,"cast":[],"genres":["Short"]},{"_id":"63453c374d8655244d2aa481","title":"The Wonder, Ching Ling Foo","year":1900,"cast":["Ching Ling Foo"],"genres":["Short"]}]
        }
      }
    }
  ];

/** 
* Snapshot test for loading page
*/
const film = {"_id":"63453c374d8655244d2aa472","title":"After Dark in Central Park",
"year":"1900","cast":[],"genres":[]}
const handleClick = jest.fn();

const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

describe("Jest Snapshot testing suite",  () => {
    it("Matches DOM Snapshot",   () => {
      const domTree = renderer.create(
      <NativeBaseProvider initialWindowMetrics={inset}><MockedProvider mocks = {mocks}><Provider store={store}>
      <FilmCard film={film} handleClick={handleClick}/></Provider></MockedProvider></NativeBaseProvider>).toJSON();
      expect(domTree).toMatchSnapshot();
  
      
    });
  });

