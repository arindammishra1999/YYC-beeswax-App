import {
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    serverTimestamp,
    setDoc,
    startAfter,
    Timestamp,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";

async function getReviewsByProductId(
    productId: string,
    userId?: string,
    lastVisible?: QueryDocumentSnapshot,
) {
    const col = collection(db, "products", productId, "reviews");
    const constraints: QueryConstraint[] = [];
    if (userId) {
        constraints.push(orderBy("userId"));
        constraints.push(where("userId", "!=", userId));
    }
    if (lastVisible) {
        constraints.push(startAfter(lastVisible));
    }
    constraints.push(orderBy("lastUpdated", "desc"));
    constraints.push(limit(4));
    const querySnap = await getDocs(query(col, ...constraints));
    return {
        lastVisible: querySnap.docs.at(-1),
        reviews: querySnap.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as IReview;
        }),
    };
}

async function getReviewByUserId(productId: string, userId: string) {
    const docSnap = await getDoc(
        doc(db, "products", productId, "reviews", userId),
    );
    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data(),
        } as IReview;
    }
}

async function setReviewByUserId(
    productId: string,
    userId: string,
    review: Partial<IReview>,
) {
    const reviewRef = doc(db, "products", productId, "reviews", userId);
    await setDoc(reviewRef, review, { merge: true });
}

export async function updateReviewAggregation(
    productId: string,
    rating: number,
    oldRating?: number,
) {
    if (oldRating && oldRating == rating) {
        return;
    }
    try {
        const reviewRef = doc(db, "products", productId);
        await setDoc(
            reviewRef,
            {
                reviews: {
                    [rating]: increment(1),
                    ...(oldRating && { [oldRating]: increment(-1) }),
                },
            },
            { merge: true },
        );
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export function useReviewsByProductId(id: string) {
    const [userReview, setUserReview] = useState<IReview>();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot>();

    const { user } = useUser();

    useEffect(() => {
        (async () => {
            if (user) {
                setUserReview(await getReviewByUserId(id, user.uid));
            }
            const { reviews, lastVisible } = await getReviewsByProductId(
                id,
                user?.uid,
            );
            setLastVisible(lastVisible);
            setReviews(reviews);
        })();
    }, []);

    const getMoreReviews = async () => {
        if (lastVisible) {
            const data = await getReviewsByProductId(
                id,
                user?.uid,
                lastVisible,
            );
            setLastVisible(data.lastVisible);
            setReviews((prev) => {
                return [...prev, ...data.reviews];
            });
        }
    };

    function updateUserReview(review: {
        title: string;
        review: string;
        rating: number;
    }) {
        if (user) {
            updateReviewAggregation(id, review.rating, userReview?.rating);
            setReviewByUserId(id, user.uid, {
                ...review,
                userId: user.uid,
                username: "",
                lastUpdated: serverTimestamp(),
            });
            setUserReview({
                ...review,
                userId: user.uid,
                username: "",
                lastUpdated: Timestamp.fromDate(new Date()),
            });
        }
    }

    return { userReview, reviews, getMoreReviews, updateUserReview };
}
