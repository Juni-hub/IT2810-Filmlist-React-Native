import { Box,  Divider,  Pressable, Text, VStack } from 'native-base';

import { CreateFilmCard } from "../utils/Interface";
import React from "react";

export const FilmCard: React.FC<CreateFilmCard> = ({
    film,
    handleClick
}) => {
    return(
        <Box borderColor="coolGray.200" borderWidth="1" borderRadius="md" width="85%" margin={5} marginBottom={1}>   
            <Pressable onPress={() => handleClick(film)}>
                <VStack divider={<Divider />} width="100%">
                    <Box padding={3} px="4" pt="4">
                        <Text data-testid={"title"}>{film.title}</Text>
                    </Box>
                    <Box px="4" padding={6}>
                        <Text data-testid={"year"}>Year Released: {film.year? film.year: "No year is registered"}</Text>
                    </Box>
                </VStack>
            </Pressable>
        </Box>
    );
}