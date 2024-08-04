import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View,ScrollView, Text, StyleSheet, TouchableOpacity, Button, Image,TextInput, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc, updateDoc,} from 'firebase/firestore';
import { firestore } from '../firebase';

const Tab = createBottomTabNavigator();


const Logout = ({ onLogout }) => {
  // Static data for the admin (replace with your actual admin data)
  const adminData = {
    name: 'Admin',
    email: 'Admin@gmail.com',
    profilePicture: require('../assets/dev1.jpg'), // Import from assets folder
  };

    return (
      <View style={styles.container}>
        <Text style={styles.adminPanelHeader}>Admin Panel | Logout</Text>
  
        {/* Display Admin Information */}
        <View style={styles.menu}>
        <View style={styles.adminInfoContainer}>
          <View style={styles.profileBox}>
            <Image source={adminData.profilePicture} style={styles.adminProfilePicture} />
          </View>
          <View style={styles.adminInfo}>
            <Text style={styles.adminName}>{adminData.name}</Text>
            <Text style={styles.adminEmail}>{adminData.email}</Text>
          </View>
        </View>
        </View>
        {/* Logout Button */}
        <Button title="Logout" onPress={onLogout} color="red" />
      </View>
    );
  };

  const ManageUsers = ({ users, onBlockUser, onUnblockUser }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
  
    useEffect(() => {
      const filteredUserList = users.filter((user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filteredUserList);
    }, [searchText, users]);
  return (
    <ScrollView style={styles.container}>
       <Text style={styles.adminPanelHeader}>Admin Panel | Manage Users</Text>
       {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Users"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <View style={styles.mainHeader}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Name</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Email</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Picture</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      </View>
      {filteredUsers.map((user) => (
        <View style={styles.tableContent} key={user.id}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
          <View style={styles.actions}>
            {!user.blocked ? (
              <TouchableOpacity onPress={() => onBlockUser(user.id)}>
                <Text style={styles.blockButton}>B</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => onUnblockUser(user.id)}>
                <Text style={styles.unblockButton}>UB</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};


const ManageProducts = ({ products, onDeleteProduct }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filteredProductList = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.userEmail.toLowerCase().includes(searchText.toLowerCase())
  );
    setFilteredProducts(filteredProductList);
  }, [searchText, products]);

  return (
    <ScrollView style={styles.container}>
       <Text style={styles.adminPanelHeader}>Admin Panel | Manage Products</Text>
       <TextInput
        style={styles.searchInput}
        placeholder="Search Products"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
        <View style={styles.mainHeader}>
      <View style={styles.tableHeader}>
      <Text style={styles.headerText}>Title</Text>
      </View>
      <View style={styles.tableHeader}>
      <Text style={styles.headerText}>Price</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Picture</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Email</Text>
        </View>
      </View>
      {filteredProducts.map((product, index) => (
        <View style={styles.tableContent} key={product.id}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
          <TouchableOpacity onPress={() => onDeleteProduct(product.id)}>
            <Text style={styles.deleteButton}>X</Text>
          </TouchableOpacity>
           {/* Display User Email */}
           <Text style={styles.pemail}>{product.userEmail}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const AdminPanel = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      // Fetch Users from Firebase
      const usersCollection = collection(firestore, 'Users');
      const usersSnapshot = await getDocs(usersCollection);
      const userList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    const getProducts = async () => {
      // Fetch Products from Firebase
      const productsCollection = collection(firestore, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    getUsers();
    getProducts();
  }, []);
  

  const handleBlockUser = async (userId) => {
    try {
      const userRef = doc(firestore, 'Users', userId);
  
      // Assuming you have a 'blocked' field in your user document
      await updateDoc(userRef, {
        blocked: true,
      });
  
      // Update the state to reflect the blocked status
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, blocked: true } : user
      );
      setUsers(updatedUsers);
  
      console.log(`User with ID ${userId} has been blocked.`);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };
  
  const handleUnblockUser = async (userId) => {
    try {
      const userRef = doc(firestore, 'Users', userId);
  
      // Assuming you have a 'blocked' field in your user document
      await updateDoc(userRef, {
        blocked: false,
      });
  
      // Update the state to reflect the unblocked status
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, blocked: false } : user
      );
      setUsers(updatedUsers);
  
      console.log(`User with ID ${userId} has been unblocked.`);
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };
  

  const handleDeleteProduct = async (productId) => {
    try {
      // Delete the product document from the 'products' collection
      const productRef = doc(firestore, 'products', productId);
      await deleteDoc(productRef);

      // Update the state to reflect the deletion
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo1.png')} style={styles.logo} />
        </View>
      </View>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
  name="Manage Users"
  options={{
    tabBarIcon: ({ color }) => (
      <Image
        source={require('../assets/man-product.png')}
        style={{ tintColor: color, width: 24, height: 24 }}
      />
    ),
  }}
>
  {() => (
    <ManageUsers
      users={users}
      onBlockUser={(userId) => handleBlockUser(userId)}
      onUnblockUser={(userId) => handleUnblockUser(userId)}
    />
  )}
</Tab.Screen>
        <Tab.Screen
          name="Manage Products"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../assets/man-user.jpg')}
                style={{ tintColor: color, width: 24, height: 24 }}
              />
            ),
          }}
        >
          {() => <ManageProducts products={products} onDeleteProduct={handleDeleteProduct} />}
        </Tab.Screen>
        <Tab.Screen
          name="Logout"
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color: 'red', fontSize: 24 }}>X</Text>
            ),
          }}
        >
          {() => <Logout onLogout={handleLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
    margin: 1,
    height: 50,
    marginBottom:10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#C1EA5F',
  },
  headerText: {
    color: '#1C1C1A', // Text color for header text
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  mainHeader: {
    flexDirection: 'row',
  },
  tableContent: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#C1EA5F',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 160,
    height: 30,
  },
  adminPanelHeader: {
    color: '#C1EA5F',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  title: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    marginRight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C1EA5F',
    flex: 1,
  },
  email: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  pemail: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 25,
  },

  deleteButton: {
    width: 24,
    height: 24,
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginTop:20,
    backgroundColor: '#fc6d6d',
  },
  item: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
  },
  userInfo: {
    flex: 2, // Adjust as needed
    marginRight: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 50,
    resizeMode: 'contain',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockButton: {
    width: 30,
    height: 30,
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
    backgroundColor: 'lightblue',
  },
  unblockButton:{
    width: 30,
    height: 30,
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
    backgroundColor: '#fc6d6d',
  },
  adminInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
    backgroundColor: '#C1EA5F', // You can change the background color
    overflow: 'hidden', // Ensure content is clipped to the border
    marginBottom: 10,
  },
  adminProfilePicture: {
    width: 96,
    height: 96,
    borderRadius: 70,
    resizeMode: 'contain',
  },
  adminInfo: {
    alignItems: 'center',
  },
  adminName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  adminEmail: {
    color: 'lightgray',
    fontSize: 16,
  },
  menu: {
    backgroundColor: '#1C1C1A',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    elevation: 9,
    shadowColor: '#C1EA5F',
    shadowOpacity: 1,
  },
  searchInput: {
    backgroundColor: '#C1EA5F',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AdminPanel;
