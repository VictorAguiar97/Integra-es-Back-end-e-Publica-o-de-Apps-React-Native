import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

export default function FormCityScreen() {

    const [inputNome, setInputNome] = useState("");
    const [inputPais, setInputPais] = useState("Brasil");
    const [inputData, setInputData] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [inputPassaporte, setInputPassaporte] = useState(false);

    const listaPais = [
        { label: "Brasil", value: "BR" },
        { label: "Estados Unidos", value: "EUA" },
        { label: "França", value: "FR" },
        { label: "Espanha", value: "ES" },
        { label: "Portugal", value: "PT" },
        { label: "Itália", value: "IT" },
    ];

    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.formTextInput}
                placeholder="Nome"
                value={inputNome}
                onChangeText={setInputNome}
            />
            <View style={styles.formPickerContainer}>
                <Text>Pais: </Text>
                <Picker
                    style={styles.formPicker}
                    selectedValue={inputPais}
                    onValueChange={setInputPais}
                >
                    {listaPais.map(pais => <Picker.Item {...pais} />)}
                </Picker>
            </View>
            <Pressable
                style={styles.formDateTimePicker}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.formDateTimePickerLabel}>Data</Text>
                <Text>{inputData.toLocaleDateString("pt-BR")}</Text>
            </Pressable>
            {showDatePicker && <DateTimePicker
                // mode="time"
                // display="clock"
                value={inputData}
                onChange={(_, date) => {
                    setShowDatePicker(false);
                    if (date)
                        setInputData(date);
                }}
            // maximumDate={new Date()}
            // minimumDate={new Date()}
            />}
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Passaporte:</Text>
                <View style={styles.switchOption}>
                    <Text>Não</Text>
                    <Switch
                        value={inputPassaporte}
                        onValueChange={setInputPassaporte}
                    />
                    <Text>Sim</Text>
                </View>
            </View>
            <Pressable style={styles.formPressableSubmit} onPress={() => {
                router.push(`/(private)/formCityConfirm?nome=${inputNome}&pais=${inputPais}&data=${inputData.toLocaleString("pt-BR")}&passaporte=${inputPassaporte}`);
            }}>
                <Text style={styles.formPressableSubmitLabel}>Salvar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    formDateTimePicker: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    formDateTimePickerLabel: {
        flex: 1,
    },
    formContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    formTextInput: {
        margin: 4,
        padding: 8,
        borderRadius: 5,
        backgroundColor: "#caf0f8"
    },
    formPickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    formPicker: {
        flex: 1,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    switchLabel: {
        flex: 1,
    },
    switchOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    formPressableSubmit: {
        backgroundColor: "#8cd867",
        margin: 20,
        padding: 5,
        borderRadius: 5,
    },
    formPressableSubmitLabel: {
        textAlign: "center",
    }
});