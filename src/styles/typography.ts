import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#222B45',
  },
  smallText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  bigText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222B45',
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: '#735BF2',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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
  screenContainer: {
    margin: 15,
    flex: 1,
  },
  marginB: {
    marginBottom: 15,
  },
});
