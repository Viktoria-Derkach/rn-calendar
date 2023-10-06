import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    // textAlign: 'center',
    color: '#222B45',
  },
  greyColor: {
    color: '#8F9BB3',
  },
  todays: {
    transformOrigin: 'center',
    color: '#FFFFFF',
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: '#735BF2',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // calendarDay: {
  //   // width: 40,
  //   height: 40,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   width: '14%',
  // },
  // calendarGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   marginTop: 10,
  //   width: '100%',
  // },
});
