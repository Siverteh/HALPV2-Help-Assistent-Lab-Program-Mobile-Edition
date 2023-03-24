import { StyleSheet } from "react-native";
import { shadow } from "react-native-paper";

const Styles = StyleSheet.create({
    logo: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20
  },
  lm_background: {
    backgroundColor: "#E0EEF7",
  },
  lm_boxes: {
    backgroundColor: "#FFFFFF",
    padding: 0,
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  lm_button: {
    backgroundColor: "#94CCFF",
    borderRadius: 4,
  },
  lm_outline: {
    color: "#B0B4BC"
  },
  lm_text: {
    color: "#000000",
    fontFamily: "Roboto"
  },
  lm_textButton: {
    color: "#686464",
    fontFamily: 'Roboto',
  },
  dm_background: {
    backgroundColor: "#004082"
  },
  dm_boxes: {
    backgroundColor: "#0070C0",
    padding: 32,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  dm_button: {
    backgroundColor: "#0070C0",
    borderRadius: 4,
  },
  dm_outline: {
    color: "#083464"
  },
  dm_text: {
    color: "#FFFFFF",
    fontFamily: "Roboto"
  },
  dm_textButton: {
    color: "#E0E0E0",
    fontFamily: "Roboto"
  }, 
  Header:{
    fontSize: 24,
    height: 100,
    padding: 30,
    color: "#000000",
    fontFamily: "Roboto",
    textAlign: "center"
  },
  lm_whitelist: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //elevation: 5
  },
  lm_bluelist: {
    backgroundColor: "#94CCFF",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //elevation: 5
  },

});

export default Styles;

