import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, Pressable } from 'react-native';
import Cidade from "@/models/Cidade";
import CitiesList from '@/components/CitiesList';
import CityInfo from '@/components/CityInfo';
import { router } from 'expo-router';
import { CitiesContext, CitiesContextState } from '@/context/CitiesContext';

export default function PrivateScreen() {

    // const [cidades, setCidades] = useState<Array<Cidade> | null>(null);
    const { cities: cidades } = useContext(CitiesContext) as CitiesContextState;
    const [cidade, setCidade] = useState<Cidade | null>(null);
    const { width, height } = useWindowDimensions();
    const isPortrait = width < height;

    const selecionarCidade = (cidade: Cidade) => {
        if (isPortrait)
            router.push(`/cidades/${cidade.id}`);
        else
            setCidade(cidade);
    }

    return (
        <View style={styles.container}>
            <View style={isPortrait ? styles.listContainerPortrait : styles.listContainerLandscape}>
                <Text style={styles.title}>Cidades</Text>
                <CitiesList cidades={cidades} onSelected={selecionarCidade} />

                <View style={styles.actionButtons}>
                    <Pressable
                        style={[styles.fab, styles.fabLocation]}
                        onPress={() => router.push('/(private)/location')}>
                        <Text style={styles.fabLabel}>Google Maps</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.fab, styles.fabForm]}
                        onPress={() => router.push('/(private)/formCity')}>
                        <Text style={styles.fabLabel}>+ Cidade</Text>
                    </Pressable>
                </View>
            </View>

            {!isPortrait && cidade && (
                <View style={styles.cityInfoContainer}>
                    <CityInfo cidade={cidade} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f6',
        padding: 16,
    },
    listContainerPortrait: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    listContainerLandscape: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    fab: {
        width: 154,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        elevation: 4,
    },
    fabLocation: {
        backgroundColor: '#6200ea',
    },
    fabForm: {
        backgroundColor: '#03dac5',
    },
    fabLabel: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    cityInfoContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 4,
    },
});
