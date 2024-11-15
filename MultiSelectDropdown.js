import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import Color from './src/constant/Color';

const MultiSelectDropdown = ({ items, onSelectionChange }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    const toggleModal = () => setModalVisible(!isModalVisible);

    const handleItemPress = (item) => {
        const updatedSelection = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)
            : [...selectedItems, item];

        setSelectedItems(updatedSelection);
        onSelectionChange(updatedSelection);
    };

    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
            onSelectionChange([]);
        } else {
            setSelectedItems(items);
            onSelectionChange(items);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            setFilteredItems(items.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
        } else {
            setFilteredItems(items);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleModal}>
                <Text style={styles.dropdownText}>
                    {/* {selectedItems.length ? selectedItems.join(', ') : 'Select items'} */}
                    {selectedItems.length ? `${selectedItems.length} item Selected` : 'Select items'}
                </Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    {/* Search Input */}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search items..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />

                    {/* Select All Button */}
                    <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
                        <Text style={styles.selectAllButtonText}>
                            {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
                        </Text>
                    </TouchableOpacity>

                    {/* Item List */}
                    <FlatList
                        data={filteredItems}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => handleItemPress(item)}
                            >
                                <Text style={styles.checkbox}>
                                    {selectedItems.includes(item) ? '☑️' : '⬜️'}
                                </Text>
                                <Text style={styles.itemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    dropdown: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: 450
    },
    searchInput: {
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    selectAllButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        backgroundColor: Color.Buttons_Color,
        borderRadius: 5,
        marginBottom: 10,
    },
    selectAllButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    checkbox: {
        fontSize: 18,
        marginRight: 10,
    },
    itemText: {
        fontSize: 16,
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

export default MultiSelectDropdown;
