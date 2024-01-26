import { useIsFocused } from "@react-navigation/core";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import Header from "@/components/header";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { loginPageStyles } from "@/styles/loginPageStyles";
import { profileDataPageStyles } from "@/styles/profileDataPageStyles";

export default function ProfileDataPage() {
    const [userDetails, setUserDetails] = useState<IUser>({
        email: "Loading",
        firstName: "Loading",
        lastName: "Loading",
    });

    const { user } = useUser();

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            if (user?.uid) {
                const userDetails = await getUserById(user.uid);
                if (userDetails) {
                    setUserDetails(userDetails);
                    return;
                }
            }
            setUserDetails({
                email: "Not Found",
                firstName: "Not Found",
                lastName: "Not Found",
            });
        })();
    }, [isFocused]);

    return (
        <View style={accountStyles.container}>
            <Header header="User Profile" />
            <View style={profileDataPageStyles.mainContainer}>
                <View style={profileDataPageStyles.dataContainer}>
                    <Text style={profileDataPageStyles.mainText}>
                        First Name:
                    </Text>
                    <Text style={profileDataPageStyles.text}>
                        {userDetails.firstName}
                    </Text>
                    <Text style={profileDataPageStyles.mainText}>
                        Last Name:
                    </Text>
                    <Text style={profileDataPageStyles.text}>
                        {userDetails.lastName}
                    </Text>
                    <Text style={profileDataPageStyles.mainText}>Email:</Text>
                    <Text style={profileDataPageStyles.text}>
                        {userDetails.email}
                    </Text>
                </View>
                <View style={profileDataPageStyles.buttonContainer}>
                    <Link href="/dashboard/EditProfilePage" asChild>
                        <Text style={loginPageStyles.forgot}>Edit Profile</Text>
                    </Link>
                    <Link href="/dashboard/ChangePasswordPage" asChild>
                        <Text style={loginPageStyles.forgot}>
                            Change password
                        </Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}
