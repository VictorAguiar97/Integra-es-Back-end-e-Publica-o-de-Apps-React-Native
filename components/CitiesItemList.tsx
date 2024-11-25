import { View, Text, StyleSheet, Pressable } from "react-native";
import Cidade from "@/models/Cidade";

export default function CitiesItemList(props: {
    item: Cidade | null,
    onSelected: (cidade: Cidade) => void
}) {
    const { item, onSelected } = props;
    const { nome, pais, atualizado } = item as Cidade;
    const atualizadoFormat = new Date(atualizado).toLocaleDateString("pt-BR");
    return (
        <Pressable style={styles.itemListContainer} onPress={() => onSelected(item as Cidade)}>
            <View style={styles.itemListHeader}>
                <Text style={styles.itemListHeaderText}>{nome}</Text>
                <Text style={styles.itemListHeaderText}>{pais}  </Text>
            </View>
            <View style={styles.itemListContent}>
                <Text style={styles.itemListContentText}>{`${atualizadoFormat}`}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        marginVertical: 5, 
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        width: '100%',
    },
    itemListHeader: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    },
    itemListHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemListContent: {
        flex: 1,
        justifyContent: 'center',
    },
    itemListContentText: {
        fontSize: 14,
        color: '#666',
    },
});
