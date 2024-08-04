import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FooterComponent from '../Nav/Footer';


const PrivacyPolicyPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.text}>
        At Artsello, we value and respect your privacy. This Privacy Policy
        explains how we collect, use, and disclose information when you use our
        mobile application.
      </Text>
      <Text style={styles.subHeading}>1. Information Collection</Text>
      <Text style={styles.text}>
        We may collect certain information from you when you use our app,
        including but not limited to your name, email address, and usage
        statistics.
      </Text>
      <Text style={styles.subHeading}>2. Information Usage</Text>
      <Text style={styles.text}>
        The information we collect may be used to provide and improve our
        services, personalize your experience, and send you updates and
        promotional messages.
      </Text>
      <Text style={styles.subHeading}>3. Information Disclosure</Text>
      <Text style={styles.text}>
        We may disclose your information to third parties only in the following
        cases: (a) when required by law, (b) to enforce our Terms of Service,
        (c) to protect the rights, property, or safety of Artsello, its users,
        or the public.
      </Text>
      <Text style={styles.subHeading}>4. Security</Text>
      <Text style={styles.text}>
        We take reasonable measures to protect your information from unauthorized
        access or disclosure. However, please note that no method of transmission
        over the internet or electronic storage is 100% secure.
      </Text>
      <Text style={styles.subHeading}>5. Changes to Privacy Policy</Text>
      <Text style={styles.text}>
        We reserve the right to modify or update this Privacy Policy at any time.
        You are advised to review this page periodically for any changes.
      </Text>
      <Text style={styles.subHeading}>6. Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions or concerns about our Privacy Policy, please
        contact us at privacy@artsello.com.
      </Text>
      <FooterComponent/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1A',
    paddingBottom: '100%', 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 10,
    textAlign: 'center',
    color: '#C1EA5F',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#C1EA5F',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
     marginHorizontal: 20,
     textAlign: 'justify',
     color: 'white',
  },
});

export default PrivacyPolicyPage;
