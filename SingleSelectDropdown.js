import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Color from './src/constant/Color';

const SingleSelectDropdown = ({ items, onSelectionChange, title, defaultValue }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleModal = () => setModalVisible(!isModalVisible);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        onSelectionChange(item);
        setModalVisible(false); // Close modal after selection
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleModal}>
                <Text style={styles.dropdownText}>
                    {defaultValue != "" ? defaultValue : selectedItem ? selectedItem : `Select a ${title}`}
                </Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => handleItemPress(item)}
                            >
                                <Text style={styles.radio}>
                                    {selectedItem === item ? '🔘' : '⚪️'}
                                </Text>
                                <Text style={styles.itemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => handleItemPress("")}>
                            <Text style={styles.closeButtonText}>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
    },
    dropdown: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
        color: Color.Table_Row_Text_Color
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        minHeight: 100,
        maxHeight: 400,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    radio: {
        fontSize: 18,
        marginRight: 10,
        color: Color.Table_Row_Text_Color
    },
    itemText: {
        fontSize: 16,
        color: Color.Table_Row_Text_Color
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        // backgroundColor: '#007BFF',
        backgroundColor: Color.Buttons_Color,

        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default SingleSelectDropdown;
