import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";

import Button from "@/components/button";
import AdminOverviewCard from "@/components/cards/adminOverviewCard";
import AdminPopularProductsCard from "@/components/cards/adminPopularProducts";
import AdminSalesCard from "@/components/cards/adminSalesCard";
import Popup from "@/components/popup";
import { colors } from "@/consts/styles";
import { auth } from "@/firebase/config";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function AdminDashboardPage() {
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
    const [logoutSpinner, setLogoutSpinner] = useState(false);

    async function logout() {
        try {
            setLogoutSpinner(true);
            setLogoutPopupVisible(false);
            await signOut(auth);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLogoutSpinner(false);
        }
        router.replace("/");
    }
    return (
        <View style={mainStyles.container}>
            {logoutSpinner && (
                <View style={mainStyles.spinnerOverlay}>
                    <ActivityIndicator size="large" color={colors.yellow} />
                </View>
            )}
            <View style={adminDashboardPageStyles.header}>
                <Text style={adminDashboardPageStyles.headerTitle}>
                    Dashboard
                </Text>
                <Button
                    title="Sign Out"
                    style={adminDashboardPageStyles.button}
                    onPress={() => setLogoutPopupVisible(true)}
                />
            </View>
            <ScrollView style={adminDashboardPageStyles.page}>
                <AdminOverviewCard />
                <AdminSalesCard />
                <AdminPopularProductsCard />
                <Popup
                    subTitle="Are you sure you want to logout? This will take you back
                    to the login screen."
                    option1Text="No"
                    option2Text="Yes"
                    visible={logoutPopupVisible}
                    changeVisibility={() => setLogoutPopupVisible(false)}
                    option1Action={() => setLogoutPopupVisible(false)}
                    option2Action={logout}
                />
            </ScrollView>
        </View>
    );
}