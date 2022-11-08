import React from "react";
import { CreateFilmCard } from "../utils/Interface";
import { Box, Button, CheckIcon, Divider, HStack, Heading, Input, Row, Select, Spinner, Text, VStack, Pressable } from 'native-base';

export const FilmCard: React.FC<CreateFilmCard> = ({
    film,
    handleClick
}) => {
    return(
        <Box borderColor="900" borderWidth="2" borderRadius="md" width="85%" margin={5} marginBottom={1}>   
            <Pressable onPress={() => handleClick(film)}>
                <VStack divider={<Divider />} width="100%">
                    <Box padding={3} px="4" pt="4">
                        <Text fontSize={20}>{film.title}</Text>
                    </Box>
                    <Box px="4" padding={6}>
                        <Text fontSize={15}>Year Released: {film.year? film.year: "No year is registered"}</Text>
                    </Box>
                </VStack>
            </Pressable>
        </Box>
    );
}