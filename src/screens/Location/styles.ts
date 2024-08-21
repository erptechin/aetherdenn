import { StyleSheet } from 'react-native';
import { Color } from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primaryBgColor,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.red,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // text: {
  //   fontSize: 16,
  //   textAlign: 'center',
  //   marginHorizontal: 30,

  // },
  input: {
    borderWidth: 1,
    borderColor: Color.primary_color,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: Color.white,
    marginTop: 10,
  },
  select: {
    padding: 10,
  },
  buttonBg: {
    marginTop: 20,
  },
  // sunita
  text: { color: Color.lightGray },



});


// secondpage

