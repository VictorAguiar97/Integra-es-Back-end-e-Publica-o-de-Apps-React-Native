import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, useWindowDimensions, Pressable, SafeAreaView, NativeModules } from "react-native";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ActivityIndicator, Text } from "react-native-paper";
import { UserContext } from "@/store/UserStore";
import CitiesList from "@/components/CitiesList";
import CityInfo from "@/components/CityInfo";
import Cidade from "@/models/Cidade.tsx";
import env from "@/constants/env.ts";
import { styles } from "@/styles/Index.style";

export default function PrivateScreen() {
    const userAuth = useContext(UserContext);
    const [cidades, setCidades] = useState<Array<Cidade> | null>(null);
    const [cidade, setCidade] = useState<Cidade | null>(null);
    const { width, height } = useWindowDimensions();
    const isPortrait = width < height;
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<String | null>(null);

    const getCitiesApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(env.API_GQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query {
                        cidades {
                          id
                          nome
                          pais
                          atualizado
                        }
                      }`,
                }),
            });
            const { data } = await response.json();
            setCidades(data.cidades);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const Logout = () => {
        const { DevSettings } = NativeModules;
        DevSettings.reload();
    };

    useEffect(() => {
        getCitiesApi();
    }, []);

    const selecionarCidade = (cidade: Cidade) => {
        if (isPortrait) router.push(`/cidades/${cidade.id}`);
        else setCidade(cidade);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Icon name="person" size={32} color="#fff" />
                <Text style={styles.userName}>Olá, {userAuth?.email}</Text>
                <Pressable style={styles.logoutButton} onPress={Logout}>
                    <Icon name="logout" size={28} color="#fff" />
                </Pressable>
            </View>

            <View style={isPortrait ? styles.listContainerPortrait : styles.listContainerLandscape}>
                <Text style={styles.title}>Cidades</Text>

                {isLoading && <ActivityIndicator size={100} />}

                {message && <Text variant="titleSmall">{message}</Text>}

                {!isLoading && cidades && (
                    <CitiesList
                        cidades={cidades}
                        onSelected={selecionarCidade}
                        refreshingAction={getCitiesApi}
                    />
                )}

                <View style={styles.actionButtons}>
                    <Pressable
                        style={[styles.fab, styles.fabLocation]}
                        onPress={() => router.push("/(private)/location")}
                    >
                        <Text style={styles.fabLabel}>Google Maps</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.fab, styles.fabForm]}
                        onPress={() => router.push("/(private)/formCity")}
                    >
                        <Text style={styles.fabLabel}>+ Cidade</Text>
                    </Pressable>
                </View>
            </View>

            {!isPortrait && cidade && (
                <View style={styles.cityInfoContainer}>
                    <CityInfo cidade={cidade} />
                </View>
            )}
        </SafeAreaView>
    );
}