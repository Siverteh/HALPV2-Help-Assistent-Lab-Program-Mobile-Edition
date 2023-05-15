import React, { useContext } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

import Styles from "../styles/styles";
import { ThemeContext } from "../Components/ThemeContext";

const PrivacyPolicy = ({ route, navigation }: StackScreenProps<RootStackParamList, "PrivacyPolicy">): JSX.Element => {
  const { height, width } = useWindowDimensions();
  const { background, text, boxes } = useContext(ThemeContext);

  const handleNavigate = () => {
    const { previousScreen } = route.params || {};
    if (previousScreen == "LoginScreen") {
      navigation.navigate("LoginScreen");
    } else {
      // Default navigation if previousScreen is not defined
      navigation.navigate("SettingScreen");
    }
    ;
  };

  return (
    <View style={[{ backgroundColor: background, height: "100%" }]}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <IconButton
          icon="arrow-left"
          iconColor={text}
          onPress={handleNavigate}
        />
      </View>
      <View style={[{ alignItems: "center"}]}>
        <View style={[{
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: boxes,
          width: "90%",
          height: "95%",
          marginTop: 0,
          borderRadius: 20
        }]}>
          <ScrollView style={{ flex: 1, padding: 10 }}>
            <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
              <Text style={[{ color: text, fontSize: 30 }]}>Privacy Policy</Text>

              <Text style={[{ color: text, fontSize: 16 }]}>
                At HALP, we value your privacy and have a strong focus on keeping your data secure. This privacy policy
                contains information about how we collect, and use your information. By using the Help Assistant Lab
                Program (HALP) you consent to the collection, use and sharing of the information as stated in this
                privacy policy.
              </Text>

              <Text style={[{ color: text, fontSize: 24, marginTop: 25 }]}>Information we collect:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0 }]}>
                The usage of HALP is not restricted to logging in as a user. The system provides the ability to use it
                without logging in using your email address and nickname. This leaves two scenarios:
              </Text>

              <Text style={[{ color: text, fontSize: 20, marginTop: 25 }]}>Information collected if logged in:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0 }]}>
                We may collect information such as your email address, nickname and discord tag. There is no need to
                actually enter your real name, which is why this field is called "nickname". Ticket information: We may
                collect information created by you in the app, such as tickets, courses and user roles. This content is
                all stored in the HALP system until you decide to remove it yourself.
              </Text>

              <Text style={[{ color: text, fontSize: 20, marginTop: 25 }]}>Information collected if not logged
                in:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0 }]}>
                We may collect information such as your nickname and discord tag. There is no need to actually enter
                your real name, which is why this field is called "nickname". Ticket information: We may collect
                information created by you in the app, such as tickets, courses and user roles. This content is all
                stored in the HALP system until you decide to remove it yourself.
              </Text>

              <Text style={[{ color: text, fontSize: 22, marginTop: 25 }]}>How we use your information:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0 }]}>
                The information we collect is used in the HALP system to provide you with the full experience of the
                system.
              </Text>

              <Text style={[{ color: text, fontSize: 22, marginTop: 25 }]}>Deleting your information:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0 }]}>
                The deletion of information is very quickly and simply done by clicking the "Delete Personal Data"
                button in the profile settings. This action will remove all information connected to the user from the
                system, and it is not possible to retrieve it afterwards.
              </Text>

              <Text style={[{ color: text, fontSize: 22, marginTop: 25 }]}>Sharing of information:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0 }]}>
                HALP does not share your information with any third parties, and has no plans to do so in the future.
                The data collected is solely for using the HALP system, and we have no need or desire to pass it on to
                anyone else.
              </Text>

              <Text style={[{ color: text, fontSize: 22, marginTop: 25 }]}>How we protect your information:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0 }]}>
                We use reasonable and appropriate security measures to protect your information from unauthorized
                access, disclosure, and use. No security system is perfect, however, and we can unfortunately not
                guarantee that your information will be completely secure for all eternity.
              </Text>

              <Text style={[{ color: text, fontSize: 22, marginTop: 25 }]}>Changes to this privacy policy:</Text>

              <Text style={[{ color: text, fontSize: 16, marginTop: 0, marginBottom: 50 }]}>
                We may update this privacy policy from time to time. If we make any material changes to this privacy
                policy, we will notify you by posting a notice in the app and on the website.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
