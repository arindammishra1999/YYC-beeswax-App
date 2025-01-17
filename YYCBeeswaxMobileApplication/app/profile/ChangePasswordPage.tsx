import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Keyboard,
    Modal,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import HideableInput from "@/components/hideableInput";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { changePasswordPageStyles } from "@/styles/changePasswordPageStyles";

export default function ChangePasswordPage() {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successfulPopupVisible, setSuccessfulPopupVisible] = useState(false);
    const [reloginPopupVisible, setReloginPopupVisible] = useState(false);

    const { user } = useUser();

    async function changePassword() {
        try {
            if (!user) {
                setError("Password Reset Failed - Invalid user");
                return;
            }
            if (password == "") {
                setError("Password Reset Failed - Passwords is empty");
                return;
            }
            if (password != confirmPassword) {
                setError("Password Reset Failed - Passwords do not match");
                return;
            }
            await updatePassword(user, password);
            setSuccessfulPopupVisible(true);
        } catch (err: any) {
            console.log(err);
            if (err?.code == "auth/weak-password") {
                setError("Password Reset Failed - Weak Password");
            } else if (err?.code == "auth/requires-recent-login") {
                setReloginPopupVisible(true);
            } else {
                setError("Password Reset Failed");
            }
        }
    }

    async function changePasswordWithRelogin() {
        try {
            setReloginPopupVisible(false);
            if (!user?.email) {
                setError("Password Reset Failed - Invalid user");
                return;
            }
            const cred = EmailAuthProvider.credential(
                user.email,
                currentPassword,
            );
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, password);
            setSuccessfulPopupVisible(true);
        } catch (err: any) {
            console.log(err);
            if (err?.code == "auth/weak-password") {
                setError("Password Reset Failed - Weak Password");
            } else {
                setError("Password Reset Failed");
            }
        }
    }

    function returnToHome() {
        router.push("/dashboard/HomePage");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header header={t("Change Password")} />
                <ScrollView contentContainerStyle={accountStyles.formContainer}>
                    <View style={accountStyles.form}>
                        <Fontisto
                            name="locked"
                            size={80}
                            color="black"
                            style={accountStyles.logo}
                        />
                        <Text style={accountStyles.text}>
                            {t("Please enter your new password.")}
                        </Text>
                        <HideableInput
                            label={t("New Password")}
                            placeholder={t("Enter New Password")}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <HideableInput
                            label={t("Confirm New Password")}
                            placeholder={t("Renter New Password")}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        {error && (
                            <Text style={accountStyles.error}>{error}</Text>
                        )}
                    </View>
                    <Button title={t("Confirm")} onPress={changePassword} />
                </ScrollView>
                <Modal
                    animationType="slide"
                    visible={successfulPopupVisible}
                    transparent
                    onRequestClose={() => {
                        setSuccessfulPopupVisible(!successfulPopupVisible);
                    }}
                >
                    <View style={changePasswordPageStyles.viewContainer}>
                        <View style={changePasswordPageStyles.popupContainer}>
                            <Text style={changePasswordPageStyles.popupText}>
                                {t("Password reset successful! ")}
                            </Text>
                            <Button
                                title={t("Confirm")}
                                onPress={returnToHome}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    visible={reloginPopupVisible}
                    transparent
                    onRequestClose={() => {
                        setReloginPopupVisible(!reloginPopupVisible);
                    }}
                >
                    <View style={changePasswordPageStyles.viewContainer}>
                        <View style={changePasswordPageStyles.popupContainer}>
                            <Text style={changePasswordPageStyles.popupText}>
                                {t(
                                    "Please enter your old password for account verification.",
                                )}
                            </Text>
                            <HideableInput
                                label={t("Old Password")}
                                placeholder={t("Enter Old Password")}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <Button
                                title={t("Confirm")}
                                onPress={changePasswordWithRelogin}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
}
