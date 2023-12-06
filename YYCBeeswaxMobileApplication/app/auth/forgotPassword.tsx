import { useState } from 'react';
import { Text, View } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "@/firebase/config";
import { Fontisto } from '@expo/vector-icons';
import Button from '@/components/button'
import Header from "@/components/header";
import Input from '@/components/input';
import { forgotPageStyles } from "@/styles/forgotPageStyles";

export default function App() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    async function confirm() {
        try {
            await sendPasswordResetEmail(auth, email);
            //USE NAVIGATION TO RETURN BACK TO LOGIN
        } catch (err: any) {
            if (err?.code == "auth/missing-email") {
                setError('Password Reset Failed - Enter your email.');
            } else if (err?.code == "auth/invalid-email") {
                setError('Password Reset Failed - Enter a valid email.');
            } else {
                setError('Password Reset Failed');
            }
        }
    }

    return (
        <View style={forgotPageStyles.container}>
            <Header header={'Forgot Password'}/>
            <View style={forgotPageStyles.form}>
                <Fontisto name="locked" size={80} color="black" style={forgotPageStyles.logo}/>
                <Text style={forgotPageStyles.text}>Please enter your email address to receive a link to reset your password. You will then be prompted to login.</Text>
                <Input label={'Email'} placeholder='Enter your email' value={email} onChangeText={setEmail}/>
                {error && <Text style={forgotPageStyles.error}>{error}</Text>}
            </View>
            <Button title={'Confirm'} onPress={confirm}/>
        </View>
    )
}