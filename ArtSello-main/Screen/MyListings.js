import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject,} from 'firebase/storage';

const MyListingsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState('');
  const [updatedProductPrice, setUpdatedProductPrice] = useState('');
  const [updatedProductImage, setUpdatedProductImage] = useState('');
  const [updatedProductDescription, setUpdatedProductDescription] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const isProductInWishlist = (productId) => wishlist.includes(productId);

  const fetchProducts = async () => {
    const db = getFirestore(app);
    const productsCollection = collection(db, 'products');

    try {
      const querySnapshot = await getDocs(productsCollection);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (product.userEmail === userDetails?.email) {
          productsData.push({
            id: doc.id,
            ...product,
          });
        }
      });

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const updateProductDetails = async () => {
    if (!selectedProduct) {
      return;
    }
  

     // Validate updated product name
     if (updatedProductName.trim().length === 0 || updatedProductName.length > 50) {
      alert('Invalid name. Please enter a name under 50 characters.');
      return;
    }

    // Validate updated product price
    const numericPrice = parseFloat(updatedProductPrice);
    if (isNaN(numericPrice) || numericPrice <= 100) {
      alert('Invalid price. Please enter a numeric value greater than 100.');
      return;
    }

    const db = getFirestore(app);
    const storage = getStorage(app);
    const productRef = doc(db, 'products', selectedProduct.id);
  
    try {
      // Get the reference to the previous image
      const prevImageRef = ref(storage, `images/${selectedProduct.id}`);
  
      // Check if the object exists before trying to delete it
      const prevImageExists = await getDownloadURL(prevImageRef).then(
        () => true,
        (error) => {
          if (error.code === 'storage/object-not-found') {
            return false;
          }
          throw error;
        }
      );
  
      // Delete the previous image only if it exists
      if (prevImageExists) {
        await deleteObject(prevImageRef);
      }
  
      // Update other details
      await updateDoc(productRef, {
        name: updatedProductName || selectedProduct.name,
        price: updatedProductPrice || selectedProduct.price,
        description: updatedProductDescription || selectedProduct.description,
      });
  
      // Upload a new image if selectedImage is not null
      if (selectedImage) {
        const newImageRef = ref(storage, `images/${selectedProduct.id}`);
        await uploadBytes(newImageRef, selectedImage);
        const imageUrl = await getDownloadURL(newImageRef);
  
        // Update the imageUrl in the database
        await updateDoc(productRef, { imageUrl });
      }
  
      setModalVisible(false);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product details: ', error);
    }
  };

  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(getFirestore(app), 'Users', user.uid);

        try {
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserDetails(userData);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        // Handle the case when the user is not logged in
        setUserDetails(null);
      }
    });

    fetchProducts();

    // Cleanup the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [userDetails?.email, wishlist]);

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdatedProductName(product.name);
    setUpdatedProductPrice(product.price);
    setUpdatedProductImage(product.imageUrl);
    setUpdatedProductDescription(product.description);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity style={styles.productItem}>
        <View style={styles.productItemContent}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImage} resizeMode="contain" />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Rs. {item.price}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.wishlistButton,
            { backgroundColor: isProductInWishlist(item.id) ? 'red' : 'rgba(0, 0, 0, 0.6)' },
          ]}
          onPress={() => toggleWishlist(item.id)}
        >
          <Ionicons
            name={isProductInWishlist(item.id) ? 'heart' : 'heart-outline'}
            size={24}
            color="#fff"
            style={styles.wishlistIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={() => openUpdateModal(item)}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deletebuttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDelete = (productId) => {
    deleteProduct(productId);
    fetchProducts();
  };

  const deleteProduct = async (productId) => {
    const db = getFirestore(app);
    const productRef = doc(db, 'products', productId);

    try {
      await deleteDoc(productRef);
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        const response = await fetch(result.uri);
    const blob = await response.blob();
    setSelectedImage(blob);
    setSelectedImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Listings</Text>
      <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item.id} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Product</Text>
            <Text style={styles.title2}>Update Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={updatedProductName}
              onChangeText={(text) => setUpdatedProductName(text.trim())}
            />
            <Text style={styles.title2}>Update Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Price"
              value={updatedProductPrice}
              onChangeText={(text) => setUpdatedProductPrice(text)}
              keyboardType="numeric"
            />
            <Text style={styles.title2}>Update Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Description"
              value={updatedProductDescription}
              onChangeText={(text) => setUpdatedProductDescription(text)}
            />
            <TouchableOpacity style={styles.updateButton2} onPress={pickImage}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            {selectedImageUri && (
  <Image
    source={{ uri: selectedImageUri }}
    style={styles.selectedImage}
    resizeMode="cover"
  />
)}
            <TouchableOpacity style={styles.updateButton2} onPress={() => updateProductDetails()}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedProduct(null); // Reset selected product
              }}
            >
              <Text style={styles.deletebuttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    padding: 16,
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  productContainer: {
    marginBottom: 20,
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
  wishlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#C1EA5F',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  updateButton2: {
    backgroundColor: '#C1EA5F',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10, // Add some space between the input and the button
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deletebuttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C1EA5F',
    textAlign: 'center',
  },
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1C1C1A',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C1EA5F',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedImage: {
    width: 200, // Set the width according to your design
    height: 200, // Set the height according to your design
    marginTop: 10,
    borderRadius: 8,
  },
  
});
export default MyListingsScreen;
