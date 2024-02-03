import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const editProfilePageStyles = StyleSheet.create({
    icon: {
        paddingVertical: 10,
        alignSelf: "center",
        fontSize: 110,
    },
    emailNotVerifiedBox: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        margintop: 10,
        marginBottom: 20,
        width: "90%",
        alignSelf: "center",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
    },
    emailNotVerifiedText: {
        textAlign: "center",
        fontSize: 14,
        color: colors.red,
        paddingBottom: 15,
        fontWeight: "bold",
    },
    verifyEmailButton: {
        alignSelf: "center",
        width: "80%",
        backgroundColor: colors.yellow,
        padding: 15,
        borderRadius: 30,
    },
    verifyEmailText: {
        alignSelf: "center",
        fontWeight: "bold",
    },
    emailVerifiedText: {
        textAlign: "center",
        fontSize: 14,
        paddingTop: 15,
        color: colors.green,
        fontWeight: "bold",
    },
    form: {
        paddingBottom: 25,
        gap: 15,
        paddingHorizontal: 10,
    },
    changePassword: {
        alignSelf: "center",
        fontSize: 20,
    },
    confirmButton: {
        position: "absolute",
        bottom: "5%",
        alignSelf: "center",
        width: "80%",
    },
});
