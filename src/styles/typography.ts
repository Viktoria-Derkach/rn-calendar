import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
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
  dot: {
    borderRadius: 50,
    marginRight: 7,
    width: 5,
    height: 5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});
