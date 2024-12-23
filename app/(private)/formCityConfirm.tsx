import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import env from '@/constants/env.ts';
import { styles } from '@/styles/formCityConfirm.style.ts';

export default function FormCityConfirmScreen() {

    const { id, nome, pais, data, passaporte } = useLocalSearchParams();

    function handleData(data: string | string[]): string {
        if (Array.isArray(data)) {

            return data[0];
        }
        return data;
    }

    function parseBrazilianDateToTimestamp(dateString: string): number {

        const [date1] = dateString.split(' ');
        const [date2] = date1.split(',');

        const [day, month, year] = date2.split('/').map(Number);

        const dateObj = new Date(year, month - 1, day);

        return dateObj.getTime();
    }

    const rawData: string | string[] = data;

    const validData = handleData(rawData);

    const dataTimestamp = parseBrazilianDateToTimestamp(validData);

    const query = `mutation($newCity: addCityInput) { 
        addCity(newCity: $newCity) { 
            id 
        }
    }`;

    const queryUpdate = `mutation UpdateCity($city: updateCityInput) {
        updateCity(city: $city) {
            id, pais
        } 
     }`;

    const variables = {
        newCity: { nome, pais },
    };

    const onConfirmar = async () => {

        try {
            if (id !== "undefined" && id !== null) {

                const response2 = await fetch(env.API_GQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: queryUpdate,
                        variables: {
                            city: { id, nome, pais },
                        }
                    }),
                });

                const { data } = await response2.json();
                console.log(data);
                if (data) {
                    //const { addCity } = data;
                    // ${addCity.id}
                    Alert.alert(`Cidade Editada com Sucesso!`);
                    router.push('/(private)');
                } else {

                    Alert.alert(`Não foi possivel editar cidade!`);
                }
            } else {
                //salva
                const response = await fetch(env.API_GQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ query, variables }),
                });

                const { data } = await response.json();

                if (data) {
                    //const { addCity } = data;
                    // ${addCity.id}
                    Alert.alert(`Cidade Salvar com Sucesso!`);
                    router.push('/(private)');
                } else {

                    Alert.alert(`Não foi possivel salvar cidade!`);
                }
            }
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Confirmar Dados</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{nome}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>País:</Text>
                <Text style={styles.value}>{pais}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Data:</Text>
                <Text style={styles.value}>{data}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Passaporte:</Text>
                <Text style={styles.value}>{passaporte}</Text>
            </View>
            <Pressable style={styles.button} onPress={onConfirmar}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
        </View>
    );
}
