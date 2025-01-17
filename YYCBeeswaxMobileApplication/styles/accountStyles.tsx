import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const accountStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
        alignContent: "space-between",
        backgroundColor: colors.white,
    },
    formContainer: {
        backgroundColor: colors.white,
        flexGrow: 1,
        paddingBottom: 10,
        alignContent: "space-between",
        marginBottom: 10,
    },
    form: { flex: 1, paddingTop: 10, gap: 20, paddingHorizontal: 10 },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: fonts.main,
    },
    header: {
        fontSize: 20,
        alignSelf: "center",
        fontFamily: fonts.main,
    },
    textInput: {
        fontSize: 18,
        color: colors.darkGrey,
        flex: 1,
        fontFamily: fonts.main,
    },
    inputContainer: {
        backgroundColor: colors.darkWhite,
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },
    error: {
        color: colors.red,
        alignSelf: "center",
    },
    forgot: {
        alignSelf: "center",
        color: colors.blue,
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: fonts.main,
    },
});
