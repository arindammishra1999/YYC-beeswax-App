import React, {useState} from "react";
import {Text, ScrollView, View} from "react-native";
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {accountStyles} from "@/styles/accountStyles";
import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import HideableInput from "@/components/hideableInput";
import {useRouter} from 'expo-router';
import {loginPageStyles} from "@/styles/loginPageStyles";

export default function signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const router = useRouter();

    async function signup() {
        try {
            const database = getDatabase();
            const auth = getAuth();

            // Validate if password and confirm password match
            if (password !== confirmedPassword) {
                setError('Passwords do not match');
                return; // Exit the function if passwords don't match
            }
            
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Save user info to the database
            const usersRef = ref(database, 'users'); // Reference to 'users' collection
            if (userCredential && userCredential.user) {
                const { uid } = userCredential.user;
                await push(usersRef, {
                    userId: uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                });
            }

            setSignupSuccess(true);
            setTimeout(()=>{
             setSignupSuccess(false);
             router.push('../login')
            },3000);

        }
        catch(error){
            console.error('Error creating user:', error);
            // Handle signup errors and update state
            setError('Error creating user. Please try again.');
        };
    }

    return (
        <ScrollView>
        <View style={accountStyles.container}>
            <Header header={'Create Account'}/>
            <View style={accountStyles.form}>
                <Input label={'First Name'} placeholder='Enter First Name' value={firstName} onChangeText={setFirstName}/>
                <Input label={'Last Name'} placeholder='Enter Last Name' value={lastName} onChangeText={setLastName}/>
                <Input label={'Email'} placeholder='Enter Email' value={email} onChangeText={setEmail}/>
                <HideableInput label={'Password'} placeholder='Enter Password' value={password} onChangeText={setPassword}/>
                <HideableInput label={'Password'} placeholder='Re-enter Password' value={confirmedPassword} onChangeText={setConfirmedPassword}/>
                {error && <Text style={accountStyles.error}>{error}</Text>}
                {signupSuccess && <Text>You have successfully signed up!</Text>}
            </View>
            <View style={loginPageStyles.space} /> 
            <Button title="Sign Up" onPress={signup}/>  
        </View>
        </ScrollView>
    );
}
