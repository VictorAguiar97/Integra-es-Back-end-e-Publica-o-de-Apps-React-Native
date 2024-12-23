import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: ColorsConstants.backgroundColor,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: ColorsConstants.backgroundColor,
    },
    formTextInput: {
        backgroundColor: ColorsConstants.backgroundColor,
        color: FontConstans.color,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    formPickerContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: FontConstans.color,
        marginBottom: 8,
    },
    formPicker: {
        backgroundColor: ColorsConstants.backgroundColor,
        color: FontConstans.color,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
    },
    formDateTimePicker: {
        backgroundColor: ColorsConstants.backgroundColor,
        color: FontConstans.color,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    dateText: {
        fontSize: 16,
        color: FontConstans.color,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    switchOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    formPressableSubmit: {
        backgroundColor: "#4caf50",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
    },
    formPressableSubmitLabel: {
        color: FontConstans.color,
        fontSize: 18,
        fontWeight: "bold",
    },
});