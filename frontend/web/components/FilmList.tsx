import { ADD_FILM, SEARCH_FILMS } from '../queries/filmQueries';
import { Box, Button, CheckIcon, ChevronDownIcon, Flex, HStack, Heading, Input, ScrollView, Select, Spinner, Text } from 'native-base';
import { CreateFilm, Film } from '../utils/Interface';
import { setGenre, setSorting, setTitle, setYear } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from '@apollo/client'

import { CreateForm } from './AddFilm';
import { FilmCard } from './FilmCard';
import React from 'react';
import { ShowFilmItem } from './FilmItem';
import { Store } from "../redux/store";
import { YearPicker } from './YearPicker';
import { useState } from 'react';

const PAGE_SIZE = 8;

/** 
* Main component to show list of filmitems on React Native application
*/
export default function FilmList() {
    const [page, setPage] = useState(0);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentPost, setCurrentPost] = useState<Film>({
        _id: "",
        title: "",
        year: "",
        cast: [""],
        genres: [""]
    });
    const [showFilm, setShowFilm] = useState(false);
    const [filterYear, setFilterYear] = useState(false);
    const [searchTitle, setSearchTitle] = useState ("");

    const hideFilm = () => {
      setShowFilm(false);
    };

    const dispatch = useDispatch();
    const [createPost] = useMutation(ADD_FILM);

    let title = useSelector ((state: Store) => state.title); //fetching title filter from redux store
    let genre = useSelector ((state: Store) => state.genre); //fetching genre filter from redux store
    let year = useSelector ((state: Store) => state.year); //fetching year filter from redux store
    let sorting = useSelector ((state: Store) => state.sorting); //fetching sorting filter from redux store
    
    /** 
    * Retrieves data, loading and error from graphql server
    * @param variables to be considered when retreiving data
    * @return data from graphql server 
    */
    const { loading, error, data } = useQuery(SEARCH_FILMS, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
            titleFilter: title,
            genreFilter: genre,
            yearFilter: parseInt(year, 10),
            sorting: parseInt(sorting, 10),
        },
    });

    if (loading) {
        return (
            <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        <Text>Loading...</Text>
                    </Heading>
            </HStack>
        )
    }

   if (error) {
        console.log(error)
        return (
            <h5 style={{color: "#ffffff"}}>
                Something went wrong when trying to connect to the server...
            </h5>
        )
    }

    /** 
    * Creates a filmitem in the database
    * @param film to be created
    */
    const onCreate = (film: CreateFilm) => { 
        createPost({
            variables: {
                title: film.title,
                year: film.year? parseInt(film.year, 10) : 0,
                cast: film.cast? film.cast.split(",") : [],
                genres: film.genres? [film.genres]: [],
            }
        });
        dispatch(setTitle(film.title))
        setOpenCreate(false);
    };

    function handleClick(post: Film) {
        setCurrentPost(post);
        setShowFilm(true);
    }

    /** 
    * Resets the filters in redux
    */
    function useReset() {
        dispatch(setTitle(""))
        dispatch(setGenre(""))
        dispatch(setYear("0"))
        dispatch(setSorting("1"))

        setSearchTitle("");
        title = "";
        genre = "";
        year = "0";
        sorting = "1";
    }
    
    return (
        <>
        {!loading && !error && 
            <Box justifyContent="center" margin={4} >    
                <Box paddingBottom={3}>
                    <Heading margin={4} color={"white"} marginBottom={5} marginTop={55}>Filmdatabase</Heading>
                    <Box margin={1}>
                        <Input
                            backgroundColor="white"  
                            borderColor={"600"}
                            value={searchTitle}
                            placeholder="Search for title"
                            accessibilityLabel="Search by title"
                            fontSize={15}
                            onChangeText={(e: string) => setSearchTitle(e)}
                            InputRightElement={
                                <Button size="xs" rounded="none" w="1/4" h="full" onPress={() => dispatch(setTitle(searchTitle))}>
                                    { <Text color={"white"}>Search</Text> }
                                </Button>
                            }
                        />
                    </Box>
                    <Flex direction='row' justifyContent="center">
                        <Box margin={2} width="45%">
                            <Select 
                                backgroundColor="white" 
                                selectedValue={genre} 
                                mx={{base: 0, md: "Genre"}} 
                                borderColor={"600"}
                                placeholder="Filter genre" 
                                fontSize={15} 
                                onValueChange={e => dispatch(setGenre(e))} 
                                _selectedItem={{
                                    bg: "cyan.600",
                                    rounded: "10",
                                    endIcon: <CheckIcon color={"black"} size={6} />
                                }} 
                                accessibilityLabel="Select genre"
                            >
                                <Select.Item label="Drama" value="Drama" />
                                <Select.Item label="Documentary" value="Documentary" />
                                <Select.Item label="Sports" value="Sports" />
                                <Select.Item label="Silent" value="Silent" />
                                <Select.Item label="Adventure" value="Adventure" />
                                <Select.Item label="Western" value="Western" />
                                <Select.Item label="Romance" value="Romance" />
                                <Select.Item label="War" value="War" />
                                <Select.Item label="Comedy" value="Comedy" />
                                <Select.Item label="Horror" value="Horror" />
                                <Select.Item label="Historical" value="Historical" />
                                <Select.Item label="Animated" value="Animated" />
                            </Select>
                        </Box>
                        <Box margin={2} width="45%">
                            <Select 
                                backgroundColor="white" 
                                selectedValue={sorting} 
                                mx={{base: 0, md: "Sort"
                                }} 
                                borderColor={"600"} 
                                fontSize={15} 
                                onValueChange={e => dispatch(setSorting(e))} 
                                _selectedItem={{
                                    bg: "cyan.600",
                                    rounded: "10",
                                    endIcon: <CheckIcon color={"black"} size={6} />
                                }} 
                                accessibilityLabel="Sort on year"
                            >
                                <Select.Item label="Ascending" value="1" />
                                <Select.Item label="Descending" value="-1" />
                            </Select>
                        </Box>
                    </Flex>
                    <Flex direction='row' justifyContent="center">
                        <Box marginTop={2} margin={1}>
                            <Button  
                                backgroundColor="white" 
                                variant="outline"
                                borderColor={"600"}
                                borderWidth="1"
                                fontSize={15}
                                onPress={() => {
                                    setFilterYear(true);
                                }}
                                accessibilityLabel="Filter on year"
                            >
                                <Text color={"grey"}>Filter year <ChevronDownIcon paddingLeft={1} color={"grey"} size={6}/></Text>
                            </Button>
                        </Box>
                        <YearPicker
                            open={filterYear}
                            onClose={() => setFilterYear(false)}
                        />
                        <Box marginTop={2} margin={1}>
                            <Button 
                                onPress={useReset}
                                borderColor={"600"}
                                accessibilityLabel="Reset filters"
                            >
                                <Text color={"white"}>Reset Filters</Text> 
                            </Button>
                        </Box>
                        <Box marginTop={2} margin={1}>
                            <Button
                                onPress={() => { setOpenCreate(true); }}
                                accessibilityLabel="Create new film"
                            >
                                <Text color={"white"}>Add New Film</Text>
                            </Button>
                            <CreateForm
                                open={openCreate}
                                onCreate={onCreate}
                                onCancel={() => {
                                    setOpenCreate(false);
                                }}
                            /> 
                        </Box>
                    </Flex>
                </Box>
                <ScrollView w="100%" h="sm">
                    {data.getFilteredPosts != 0?
                        data.getFilteredPosts?.map((post: Film) => (
                        <FilmCard
                            key={post._id}
                            film={post}
                            handleClick={() => handleClick(post)}
                        /> 
                    ))
                    : <Text color={"white"}>No more films found</Text>}
                </ScrollView>
                <ShowFilmItem 
                    film={currentPost} 
                    open={showFilm} 
                    onCancel={hideFilm} 
                />
                <Box paddingTop={4}>
                    {page != 0? 
                    <Button
                        margin={1}
                        disabled={loading}
                        
                        onPress={() => (setPage(prev => prev-1))}
                    >
                        <Text color={"white"}>Previous</Text>
                    </Button>
                    : null}
                    {data.getFilteredPosts != 0?
                    <Button
                        margin={1}
                        disabled={loading}
                        onPress={() => (setPage(prev => prev+1))}
                    >
                        <Text color={"white"}>Next</Text>
                    </Button>
                    : null}
                </Box>
            </Box>
        }
        </>
    )
};