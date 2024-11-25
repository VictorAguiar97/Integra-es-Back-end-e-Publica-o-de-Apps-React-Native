import { StyleSheet, View } from 'react-native';
import Cidade from "@/models/Cidade";
import CityInfo from '@/components/CityInfo';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

export default function CidadePage() {

    const { cidade: id } = useLocalSearchParams<{ cidade?: string }>();
    const [cidade, setCidade] = useState<Cidade | null>(null);
    const navigation = useNavigation();
    navigation.setOptions({ title: `Cidade #${id}` });

    
    useEffect(() => {
        const cidades = require('@/assets/mock.json');
        for (let cidd of cidades) {
            if (cidd.id == id) {
                setCidade(cidd);
                break;
            }
        }
    }, []);

    return (
        <View style={styles.container}>
            {cidade && <CityInfo cidade={cidade} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 15,
        flexDirection: 'row',
    }
});