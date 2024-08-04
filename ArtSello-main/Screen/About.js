import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import FooterComponent from '../Nav/Footer';


const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.description}>
        Artsello is a platform dedicated to promoting and supporting artists from around the world. Our mission is to provide a space where artists can showcase their work, connect with art enthusiasts, and sell their creations.
      </Text>
      <Text style={styles.description}>
        At Artsello, we believe that art has the power to inspire, provoke thought, and bring joy to people's lives. We aim to foster a vibrant and diverse art community where artists can thrive and art lovers can explore a wide range of artistic expressions.
      </Text>
      <Text style={styles.title}>Why choose Artsello?</Text>
      <View style={styles.reasonContainer}>
        <Text style={styles.reason}>
          1. Global Exposure: With Artsello, your artwork can reach a worldwide audience, allowing you to connect with art enthusiasts and potential buyers from different cultures and backgrounds.
        </Text>
        <Text style={styles.reason}>
          2. Seamless Selling: Our platform provides an easy and intuitive way for artists to upload and manage their artwork, enabling them to focus on their creative process while we handle the selling and transaction process.
        </Text>
        <Text style={styles.reason}>
          3. Community Support: Join our vibrant art community where artists support and inspire each other. Engage in discussions, share your creative journey, and receive valuable feedback from fellow artists and art enthusiasts.
        </Text>
        <Text style={styles.reason}>
          4. Secure Transactions: We prioritize the security of your transactions. Artsello ensures safe and reliable payment processing, providing a trusted environment for both artists and buyers.
        </Text>
      </View>
      <Text style={styles.teamTitle}>OUR TEAM</Text>
      <View style={styles.teamContainer}>
        <View style={styles.developerContainer}>
          <Image
            source={require('../assets/dev1.jpg')}
            style={styles.image}
          />
          <Text style={styles.developerName}>YASIN WAHID | SP20-BSE-059</Text>

        </View>
        <View style={styles.developerContainer}>
          <Image
            source={require('../assets/dev2.jpg')}
            style={styles.image}
          />
          <Text style={styles.developerName}>HAMZA KHAN | SP20-BSE-039 </Text>
        </View>
        <View style={styles.developerContainer}>
          <Image
            source={require('../assets/dev3.jpg')}
            style={styles.image}
          />
          <Text style={styles.developerName}>JUNAID KHAN | SP20-BSE-066</Text>
        </View>
      </View>
      <FooterComponent/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '100%', 
    backgroundColor: '#1C1C1A',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#C1EA5F',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
    marginHorizontal: 15,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#C1EA5F',
  },
  reasonContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    textAlign: 'justify',
  
  },
  reason: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  teamTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#C1EA5F',
  },
  teamContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  developerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 350,
    borderRadius: 5,
  },
  developerName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#C1EA5F',
  },
});

export default AboutUsScreen;
