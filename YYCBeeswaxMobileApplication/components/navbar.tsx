import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import CartPage from "@/app/dashboard/CartPage";
import HomePage from "@/app/dashboard/HomePage";
import MorePage from "@/app/dashboard/MorePage";
import ProfilePage from "@/app/dashboard/ProfilePage";
import {
    CART_ROUTE,
    HOMEPAGE_ROUTE,
    MORE_ROUTE,
    PROFILE_ROUTE,
} from "@/consts/constants";
import { colors } from "@/consts/styles";

const Tab = createBottomTabNavigator();

export default function Navbar() {
    return (
        <Tab.Navigator
            initialRouteName={HOMEPAGE_ROUTE}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName = "";
                    if (route.name === HOMEPAGE_ROUTE) {
                        iconName = "home";
                    } else if (route.name === CART_ROUTE) {
                        iconName = "shopping-cart";
                    } else if (route.name === MORE_ROUTE) {
                        iconName = "layers";
                    } else if (route.name === PROFILE_ROUTE) {
                        iconName = "account-circle";
                    }
                    return <Icon name={iconName} color={color} size={38} />;
                },
                tabBarActiveTintColor: colors.yellow,
                tabBarInactiveTintColor: colors.black,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { height: "9%" },
            })}
        >
            <Tab.Screen name={HOMEPAGE_ROUTE} component={HomePage} />
            <Tab.Screen name={CART_ROUTE} component={CartPage} />
            <Tab.Screen name={MORE_ROUTE} component={MorePage} />
            <Tab.Screen name={PROFILE_ROUTE} component={ProfilePage} />
        </Tab.Navigator>
    );
}
