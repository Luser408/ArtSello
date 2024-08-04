import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import FooterComponent from '../Nav/Footer';
import { styles } from '../styles/cat_pro_styles';
import { addToFavorites, addReviewToFirestore,  getReviewsForProduct } from '../Screen/firestoreFunctions';
import { Linking } from 'react-native';



const ProductCard = ({ imageUrl, name, description, price, userContact, productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews for the specific product
    const fetchReviews = async () => {
      try {
        const productReviews = await getReviewsForProduct(productId);
        setReviews(productReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleWishlist = () => {
    console.log('Added to wishlist');
    const productDetails = {
      name,
      description,
      price,
      imageUrl,
      userContact, 
      // Add other details as needed
    };

    addToFavorites(productDetails);
  };

  const handleContact = () => {
    // Logic for handling contact button press
    const phoneNumber = userContact; // Assuming the userContact object has a 'phone' field

    if (phoneNumber) {
      const dialpadUrl = `tel:${phoneNumber}`;
      Linking.openURL(dialpadUrl)
        .then(() => console.log('Dialpad opened successfully'))
        .catch((error) => console.error('Error opening dialpad:', error));
    } else {
      console.warn('No phone number available for contact');
    }
  };

  const handleStarRating = (selectedRating) => {
    // Logic for handling star rating selection
    setRating(selectedRating);
  };

  const handleReviewChange = (text) => {
    // Logic for handling review input change
    setReview(text);
  };


  const handleSubmit = async () => {
    console.log('Submit button pressed');
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Contact Information:', userContact);
  
    try {
      const reviewDetails = {
        rating,
        review,
        // other review details...
      };
  
      // Pass the product ID to associate the review with the specific product
    const reviewId = await addReviewToFirestore(productId, reviewDetails, setRating);
  
      console.log('Review added to Firestore with ID:', reviewId);

      
      // Clear the input fields after successful submission
      setRating(0);
      setReview('');
  
      // Optionally, you can provide user feedback here (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., show an error message to the user)
      console.error('Error submitting review:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}> {price}</Text>
      <Text style={styles.dash}>------------------------------------------------</Text>
      <Text style={styles.desch}>Description</Text>
      <Text style={styles.dash}>------------------------------------------------</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleWishlist}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContact}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews Container */}
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Reviews</Text>
        <ScrollView style={styles.reviewsBackground}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItemContainer}>
              <View style={styles.reviewItem}>
                
                <View style={styles.ratingContainer}>
                <Text style={styles.userName}>{` ${review.userName}`}</Text>
                  <Text style={styles.rating}>{``}</Text>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Ionicons
                      key={num}
                      name={num <= review.rating ? 'star' : 'star-outline'}
                      size={19}
                      color={num <= review.rating ? '#FFD700' : '#CCC'}
                    />
                  ))}
                </View>
                <Text style={styles.reviewText}>{` ${review.review}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Give Rating & Review</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Give Rating:  </Text>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleStarRating(num)}
              style={styles.starButton}
            >
              <Ionicons
                name={num <= rating ? 'star' : 'star-outline'}
                size={20}
                color={num <= rating ? '#FFD700' : '#CCC'}
              />
            </TouchableOpacity>
          ))}
        </View>
         <Text style={styles.inputLabel}>Write your review</Text>
      
        <TextInput
          style={styles.reviewInput}
          placeholder="Please give your review here..."
          value={review}
          onChangeText={handleReviewChange}
          multiline
          placeholderTextColor={styles.inputPlaceholder.color}
        />
        <TouchableOpacity  title="Submit" style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText2}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};


const ProductPage = ({ route }) => {
  const { product, productId } = route.params;
  const { imageUrl, name, price, description, userContact } = product;
  

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProductCard
          imageUrl={imageUrl}
          name={name}
          description={description}
          price={price}
          userContact={userContact}
          productId={productId}
        />
      </View>
    </ScrollView>
  );
};

export default ProductPage;