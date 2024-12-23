import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const stylesLogin = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorsConstants.backgroundColor,
        padding: 20,
    },
    logoContainer: {
        marginBottom: 30,
    },
    logo: {
        width: 150,
        height: 150,
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: FontConstans.sizeTitleLogin,
        color: FontConstans.color,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: FontConstans.familyRegular,
    },
    subtitle: {
        fontSize: FontConstans.sizeSubtitleLogin,
        color: FontConstans.color,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: FontConstans.familyRegular,
    },
    input: {
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#f4f4f6',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#ffb700',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: FontConstans.color,
        fontFamily: FontConstans.familyRegular,
        fontWeight: 'bold',
        fontSize: 16,
    },
    forgotPassword: {
        marginTop: 15,
        alignSelf: 'center',
    },
    forgotPasswordText: {
        color: '#ffb700',
        fontSize: 14,
    },
});