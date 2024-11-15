import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, TextInput, StyleSheet, ScrollView } from 'react-native';
import Color from '../../constant/Color';

const DropDownMultipleSelector = ({ data, placeholder, onSelectionChange }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSelectAll, setIsSelectAll] = useState(false);

    // Function to toggle 'Select All'
    const handleSelectAll = () => {
        if (isSelectAll) {
            setSelectedItems([]);
            onSelectionChange([]); // Send an empty array when deselected all
        } else {
            const allstudentIds = data.map(item => item.studentId);
            setSelectedItems(allstudentIds);
            onSelectionChange(allstudentIds); // Send all studentIds when selected all
        }
        setIsSelectAll(!isSelectAll);
    };

    // Function to toggle individual items
    const toggleItem = (itemstudentId) => {
        if (selectedItems.includes(itemstudentId)) {
            const newSelectedItems = selectedItems.filter(studentId => studentId !== studentId);
            setSelectedItems(newSelectedItems);
            onSelectionChange(newSelectedItems);
        } else {
            const newSelectedItems = [...selectedItems, itemstudentId];
            setSelectedItems(newSelectedItems);
            onSelectionChange(newSelectedItems);
        }
    };

    // Filtered data based on the search query
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <View style={styles.container}>
            {/* <Text>{name}</Text> */}

            {/* Dropdown button to open modal */}
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
                <Text>{selectedItems.length > 0 ? `${selectedItems.length} selected` : placeholder}</Text>
            </TouchableOpacity>

            {/* Modal for displaying dropdown options */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* Search Bar */}
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search..."
                            studentId={searchQuery}
                            onChangeText={setSearchQuery}
                        />

                        {/* Select All Checkbox */}
                        <TouchableOpacity style={styles.item} onPress={handleSelectAll}>
                            <Text style={isSelectAll ?{ color:Color.Table_Row_Text_Color } : { color:"black" }}>Select All</Text>
                            {/* <CheckBox studentId={isSelectAll} onstudentIdChange={handleSelectAll} /> */}
                            {/* <Text>{isSelectAll?"ok":"Not ok"}</Text> */}
                        </TouchableOpacity>

                        {/* List of items */}
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item) => item.studentId.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.item} onPress={() => toggleItem(item.studentId)}>
                                    <Text style={selectedItems.includes(item.studentId) ? { color:Color.Table_Row_Text_Color } : { color:"black"}}>{item.name} {item.studentId}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        {/* Close Button */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// Styles for the dropdown and modal
const styles = StyleSheet.create({
    container: {
        // padding: 10,
        // paddingVertical:0
    },
    dropdownButton: {
        // padding: 12,
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        height: 400
    },
    searchBar: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    closeButton: {
        marginTop: 16,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderRadius: 8,
    },
});

export default DropDownMultipleSelector;
