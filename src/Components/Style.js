import { StyleSheet, Dimensions } from 'react-native';

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
  },
  appHeader: {
    backgroundColor: '#282c34',
    padding: 20,
    color: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Android shadow
  },
  table: {
    borderWidth: 3,
    borderColor: 'rgb(133, 85, 26)',
    backgroundColor: 'bisque',
    borderCollapse: 'collapse',
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'rgb(109, 99, 99)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  colBorder: {
    borderRightWidth: 2,
    borderRightColor: 'black',
  },
  cellInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 40,
  },
  btnContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    flexWrap: 'wrap',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: 'rgb(101, 99, 99)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  btnText: {
    color: 'rgb(101, 99, 99)',
  },
  btnHovered: {
    backgroundColor: 'rgb(133, 85, 26)',
    color: 'white',
  },
});

export default styles;
