import {StyleSheet} from 'react-native';

export const MainStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
  },
  main: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 16,
    alignContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    color: '#EFC81A',
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#C4C4C4',
    alignSelf: 'center',
    fontWeight: '500',
    lineHeight: 18,
    marginVertical: 18,
  },
});
