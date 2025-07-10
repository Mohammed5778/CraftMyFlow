
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { CommunityPost } from '../types';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBpYxSx0MYQ6c_RRSOLvqEEWkKOMq5Zg0", // This is a public demo key
    authDomain: "sign-b2acd.firebaseapp.com",
    databaseURL: "https://sign-b2acd-default-rtdb.firebaseio.com",
    projectId: "sign-b2acd",
    storageBucket: "sign-b2acd.appspot.com",
    messagingSenderId: "1039449385751",
    appId: "1:1039449385751:web:e63d9b04d5698595922552",
};

// Initialize Firebase
// Check if firebase is already initialized to avoid errors
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const database = firebase.database();

export const addCommunityPost = (postData: Omit<CommunityPost, 'id' | 'createdAt'>) => {
    const postWithTimestamp = {
        ...postData,
        createdAt: new Date().toISOString(),
    };
    return database.ref('communityPosts').push(postWithTimestamp);
};

export const getCommunityPosts = (callback: (posts: CommunityPost[]) => void) => {
    const postsRef = database.ref('communityPosts');
    postsRef.on('value', (snapshot) => {
        const posts: CommunityPost[] = [];
        snapshot.forEach((childSnapshot) => {
            posts.push({
                id: childSnapshot.key!,
                ...childSnapshot.val(),
            });
        });
        callback(posts.reverse()); // Show newest first
    });
    return () => postsRef.off('value');
};


export const approveCommunityPost = (postId: string) => {
    return database.ref(`communityPosts/${postId}`).update({ isApproved: true });
};
