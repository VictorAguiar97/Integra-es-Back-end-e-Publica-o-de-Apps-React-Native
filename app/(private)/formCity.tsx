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
      <Text style={styles.header}>Formulário de Cidades</Text>
      
      <TextInput
        style={styles.formTextInput}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={inputNome}
        onChangeText={setInputNome}
      />

      <View style={styles.formPickerContainer}>
        <Text style={styles.label}>País</Text>
        <Picker
          style={styles.formPicker}
          selectedValue={inputPais}
          onValueChange={setInputPais}
        >
          {listaPais.map((pais) => (
            <Picker.Item {...pais} />
          ))}
        </Picker>
      </View>

      <Pressable
        style={styles.formDateTimePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.label}>Data de Viagem</Text>
        <Text style={styles.dateText}>{inputData.toLocaleDateString("pt-BR")}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={inputData}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) setInputData(date);
          }}
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Possui Passaporte?</Text>
        <View style={styles.switchOption}>
          <Text>Não</Text>
          <Switch
            value={inputPassaporte}
            onValueChange={setInputPassaporte}
            trackColor={{ false: "#d3d3d3", true: "#4caf50" }}
            thumbColor={inputPassaporte ? "#8bc34a" : "#f4f3f4"}
          />
          <Text>Sim</Text>
        </View>
      </View>

      <Pressable
        style={styles.formPressableSubmit}
        onPress={() => {
          router.push(
            `/(private)/formCityConfirm?nome=${inputNome}&pais=${inputPais}&data=${inputData.toLocaleString(
              "pt-BR"
            )}&passaporte=${inputPassaporte}`
          );
        }}
      >
        <Text style={styles.formPressableSubmitLabel}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  formTextInput: {
    backgroundColor: "#fff",
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
    color: "#555",
    marginBottom: 8,
  },
  formPicker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  formDateTimePicker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});