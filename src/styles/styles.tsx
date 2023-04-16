import { StyleSheet } from "react-native";
import { shadow } from "react-native-paper";

const Styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "25%",
    resizeMode: "contain"
  },
  boxeStyle: {
    padding: 0,
    borderRadius: 0,
  },
  buttonStyle: {
    borderRadius: 4,
    justifyContent: 'center'
  },

  textStyle: {
    fontFamily: 'Roboto',
  },
  Header:{
    fontSize: 24,
    height: 100,
    padding: 30,
    fontFamily: "Roboto",
    textAlign: "center"
  },
  list: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //elevation: 5
  },
});

export default Styles;

