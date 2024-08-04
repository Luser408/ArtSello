import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import { auth } from '../firebase';

const FavoritePage = ({ navigation }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(firestore, 'Users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userDetailsData = userDoc.data();

            const favoritesCollection = collection(firestore, 'Favorites');
            const q = query(favoritesCollection, where('userContact', '==', userDetailsData.contact));
            const querySnapshot = await getDocs(q);

            const products = [];
            querySnapshot.forEach((doc) => {
              const product = {
                id: doc.id,
                ...doc.data(),
              };
              products.push(product);
            });

            setFavoriteProducts(products);
          } else {
            console.warn('User document does not exist');
          }
        }
      } catch (error) {
        console.error('Error fetching favorite products: ', error);
      }
    };

    fetchFavoriteProducts();
  }, [auth.currentUser]);

  const handleDeleteProduct = async (productId) => {
    console.log('Deleting product with ID:', productId);

    try {
      const productToDelete = favoriteProducts.find((product) => product.id === productId);

      if (productToDelete) {
        const productDocRef = doc(firestore, 'Favorites', productToDelete.id);
        await deleteDoc(productDocRef);

        const updatedProductsSnapshot = await getDocs(collection(firestore, 'Favorites'));
        const updatedProducts = updatedProductsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setFavoriteProducts(updatedProducts);
      } else {
        console.warn('Product not found with ID:', productId);
      }
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductPage', { product: item })}
    >
      <View style={styles.productItemContent}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.productImage}
          resizeMode="contain"
          onError={(error) => console.error('Image load error:', error.nativeEvent.error)}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>Rs. {item.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
    style={styles.container}
    contentContainerStyle={{ flexGrow: 1 }}  // or { paddingBottom: 100 }
    ListHeaderComponent={() => <Text style={styles.title}>Favorite Products</Text>}
    data={favoriteProducts}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderItem}
  />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C1EA5F',
    marginVertical: 20,
    textAlign: 'center',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginLeft: 20,
  },
  productItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#C1EA5F',
  },
  productPrice: {
    fontSize: 16,
    color: 'white',
  },
  deleteButton: {
    padding: 10,
  },
});

export default FavoritePage;
