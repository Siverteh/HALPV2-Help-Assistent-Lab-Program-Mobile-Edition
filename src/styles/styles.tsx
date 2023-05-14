import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "25%",
    resizeMode: "contain"
  },
  listlogo: {
    width: "100%",
    height: "25%",
    resizeMode: "contain"
  },
  buttonStyle: {
    borderRadius: 4,
    width: '50%',
    height: 45,
    justifyContent: 'center'
  },
  Header: {
    fontSize: 24,
    marginBottom: "5%",
    fontFamily: "Roboto",
    textAlign: "center"
  },
  textInput: {
    width: "85%",
    margin: 5
  },
  text_lg: {
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center"
  },
  text_sm: {
    alignSelf: "center",
    textAlignVertical: "center",
  }
});

export default Styles;

