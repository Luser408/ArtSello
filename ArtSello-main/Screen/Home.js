import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import FooterComponent from '../Nav/Footer';

const Home = ({ navigation }) => {
  const introImages = [
    { id: '1', image: require('../assets/slider1.jpeg') },
    { id: '2', image: require('../assets/slider2.jpeg') },
    { id: '3', image: require('../assets/slider3.jpeg') },
    { id: '4', image: require('../assets/slider4.jpeg') },
    { id: '5', image: require('../assets/slider5.jpeg') },
  ];

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={introImages}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
        )}
      />
      <Text style={styles.introText}>WELCOME TO ARTSELLO</Text>
      <Text style={styles.introText2}>Our Categories</Text>
        {/* KIDS CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Kids Clothing ')}>
        <Image
          source={require('../assets/cat1.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Kid's Clothing</Text>
        </View>
      </TouchableOpacity>
          {/* MENS CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Mens Clothing ')}>
        <Image
          source={require('../assets/cat2.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Men's Clothing</Text>
        </View>
      </TouchableOpacity>
         {/* WOMEN CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Womens Clothing ')}>
        <Image
          source={require('../assets/cat3.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Women's Clothing</Text>
        </View>
      </TouchableOpacity>
        {/* JEWELLERY CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Jewellery ')}>
        <Image
          source={require('../assets/cat4.png')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Jewellery</Text>
        </View>
      </TouchableOpacity>
                    {/* PAINTINGS CATEGORY */}
        <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Paintings ')}>
        <Image
          source={require('../assets/cat5.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Paintings</Text>
        </View>
      </TouchableOpacity>
          {/* POTTERY CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Pottery ')}>
        <Image
          source={require('../assets/cat6.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Pottery</Text>
        </View>
      </TouchableOpacity>
                 {/* PRINTED PHOTOGRAPHY CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Printed Photography ')}>
        <Image
          source={require('../assets/cat7.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Printed Photography</Text>
        </View>
      </TouchableOpacity>
               {/* SCARVES CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Scarves  ')}>
        <Image
          source={require('../assets/cat8.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Scarves</Text>
        </View>
      </TouchableOpacity>
               {/* SCULPTURES CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Sculptures  ')}>
        <Image
          source={require('../assets/cat9.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Sculptures</Text>
        </View>
      </TouchableOpacity>
                 {/* TRADITIONAL INSTRUMENTS CATEGORY */}
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Traditional  Instruments')}>
        <Image
          source={require('../assets/cat10.png')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Traditional Instruments</Text>
        </View>
      </TouchableOpacity>
      <FooterComponent/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1C1C1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '100%',
  },
  introText: {
    color: '#C1EA5F',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  introText2: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  image: {
    width: 300,
    height: 220,
    marginHorizontal: 3,
    borderRadius: 8,
  },
  categoryImage: {
    width: 350,
    height: 250,
    borderRadius: 6,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C1EA5F',
  },
  categories: {
    marginBottom: 20,
  },
});

export default Home;
