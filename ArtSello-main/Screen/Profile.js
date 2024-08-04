
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { app, firestore } from '../firebase';
import FooterComponent from '../Nav/Footer';

const auth = getAuth(app);

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        try {
          const userDocRef = doc(firestore, 'Users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserData(userData);
            
            // Fetch and set the profilePicture URL
            const profilePictureUrl = userData.profilePicture;
            setProfilePicture(profilePictureUrl);
          }
        } catch (error) {
          console.error('Error fetching user details from Firestore:', error);
        }
      } else {
        setUser(null);
        setUserData({});
        setProfilePicture(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
   <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.heading}> My Account</Text>
      {user && (
        <View style={styles.menu}>
          {profilePicture && (
            <View style={styles.profilePictureContainer}>
              <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            </View>
          )}
          <Text style={styles.menuItem}>
            Name: <Text style={styles.menuItem2}>{userData.username || user.displayName}</Text>
          </Text>
          <Text style={styles.menuItem}>
            Email: <Text style={styles.menuItem2}>{userData.email || user.email}</Text>
          </Text>
          <Text style={styles.menuItem}>
            Contact: <Text style={styles.menuItem2}>{userData.contact || 'N/A'}</Text>
          </Text>
          <Text style={styles.menuItem}></Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyListings')}>
          <Text style={styles.buttonText}>My Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Favorite')}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddProductScreen', { userEmail: userData.email, userContact: userData.contact })}>
          <Text style={styles.buttonText} >Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Settings')}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.logoutbuttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
    <FooterComponent />
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    padding: 20,
    paddingBottom: '100%',
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    textShadowColor: '#C1EA5F', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset (horizontal and vertical)
    textShadowRadius: 10, // Shadow blur radius
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
  menuItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    textAlign: 'center',
    color: 'white',
  },
  menuItem2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#C1EA5F',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#1C1C1A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    elevation: 9,
    shadowColor: '#C1EA5F',
    shadowOpacity: 1,
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: 2,
    color: '#C1EA5F',
    fontSize: 15,
    fontWeight: 'bold',
  },
  logoutbutton: {
    backgroundColor: 'red', // Customize with your app's color scheme
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutbuttonText: {
    textAlign: 'center',
    letterSpacing: 2,
    color: '#e83838',
    fontSize: 15,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#C1EA5F',
    borderWidth: 2,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default Profile;