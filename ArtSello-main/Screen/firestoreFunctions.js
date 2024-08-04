import { collection, addDoc, serverTimestamp, getDocs, where, query, doc, getDoc, orderBy, } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore } from '../firebase';
import { Alert } from 'react-native';


const getReviewsForProduct = async (productId) => {
  try {
    const reviewsCollection = collection(firestore, 'reviews');

    // Query reviews for the specific product ID
    const q = query(
      reviewsCollection,
      where('productId', '==', productId),
      orderBy('createdAt', 'desc') // Optional: Order reviews by timestamp (newest first)
    );

    const querySnapshot = await getDocs(q);

    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return reviews;
  } catch (error) {
    console.error('Error getting reviews for product:', error);
    throw error;
  }
};


const reviewsCollection = collection(firestore, 'reviews');

const addReviewToFirestore = async (productId, reviewDetails) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn('No user is currently authenticated');
      return;
    }

    const existingReviewsQuery = query(
      reviewsCollection,
      where('productId', '==', productId),
      where('userId', '==', currentUser.uid)
    );

    const existingReviewsSnapshot = await getDocs(existingReviewsQuery);

    if (!existingReviewsSnapshot.empty) {
      console.warn('User has already reviewed this product');
      // Optionally, you can provide user feedback here (e.g., show a message)
      return;
    }

    const userDocRef = doc(firestore, 'Users', currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      reviewDetails.userName = userData.username || currentUser.displayName || 'Anonymous';
      reviewDetails.userEmail = currentUser.email;
    } else {
      reviewDetails.userName = currentUser.displayName || 'Anonymous';
      reviewDetails.userEmail = currentUser.email;
    }

    reviewDetails.createdAt = serverTimestamp();
    reviewDetails.productId = productId;
    reviewDetails.userId = currentUser.uid;

    const docRef = await addDoc(reviewsCollection, reviewDetails);

    console.log('Review added with ID:', docRef.id);

    // Show an alert after successfully adding the review
    Alert.alert(
      'Review Submitted',
      'Thank you for submitting your review!',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );

    // You can choose to show an alert or handle success in your component if needed

    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);

    // Show an alert for the error
    Alert.alert(
      'Error',
      'There was an error submitting your review. Please try again later.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );

    throw error;
  }
};


const addToFavorites = async (product) => {
  try {
    const favoritesCollection = collection(firestore, 'Favorites');
    const docRef = await addDoc(favoritesCollection, product);
    console.log('Product added to Favorites with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding product to Favorites: ', error);
  }
};

export { addToFavorites, addReviewToFirestore, getReviewsForProduct };

