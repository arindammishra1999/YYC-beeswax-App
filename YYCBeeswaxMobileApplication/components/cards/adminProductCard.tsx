import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

type Props = {
    id: string;
    image: any;
    name: string;
    earnings: number;
};

export default function AdminProductCard(props: Props) {
    return (
        <View style={adminDashboardPageStyles.productCard}>
            <View style={adminDashboardPageStyles.productInfo}>
                <Image
                    contentFit="contain"
                    source={{ uri: props.image }}
                    style={adminDashboardPageStyles.productImage}
                />
                <Text style={adminDashboardPageStyles.productName}>
                    {props.name}
                </Text>
            </View>

            <Text style={adminDashboardPageStyles.productEarnings}>
                ${(Math.round(props.earnings * 100) / 100).toFixed(2)}
            </Text>
        </View>
    );
}