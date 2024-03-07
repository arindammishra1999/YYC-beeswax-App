import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";

export const adminDashboardPageStyles = StyleSheet.create({
    page: {
        backgroundColor: colors.lightGrey,
    },
    header: {
        backgroundColor: colors.white,
        height: 80,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "500",
        paddingBottom: 3.5,
        fontFamily: fonts.main,
    },
    button: {
        width: "35%",
        padding: 8,
    },
    cardContainer: {
        flex: 1,
        width: "90%",
        marginHorizontal: "5%",
        paddingBottom: 5,
        alignItems: "center",
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 15,
        marginVertical: 15,
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
        fontSize: 12,
        fontFamily: fonts.mainBold,
    },
    figure: {
        alignItems: "center",
        justifyContent: "center",
    },
    figureText: {
        fontSize: 35,
        fontFamily: fonts.mainBold,
    },
    arrow: {
        fontSize: 20,
        fontFamily: fonts.mainBold,
    },
    change: {
        alignSelf: "flex-start",
        borderRadius: 4,
        paddingHorizontal: 5,
        overflow: "hidden",
        fontFamily: fonts.mainBold,
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
        top: 45,
        zIndex: 9,
        width: "100%",
        height: 300,
        backgroundColor: colors.white,
    },
    subTitle: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        marginHorizontal: "5%",
        justifyContent: "space-between",
        zIndex: -1,
    },
    productCard: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: viewportWidth * 0.81,
        marginHorizontal: "5%",
        marginVertical: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productName: {
        fontSize: 16,
        alignSelf: "center",
        maxWidth: 140,
        flexWrap: "wrap",
        fontFamily: fonts.main,
    },
    productInfo: {
        flexDirection: "row",
        columnGap: 20,
    },
    productEarnings: {
        fontSize: 16,
        alignSelf: "center",
        fontFamily: fonts.mainBold,
    },
    graphContainer: {
        width: "90%",
        zIndex: -1,
    },
    spinnerOverlay: {
        height: "60%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    bottom: {
        marginBottom: "20%",
    },
});
