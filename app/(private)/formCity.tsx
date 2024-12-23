import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import env from '@/constants/env.ts';
import { styles } from '@/styles/FormCity.Style.ts';

export default function FormCityScreen() {

  const { id } = useLocalSearchParams();

  const [inputNome, setInputNome] = useState("");
  const [inputPais, setInputPais] = useState("Brasil");
  const [inputData, setInputData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inputPassaporte, setInputPassaporte] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const listaPais = [
    { label: "Brasil", value: "BR" },
    { label: "Estados Unidos", value: "EUA" },
    { label: "França", value: "FR" },
    { label: "Espanha", value: "ES" },
    { label: "Portugal", value: "PT" },
    { label: "Itália", value: "IT" },
  ];

  useEffect(() => {
    const getCity = async () => {
      if (id) {

        setLoading(true);
        try {
          const response = await fetch(env.API_GQL_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `query {
                        cidade(id: "${id}", nome: "") {
                            id, nome, pais, atualizado
                        }
                    }`,
            }),
          });
          const { data } = await response.json();
          setInputNome(data.cidade.nome);
          setInputPais(data.cidade.pais);
        } catch (error) {
          const err = error as { message: string };
          Alert.alert(err.message);
        } finally {
          setLoading(false);
        }
      }
    }
    getCity();
  }, [id]);

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
            `/(private)/formCityConfirm?id=${id}&nome=${inputNome}&pais=${inputPais}&data=${inputData.toLocaleString(
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