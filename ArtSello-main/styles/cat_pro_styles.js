import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1A',
    paddingHorizontal: 20,
    paddingBottom: '80%',
  },
  image: {
    marginTop: 10,
    width: 320,
    height: 350,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#C1EA5F',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  dash:{
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#C1EA5F',

  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: 'white',
  },
  desch: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C1EA5F',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#C1EA5F',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewContainer: {
    width: 350,
    marginTop: 40,
    marginTop: 20,
    color: 'white',
  },
  reviewsBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity as needed
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C1EA5F',
  },
  ratingText: {
    marginRight: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  starButton: {
    marginRight: 5,
  },
  reviewInput: {
    width: '100%',
    height: 200,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  inputPlaceholder: {
    color: '#999', 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'white',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#C1EA5F',
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 5, // for shadow on Android
    shadowColor: '#C1EA5F', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
    shadowOpacity: 0.5, // for shadow on iOS
    shadowRadius: 5, // for shadow on iOS
  },
  reviewItemContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  reviewText: {
    fontStyle: 'italic',
    fontSize: 16,
    color: 'black',

  },
  rating: {
    marginRight: 10,
  },
});
