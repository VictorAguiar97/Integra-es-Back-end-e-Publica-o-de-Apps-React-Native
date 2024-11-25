import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import TextField from '@/components/input/TextField';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {

    const [inputUser, setInputUser] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");

    const loginSubmit = () => {
        setInputUserFeedback("");
        setInputPasswordFeedback("");
        if (inputUser && inputPassword) {
            router.push('/(private)');
        } else {
            if (!inputUser) setInputUserFeedback("Preencha este campo.");
            if (!inputPassword) setInputPasswordFeedback("Preencha este campo.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>
                <TextField
                    placeholder="Usuário"
                    value={inputUser}
                    onChangeText={setInputUser}
                    feedback={inputUserFeedback}
                />
                <TextField
                    placeholder="Senha"
                    value={inputPassword}
                    onChangeText={setInputPassword}
                    feedback={inputPasswordFeedback}
                    isPassword
                />
                <Pressable style={styles.button} onPress={loginSubmit}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f6',
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
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
        textAlign: 'center',
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
        color: '#fff',
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