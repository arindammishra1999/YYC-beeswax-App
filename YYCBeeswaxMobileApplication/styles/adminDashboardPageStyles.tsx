import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const adminDashboardPageStyles = StyleSheet.create({
    page: {
        backgroundColor: colors.lightGrey,
        height: "90%",
    },
    header: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 100,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "500",
        paddingBottom: 3.5,
    },
    button: {
        width: "35%",
        padding: 8,
    },
    cardContainer: {
        height: 350,
        flex: 1,
        width: "90%",
        marginHorizontal: "5%",
        alignItems: "center",
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 15,
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    overviewSection: {
        width: "40%",
        margin: "5%",
        zIndex: -1,
    },
    overviewText: {
        color: colors.mediumGrey,
        fontWeight: "bold",
        fontSize: 12,
    },
    figure: {
        alignItems: "center",
        justifyContent: "center",
    },
    figureText: {
        fontWeight: "900",
        fontSize: 35,
    },
    arrow: {
        fontSize: 20,
        fontWeight: "bold",
    },
    change: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        borderRadius: 4,
        paddingHorizontal: 5,
    },
    changePositive: {
        backgroundColor: colors.greenTransparent,
        color: colors.green,
    },
    changeNegative: {
        backgroundColor: colors.redTransparent,
        color: colors.red,
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "90%",
        paddingVertical: 15,
        marginHorizontal: "5%",
    },
    dropdown: {
        position: "absolute",
        zIndex: 9,
        width: 150,
        height: 300,
        backgroundColor: colors.white,
    },
});
