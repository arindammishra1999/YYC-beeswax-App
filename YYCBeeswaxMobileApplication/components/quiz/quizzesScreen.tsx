import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { DateTime } from "luxon";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/button";
import Skeleton from "@/components/skeleton";
import { colors } from "@/consts/styles";
import { useUser } from "@/firebase/providers/userProvider";
import { useQuizzesStore } from "@/firebase/store/quizzesStore";
import { mainStyles } from "@/styles/mainStyles";
import { quizzesPageStyles } from "@/styles/quizzesPageStyles";

const TMP_IMG =
    "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7";

function LoadingQuizCard() {
    return (
        <View style={quizzesPageStyles.card}>
            <View style={quizzesPageStyles.imageContainer}>
                <Skeleton style={quizzesPageStyles.image} />
            </View>
            <View style={quizzesPageStyles.textContainer}>
                <View style={quizzesPageStyles.textGroup}>
                    <Skeleton height={24} />
                    <Skeleton height={16} width="80%" />
                </View>
                <View style={quizzesPageStyles.detailsContainer}>
                    <Skeleton height={20} width="40%" />
                    <Skeleton height={20} width="30%" />
                </View>
            </View>
        </View>
    );
}

function QuizCard({ quiz }: { quiz: IQuiz }) {
    const { isAdmin } = useUser();
    return (
        <TouchableOpacity
            style={quizzesPageStyles.card}
            onPress={() =>
                router.push(
                    `/quizzes/${quiz.type.toLowerCase()}/${
                        quiz.id
                    }` as Href<any>,
                )
            }
        >
            <View style={quizzesPageStyles.imageContainer}>
                <Image
                    source={{
                        uri: TMP_IMG,
                    }}
                    style={quizzesPageStyles.image}
                />
                <Text style={quizzesPageStyles.imageText}>
                    {quiz.questions.length} questions
                </Text>
            </View>
            <View style={quizzesPageStyles.textContainer}>
                <View style={quizzesPageStyles.headingContainer}>
                    <View style={mainStyles.flex}>
                        <Text style={quizzesPageStyles.title}>
                            {quiz.title}
                        </Text>
                        <Text style={quizzesPageStyles.subText}>
                            {quiz.type} Quiz
                        </Text>
                    </View>
                    {isAdmin && (
                        <TouchableOpacity
                            onPress={() =>
                                router.push(
                                    `/quizzes/${quiz.type.toLowerCase()}/${
                                        quiz.id
                                    }/SetQuiz` as Href<any>,
                                )
                            }
                        >
                            <Feather
                                name="edit"
                                size={24}
                                style={quizzesPageStyles.editIcon}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={quizzesPageStyles.detailsContainer}>
                    <Text style={quizzesPageStyles.subText}>
                        {DateTime.fromJSDate(
                            quiz.created.toDate(),
                        ).toRelative()}
                    </Text>
                    <Text style={quizzesPageStyles.countContainer}>
                        {quiz.plays} Plays
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export function QuizzesScreen() {
    const quizzes = useQuizzesStore((state) => state.quizzes);
    const loading = useQuizzesStore((state) => state.loading);
    const getMoreQuizzes = useQuizzesStore((state) => state.getMoreQuizzes);

    const { isAdmin } = useUser();

    useEffect(() => {
        getMoreQuizzes();
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <>
            {isAdmin && (
                <View style={quizzesPageStyles.adminContainer}>
                    <Button
                        title="Create Personality Quiz"
                        style={quizzesPageStyles.adminButton}
                        textStyle={mainStyles.centerText}
                        onPress={() =>
                            router.push(`/quizzes/personality/create/SetQuiz`)
                        }
                    />
                    <Button
                        title="Create Knowledge Quiz"
                        style={quizzesPageStyles.adminButton}
                        textStyle={mainStyles.centerText}
                        onPress={() =>
                            router.push(`/quizzes/knowledge/create/SetQuiz`)
                        }
                    />
                </View>
            )}
            {loading ? (
                <FlashList
                    contentContainerStyle={quizzesPageStyles.container}
                    renderItem={() => <LoadingQuizCard />}
                    ItemSeparatorComponent={() => (
                        <View style={quizzesPageStyles.cardSpacing} />
                    )}
                    data={Array(6)}
                    estimatedItemSize={100}
                />
            ) : (
                <FlashList
                    contentContainerStyle={quizzesPageStyles.container}
                    renderItem={({ item }) => <QuizCard quiz={item} />}
                    ItemSeparatorComponent={() => (
                        <View style={quizzesPageStyles.cardSpacing} />
                    )}
                    data={quizzes}
                    estimatedItemSize={100}
                    onScrollEndDrag={getMoreQuizzes}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.yellow}
                        />
                    }
                />
            )}
        </>
    );
}