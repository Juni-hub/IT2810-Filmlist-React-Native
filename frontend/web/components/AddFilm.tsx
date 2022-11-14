import { CreateFormProps } from '../utils/Interface';
import { Center, Button, Modal, Select, CheckIcon } from "native-base";
import { Input, Text } from 'native-base';
import React from 'react';

/** 
* Const for creating a form 
* @param open boolean to decide if modal should be open or closed
* @param onCreate function to create filmitem
* @param onCancel function to close the modal
* @return modal for creating a filmitem
*/
export const CreateForm: React.FC<CreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
    const [title, setTitle] = React.useState("");
    const [year, setYear] = React.useState("");
    const [cast, setCast] = React.useState("");
    const [genres, setGenres] = React.useState("");

    const handleTitle = (value: string) => setTitle(value);
    const handleYear = (value: string) => setYear(value);
    const handleCast = (value: string) => setCast(value);
    const handleGenres = (value: string) => setGenres(value);

    function createFilm() {
      onCreate({
          title: title, 
          year: year, 
          cast: cast,
          genres: genres,
        }
      )
    }

    return(
        <Center>
        <Modal isOpen={open} onClose={onCancel}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header><Text>Chosen film</Text></Modal.Header>
          <Modal.Body>
            <Input
                marginBottom={2}  
                variant="outline"
                onChangeText={handleTitle}
                placeholder="Title"
            />
            <Input
                marginBottom={2}
                variant="outline"
                onChangeText={handleYear}
                placeholder="Year"
            />
            <Input
                marginBottom={2}
                variant="outline"
                onChangeText={handleCast}
                placeholder="Cast"
            />
            <Select 
              placeholder="Genres" 
              mx={{base: 0, md: "Genre"}} 
              onValueChange={handleGenres} 
              _selectedItem={{
                bg: "cyan.600",
                  endIcon: <CheckIcon size={4} />
              }} 
              accessibilityLabel="Select genre">
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
          </Modal.Body>
          <Modal.Footer>
            <Button marginRight={2} variant="outline" colorScheme="blueGray" onPress={onCancel}>
                <Text>Close</Text>
            </Button>
            <Button variant="outline" colorScheme="blueGray" onPress={createFilm}>
                <Text>Add film</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
    );
};