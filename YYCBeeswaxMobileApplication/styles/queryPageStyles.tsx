import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";

export const queryPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    display: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    extraSpace: {
        height: viewportWidth,
    },
    messageText: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 21,
        fontWeight: "bold",
        marginTop: "40%",
        marginLeft: "10%",
        marginRight: "10%",
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "15%",
        marginLeft: "25%",
        marginRight: "25%",
    },
    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
});
