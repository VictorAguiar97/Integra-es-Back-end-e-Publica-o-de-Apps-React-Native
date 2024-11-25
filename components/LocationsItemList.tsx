import { View, Text, StyleSheet } from "react-native";
import Pontos from "@/models/Pontos";

export default function LocationsItemList({ item }: any) {
    const { nome, latitude, longitude } = item as Pontos;
    return (
        <View style={styles.itemListContainer}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>{nome}</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.coordinatesRow}>
                        <Text style={styles.coordinatesLabel}>Latitude:</Text>
                        <Text style={styles.coordinatesValue}>{latitude}</Text>
                    </View>
                    <View style={styles.coordinatesRow}>
                        <Text style={styles.coordinatesLabel}>Longitude:</Text>
                        <Text style={styles.coordinatesValue}>{longitude}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemListContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
        padding: 15,
    },
    cardHeader: {
        marginBottom: 10,
    },
    cardHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardContent: {
        marginTop: 10,
    },
    coordinatesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    coordinatesLabel: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    coordinatesValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '400',
    },
});  
