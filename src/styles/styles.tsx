import { StyleSheet } from "react-native";

const Misc_Style = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  Header:{
    fontSize: 24,
    height: 100,
    padding: 30,
    color: "#000000",
    fontFamily: "Roboto",
    textAlign: "center"
  },
})

const Light_Styles = StyleSheet.create({
  lm_background: {
    backgroundColor: "#E0EEF7",
    ScreenWidth: "100%"
  },
  lm_boxes: {
    backgroundColor: "#FFFFFF",
    padding: 32,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  lm_button: {
    backgroundColor: "#94CCFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  lm_whitelist: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  lm_bluelist: {
    backgroundColor: "#94CCFF",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  lm_outline: {
    color: "#B0B4BC"
  },
  lm_text: {
    color: "#000000",
    fontFamily: "Roboto",
  },
  lm_textButton: {
    color: "#686464",
    fontFamily: 'Roboto',
  },
});

const Dark_Styles = StyleSheet.create({
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 8
  },
  dm_outline: {
    color: "#083464"
  },
  dm_text: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  dm_textButton: {
    color: "#E0E0E0",
    fontFamily: "Roboto"
  }})

export {Light_Styles, Dark_Styles, Misc_Style};
