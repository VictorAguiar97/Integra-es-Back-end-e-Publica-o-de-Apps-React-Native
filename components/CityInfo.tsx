import { StyleSheet, Text, View } from 'react-native';
import Cidade from "@/models/Cidade";
import LocationsList from './LocationsList';

export default function CityInfo(props: { cidade: Cidade }) {
    const { cidade } = props;
    const { nome, pais, pontos } = cidade;
    return (
        <View style={styles.cityInfoContainer}>
            <View style={styles.cityHeader}>
                <Text style={styles.cityName}>{nome}</Text>
                <Text style={styles.cityCountry}>{pais}</Text>
            </View>
            {pontos && <LocationsList pontos={cidade?.pontos} />}
        </View>
    );
};

const styles = StyleSheet.create({
    cityInfoContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityHeader: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    cityName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    cityCountry: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
    },
});


