import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
  },
  header: {
    backgroundColor: '#87fa92',
  },
  pageContent: {
    flex: 1,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: '100%',
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    borderColor: '#ccc',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',

  },
  productImage: {
    marginTop: 10,
    width: 220,
    height: 350,
    borderRadius: 10,
    resizeMode: 'contain',
 
  },
  wishlistButton: {
    position: 'absolute',
    bottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  wishlistIcon: {
    color: 'white',
  },
  productName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    textAlign: 'center',
    color: '#C1EA5F',
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeFilter: {
    backgroundColor: '#C1EA5F', // or your desired active color
    color: '#fff',
  },
  priceInputs: {
    flexDirection: 'row',
  },
  priceInput: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});
