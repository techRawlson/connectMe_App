import { memo } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Color from "../../constant/Color";


const ClassAttendanceRecordRenderTable = ({ headers, data }) => {

    console.log("data", data.length, data);
    console.log("headers", headers.length, headers);


    const headerRender = () => {
        return (
            <View>
                {headers.map((item, index) => (
                    <View key={index} style={styles.headerRow}>
                        {item.map((headerItem, idx) => (
                            <View key={idx} style={styles.headerCell}>
                                <Text style={styles.headerText}>{headerItem}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        );
    };

    const dataRender = () => {
        return (
            <ScrollView>
                {data.map((item, index) => {
                    // console.log(item);
                    return (
                        <View key={index} style={styles.dataRow}>
                            {item.map((dataItem, idx) => (
                                <View key={idx} style={styles.dataCell}>
                                    {dataItem === "true" || dataItem === "false" ? (
                                        <Text style={styles.dataText}>{dataItem === "true" ? "Present" : "Absent"}</Text>
                                    ) : dataItem === "N/A" ? (
                                        <Text style={styles.dataText}>No Data</Text>
                                    ) : (
                                        <Text style={styles.dataText}>{dataItem}</Text>
                                    )}
                                </View>
                            ))}
                        </View>

                    )
                })}
            </ScrollView >
        );
    };
    if (headers[1] && headers[1]?.length > 1) {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView horizontal>
                    <View style={{ borderWidth: 1 }}>
                        {headerRender()}
                        {dataRender()}
                    </View>
                </ScrollView>
            </View>
        )
    } else if (headers.length > 0) {
        return (
            <View style={styles.emptyDataView}>
                <Text style={styles.noDataText}>No Data Found</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.emptyDataView}>
                <Text style={styles.selectDataFilter}>Select Data Filter</Text>
            </View>
        )
    }
}

export default memo(ClassAttendanceRecordRenderTable);


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 10,
    },
    datePickerView: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: "#ccc",
    },
    datePickerText: {
        fontSize: 16,
    },
    moduleRootView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    moduleChildView: {
        width: Dimensions.get("window").width - 50,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 40,
        paddingVertical: 40,
    },
    tableContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        // borderColor: "#ccc",
        borderColor: Color.Table_Border_Color,
    },
    headerCell: {
        width: 110,
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        // borderColor: "#ddd",
        borderColor: Color.Table_Border_Color,
    },
    headerText: {
        fontWeight: "bold",
        // color: "#333",
        color: Color.Table_Head_Text_Color,
    },
    dataText: {
        color: Color.Table_Row_Text_Color,
    },
    dataRow: {
        flexDirection: "row",
        // borderBottomWidth: 1,
        // borderColor: "#eee",
        // borderColor: Color.Table_Border_Color,
    },
    dataCell: {
        width: 110,
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: Color.Table_Border_Color,
    },
    scrollableContainer: {
        flex: 1,
    },
    noDataText: {
        color: "red",
        fontSize: 18
    },
    selectDataFilter: {
        color: Color.Table_Row_Text_Color,
        fontSize: 18,
    }
});
