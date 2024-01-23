import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import { searchTerm } from "@/app/dashboard/HomePage";
import Header from "@/components/header";
import ProductSimpleCard from "@/components/productSimpleCard";
import { getProductData } from "@/firebase/getCollections/getProducts";
import { mainStyles } from "@/styles/mainStyles";
import { queryPageStyles } from "@/styles/queryPageStyles";

export default function SearchPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([] as any);
    useEffect(() => {
        getProductData().then((products) => {
            if (products) {
                setAllProducts(products);
            } else {
                console.log("Issue getting products");
            }
            setIsLoading(false);
        });
    }, []);

    //This is a temporary fix until we get access to the database.
    //This quickly filters out the products, only returning the products
    //that contain the catergory name in their name.
    const productsInCategory: any[] = [];
    if (allProducts) {
        let categoryName: string = searchTerm.toLowerCase();
        if (categoryName[categoryName.length - 1] == "s")
            categoryName = categoryName.substring(0, categoryName.length - 1);
        allProducts.forEach((product: any) => {
            const productName = product.data.name.toLowerCase();
            if (productName.includes(categoryName)) {
                productsInCategory.push(product);
            }
        });
    }

    if (isLoading) {
        return (
            <View style={mainStyles.spinnerOverlay}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (productsInCategory.length > 0) {
        return (
            <View style={queryPageStyles.container}>
                <Header header={"Results for: " + searchTerm} />
                <View>
                    <ScrollView contentContainerStyle={queryPageStyles.display}>
                        {productsInCategory.map((product: any) => (
                            <ProductSimpleCard
                                key={product.id}
                                image={product.data.url}
                                name={product.data.name}
                                price={product.data.price}
                                id={product.id}
                            />
                        ))}
                        <View style={queryPageStyles.extraSpace} />
                    </ScrollView>
                </View>
            </View>
        );
    } else {
        return (
            <View style={mainStyles.container}>
                <Header header="Search Results" />
                <Text style={queryPageStyles.messageText}>
                    Sorry, nothing was found for {searchTerm}.
                </Text>
                <TouchableOpacity
                    style={queryPageStyles.button}
                    onPress={() => router.push("/dashboard/HomePage")}
                >
                    <Text style={queryPageStyles.buttonText}>
                        Shop Other Products
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
