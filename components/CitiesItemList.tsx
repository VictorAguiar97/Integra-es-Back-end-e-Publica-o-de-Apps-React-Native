import React from "react";
import { StyleSheet, View } from "react-native";
import { List, Divider, IconButton, useTheme } from "react-native-paper";
import Cidade from "../models/Cidade.tsx";

export default function CitiesItemList(props: {
    item: Cidade | null;
    onSelected: (cidade: Cidade) => void;
}) {
    const { item, onSelected } = props;

    if (!item) return null;

    const { nome, pais, atualizado } = item;
    const atualizadoFormat = new Date(atualizado).toLocaleDateString("pt-BR");

    const theme = useTheme();

    return (
        <View style={styles.container}>
            <List.Item
                style={[styles.itemListContainer, { backgroundColor: theme.colors.background }]}
                title={nome}
                description={`${pais} | Atualizado: ${atualizadoFormat}`}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                left={() => (
                    <List.Icon
                        icon="city"
                        color={theme.colors.primary}
                        style={styles.icon}
                    />
                )}
                right={() => (
                    <IconButton
                        icon="arrow-right-bold-circle"
                        iconColor={theme.colors.primary}
                        size={28}
                        onPress={() => onSelected(item)}
                    />
                )}
            />
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    itemListContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    description: {
        fontSize: 14,
        color: "#666",
    },
    icon: {
        margin: 0,
    },
});
