import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: ColorsConstants.backgroundColor,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        padding: 8,
        backgroundColor: ColorsConstants.backgroundColor,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
    },
    button: {
        marginTop: 24,
        padding: 12,
        borderRadius: 8,
        backgroundColor: ColorsConstants.backgroundColor,
        alignItems: 'center',
    },
    buttonText: {
        color: FontConstans.color,
        fontSize: 16,
        fontWeight: 'bold',
    },
});