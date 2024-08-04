import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import DrawerNavigator from '../Nav/Drawer';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';


const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin/user choice

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate(DrawerNavigator);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    console.log('Login button clicked');
    if (isAdmin) {
      // Admin login with sample data
      // You can customize this logic as needed
      if (email === 'Admin@gmail.com' && password === 'Admin123') {
        const adminUser = { email: 'Admin@gmail.com', isAdmin: true };
        navigation.navigate('AdminPanel', { user: adminUser });
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      const db = getFirestore(app);
      
      try {
        // Check if the user is blocked in Firestore
        const usersCollection = collection(db, 'Users');
        const q = query(usersCollection, where('email', '==', email), where('blocked', '==', false));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          // User not found or blocked
          alert('Invalid credentials or blocked user');
        } else {
          // User is not blocked, proceed with sign in
          signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
              const user = userCredential.user;
              console.log('Logged in with:', user.email);
              navigation.replace('DrawerNavigator');
            })
            .catch(error => alert(error.message));
        }
      } catch (error) {
        console.error('Error checking user details:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleRegistration = () => {
    // Navigate to the registration page when the "Register" button is clicked.
    navigation.navigate('RegScreen');
  }

  return (
    <View style={styles.container} behavior="padding">
      <Text style={styles.logo}>ArtSello</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsAdmin(true)}
        >
          <Text style={isAdmin ? styles.radioTextChecked : styles.radioText}>Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setIsAdmin(false)}
        >
          <Text style={!isAdmin ? styles.radioTextChecked : styles.radioText}>User</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegistration}>
          <Text style={styles.text}>Don't have an Account?</Text>
          <Text style={styles.text2}> Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#87fa92',
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  logo: {
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 80,
    marginBottom: 30,
  },
  text2: {
    color: '#87fa92',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  radioText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  radioTextChecked: {
    color: '#87fa92',
    fontSize: 16,
    marginRight: 5,
  },
});

export default LoginScreen;
