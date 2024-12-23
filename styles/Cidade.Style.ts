import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsConstants.backgroundColor,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: FontConstans.color,
    },
    card: {
        marginVertical: 16,
        borderRadius: 8,
        elevation: 4,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        color: FontConstans.color,
    },
    highlight: {
        fontWeight: 'bold',
        color: FontConstans.color,
    },
    cardActions: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
});