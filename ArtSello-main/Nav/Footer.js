import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FooterComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo2.png')}
        style={styles.logo}
      />

      <Text style={styles.textheader}>Useful Links</Text>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('About Us')}
        style={[styles.box, { marginTop: 10 }]} // Adjusted marginTop for consistent spacing
      >
        <Text style={styles.text}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Privacy Policy')}
        style={styles.box}
      >
        <Text style={styles.text}>Privacy Policy</Text>
      </TouchableOpacity>

      <Text style={styles.end}>@2020-2024 | ArtSello.com, Inc.</Text>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', // Center content horizontally
    backgroundColor: 'black',
  },
  logo: {
    marginTop: 20,
    marginBottom: 10, // Adjusted marginBottom for consistent spacing
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  box: {
    paddingVertical: 10, // Added paddingVertical for consistent padding
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#1C1C1A', // Added a background color for better visibility
    marginVertical: 5, // Adjusted marginVertical for consistent spacing
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C1EA5F',
  },
  textheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C1EA5F',
  },
  end: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#C1EA5F',
  },
};

export default FooterComponent;
