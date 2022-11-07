import { Button, Center, Modal, Text } from "native-base";

import { CreateShowYearProps } from "../utils/Interface";
import { Picker } from 'react-native-wheel-pick';
import React from "react";
import { setYear } from '../redux/actions';
import { useDispatch } from "react-redux";

/** 
* Const for showing a wheel picker for year filtering
* @param open boolean to decide if modal should be open or closed
* @param onClose function to close the modal
* @return a modal to choose year filter
*/
export const YearPicker: React.FC<CreateShowYearProps> = ({
    open,
    onClose,
  }) => {
    const [tempYear, setTempYear] = React.useState<string>('0');
    const dispatch = useDispatch();
    const yearList : string[] = [];

    for (let i = 1900; i < 2019; i++) {
    yearList.push(i.toString());
    }

    const pickYear = () => {
        dispatch(setYear(tempYear));
        onClose();
      };
  
    return (
        <Center>
            <Modal isOpen={open} onClose={onClose}>
            <Modal.Content maxWidth="400px">
            <Picker
                            style={{ backgroundColor: 'white', width: 300, height: 215 }}
                            selectedValue='0'
                            pickerData={yearList}
                            onValueChange={(e: string) => setTempYear(e)}
                        />
            <Modal.Footer>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => pickYear()}>
                <Text>Choose year</Text>
            </Button>
          </Modal.Footer>
            </Modal.Content>
        </Modal>
        </Center>
    );
}