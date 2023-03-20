import Styles from "../styles/styles";
import { Button } from "react-native-paper";
import { Box } from "@react-native-material/core";


const Settings = () => {
  return (
    <>
    <Box style={Styles.lm_background}>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_text}>PROFILE</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_text}>CHANGE PASSWORD</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_text}>EXTERNAL SERVICES</Button>
      <Button style={{ ...Styles.lm_button, width: 230, height: 50,  }} labelStyle={Styles.lm_text}>DELETE PERSONAL DATA</Button>
    </Box>
    </>
  );
};

export default Settings;