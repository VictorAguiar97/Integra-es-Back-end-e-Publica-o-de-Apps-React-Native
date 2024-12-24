import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Button, IconButton, Divider } from 'react-native-paper';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import env from '@/constants/env.ts';
import Cidade from '@/models/Cidade';
import { styles } from '@/styles/Cidade.Style';

export default function CidadePage() {
    const { cidade: id } = useLocalSearchParams<{ cidade?: string }>();
    const navigation = useNavigation();

    const [cidade, setCidade] = useState<Cidade | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const apiUrl = env.DB_URL;
    const requestUri = `${apiUrl}/cities/${id}.json`;

    const getCityApi = async () => {
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
            setCidade(data.cidade);
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteCityApi = async () => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza de que deseja excluir esta cidade?",
            [
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const response = await fetch(env.API_GQL_URL, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    query: `mutation {
                                        deleteCidade(id: "${id}") {
                                            id
                                            nome
                                            pais
                                        }
                                    }`,
                                }),
                            });

                            const { data, errors } = await response.json();

                            if (data?.deleteCidade?.id) {
                                Alert.alert("Excluído com sucesso");
                                router.push('/(private)');
                            } else {
                                Alert.alert(errors?.[0]?.message || "Erro ao excluir a cidade");
                            }
                        } catch (error) {
                            Alert.alert("Erro ao excluir cidade");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        getCityApi();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
                <Text style={styles.loadingText}>Carregando informações...</Text>
            </View>
        );
    }

    if (!cidade) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Nenhuma cidade encontrada</Text>
            </View>
        );
    }

    const atualizadoFormat = new Date(Number(cidade.atualizado) * 1000).toLocaleDateString('pt-BR');

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title={cidade.nome}
                    subtitle={cidade.pais}
                    left={(props) => <IconButton {...props} icon="city" />}
                />
                <Divider />
                <Card.Content>
                    <Text style={styles.infoText}>
                        Última atualização: <Text style={styles.highlight}>{atualizadoFormat}</Text>
                    </Text>
                </Card.Content>
                <Divider />
                <Card.Actions style={styles.cardActions}>
                    <Button
                        mode="contained"
                        color="#d32f2f"
                        icon="delete"
                        onPress={deleteCityApi}
                    >
                        Excluir
                    </Button>
                    <Button
                        mode="contained"
                        color="#1976d2"
                        icon="pencil"
                        onPress={() => router.push(`/(private)/formCity?id=${id}`)}
                    >
                        Editar
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}
