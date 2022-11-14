import { CreateFormProps } from '../utils/Interface';
import { Center, Button, Modal, Select, Input, Text, FormControl, CheckIcon } from "native-base";
import React from 'react';

/** 
* Const for creating a new film item 
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

  const [errors, setErrors] = React.useState({});

  const handleTitle = (value: string) => setTitle(value);
  const handleYear = (value: string) => setYear(value);
  const handleCast = (value: string) => setCast(value);
  const handleGenres = (value: string) => setGenres(value);

  /** 
  * Function that creates a film item in the database
  */
  function createFilm() {
    validate()?
    onCreate({
      title: title, 
      year: year, 
      cast: cast,
      genres: genres,
    }) : console.log('Validation Failed');
  }

  /** 
  * Function that validates the values in the form
  */
  const validate = () => {
    if (title.trim() === "") {
      setErrors({ ...errors,
        title: 'Name is required'
      });
      return false;
    } else if (parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) {
      setErrors({ ...errors,
        year: 'Year must be between 1900 and ' + new Date().getFullYear()
      });
      return false;
    }
    return true;
  };

  /** 
  * Function that reserts the error values
  */
  function resetValues() {
    setErrors({});
  }

  return(
    <Center>
      <Modal isOpen={open} onClose={() => { resetValues(); onCancel(); }}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text>Chosen film</Text>
          </Modal.Header>
          <Modal.Body>
            <FormControl isRequired isInvalid={'title' in errors}>
              <Input
                fontSize={15}
                variant="outline"
                onChangeText={handleTitle}
                placeholder="Title"
              />
              {'title' in errors ? 
                <FormControl.ErrorMessage>
                  Title is required!
                </FormControl.ErrorMessage> : ""
              }
            </FormControl>    
            <FormControl isRequired isInvalid={'year' in errors}>
              <Input
                fontSize={15}
                variant="outline"
                onChangeText={handleYear}
                placeholder="Year"
              />
              {'year' in errors ? 
                <FormControl.ErrorMessage>
                  {'Year must be between 1900 and ' + new Date().getFullYear()}
                </FormControl.ErrorMessage> : ""
              }
            </FormControl>
            <Input
              fontSize={15}
              marginBottom={3}
              variant="outline"
              onChangeText={handleCast}
              placeholder="Cast"
            />
            <Select 
              fontSize={15}
              placeholder="Genres" 
              mx={{base: 0, md: "Genre"}} 
              onValueChange={handleGenres} 
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
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