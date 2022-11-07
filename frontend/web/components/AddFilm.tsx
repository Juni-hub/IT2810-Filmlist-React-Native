import React from "react";
import { CreateFormProps } from '../utils/Interface';
import { Center, Button, Modal } from "native-base";
import { CreateModalProps } from "../utils/Interface";
import { List, Input, Alert, Text } from 'native-base';

/** 
* Const for creating a form 
* @param open boolean to decide if modal should be open or closed
* @param onCreate function to create filmitem
* @param onCancel function to close the modal
* @return modal for creating a filmitem
*/

type FormData = {
    title: string
}

export const CreateForm: React.FC<CreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
    const [title, setTitle] = React.useState("");
    const [year, setYear] = React.useState(0);
    const [cast, setCast] = React.useState([]);
    const [genres, setGenres] = React.useState([]);

    const handleChange = (text: any) => setTitle(text);

    function createFilm() {
      //onCreate("");
    }

    return(
        <Center>
        <Modal isOpen={open} onClose={onCancel}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header><Text>Chosen film</Text></Modal.Header>
          <Modal.Body>
            <Input
                variant="outline"
                onChangeText={handleChange}
                placeholder="Title"
            />
            <Input
                variant="outline"
                onChangeText={handleChange}
                placeholder="Year"
            />
            <Input
                variant="outline"
                onChangeText={handleChange}
                placeholder="Cast"
            />
            <Input
                variant="outline"
                onChangeText={handleChange}
                placeholder="Genres"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
                <Text>Close</Text>
            </Button>
            <Button variant="ghost" colorScheme="blueGray" onPress={createFilm}>
                <Text>Add film</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
    );
};

/*
  return (
    <Modal
      open={open}
      title="Insert a new film"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
        .validateFields()
        .then(values => {
          form.resetFields();
          onCreate(values);
        })
        .catch(info => {
          console.log('Validate Failed:', info);
        });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of the film!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="year"
          label="Year"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="cast"
          label="Cast"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="genres"
          label="Genres"
        >
        <Select>
          {optionList}
        </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
 */
