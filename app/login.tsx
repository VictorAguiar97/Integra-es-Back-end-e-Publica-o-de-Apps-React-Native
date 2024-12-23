import { Image, Pressable, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import TextField from '../components/input/TextField.tsx';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import { UserActionType, UserContext, UserDispatchContext } from '../store/UserStore.tsx';
import env from '@/constants/env.ts';
import { stylesLogin } from '../styles/Login.style.ts';

export default function LoginScreen() {

    const userAuth = useContext(UserContext);
    const userAuthDispatch = useContext(UserDispatchContext);

    const [inputUser, setInputUser] = useState<string>(userAuth?.email ?? "");
    const [inputPassword, setInputPassword] = useState<string>(userAuth?.password ?? "");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");
    const [isLoading, setLoading] = useState(false);

    const loginSubmit = async () => {
        setLoading(true);
        try {
            setInputUserFeedback("");
            setInputPasswordFeedback("");
            if (inputUser && inputPassword) {
                const apiKey = env.API_KEY;
                const apiUrl = env.API_URL;
                const response = await fetch(`${apiUrl}/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: inputUser,
                        password: inputPassword,
                        returnSecureToken: true,
                    })
                });
                const { status } = response;
                if (status == 200) {
                    const body = await response.json();

                    userAuthDispatch({
                        type: UserActionType.LOGAR,
                        user: {
                            email: body.email,
                            password: inputPassword,
                            token: body.idToken,
                        }
                    });
                    router.push('/(private)');
                } else if (status == 400) {
                    const body = await response.json(); 7

                    if (body.error.message == "INVALID_LOGIN_CREDENTIALS") {

                        Alert.alert(`Email ou Senha Invalidos!`);
                    } else {

                        Alert.alert(`${body.error.message}`);
                    }
                } else {
                    Alert.alert(`Status ${status}`);
                }
            } else {
                if (!inputUser) setInputUserFeedback("Preencha campo usuario.");
                if (!inputPassword) setInputPasswordFeedback("Preencha campo senha.");
            }
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={stylesLogin.container}>
            <View style={stylesLogin.card}>
                <Text style={stylesLogin.title}>Bem-vindo!</Text>
                <Text style={stylesLogin.subtitle}>Faça login para continuar</Text>
                <TextField
                    placeholder="Usuário"
                    value={inputUser}
                    onChangeText={setInputUser}
                    feedback={inputUserFeedback}
                    editable={!isLoading}
                />
                <TextField
                    placeholder="Senha"
                    value={inputPassword}
                    onChangeText={setInputPassword}
                    feedback={inputPasswordFeedback}
                    isPassword
                    editable={!isLoading}
                />
                {!isLoading && <Pressable style={stylesLogin.button} onPress={loginSubmit}>
                    <Text style={stylesLogin.buttonText}>Acessar</Text>
                </Pressable>}
                {isLoading && <ActivityIndicator size='large' />}
            </View>
        </View>
    );
}