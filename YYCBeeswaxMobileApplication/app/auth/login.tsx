import React, {useState} from "react";
import {Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/config";
import {accountStyles} from "@/styles/accountStyles";
import Button from "@/components/button";
import {useLoginWithGoogle} from "@/firebase/loginWithGoogle";
import Header from "@/components/header";
import Input from "@/components/input";
import HideableInput from "@/components/hideableInput";
import {Link, router} from "expo-router";
import {loginPageStyles} from "@/styles/loginPageStyles";
import Divider from "@/components/divider";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {handleLoginGoogle} = useLoginWithGoogle()

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('../dashboard/HomePage')
        } catch (err: any) {
            if (err?.code === "auth/invalid-email") {
                setError('Login Failed - Enter a valid email.');
            } else if (err?.code === "auth/missing-password") {
                setError('Login Failed - Must input a password.');
            } else if (err?.code === "auth/invalid-login-credentials") {
                setError('Login Failed - Username or password did not match.');
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header header={'Login'}/>
                <View style={accountStyles.form}>
                    <Input label={'Email'} placeholder='Enter Email' value={email} onChangeText={setEmail} autoCapitalize={false}/>
                    <HideableInput label={'Password'} placeholder='Enter Password' value={password} onChangeText={setPassword}/>
                    <Link href='/auth/forgotPassword' asChild>
                        <Text style={loginPageStyles.forgot}>Forgot password?</Text>
                    </Link>
                    {error && <Text style={accountStyles.error}>{error}</Text>}
                </View>
                <Button title="Login" onPress={login}/>
                <Divider/>
                <Button title='Login with Google' onPress={handleLoginGoogle}/>
            </View>
        </TouchableWithoutFeedback>
    );
}
