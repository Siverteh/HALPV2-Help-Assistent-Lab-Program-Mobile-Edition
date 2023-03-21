import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {List } from "react-native-paper"
import Styles from "../styles/styles"


  interface Props {
    title: string;
  }
  
const Header = ({ title}: Props) => {
    return (
      <View>
        <Text style={Styles.Header}>{title}</Text>
      </View>
    );
  };
  


const Helplist = () => {
  return (
<ScrollView style={Styles.dm_background}>
<Image style={[Styles.logo]} source={require('../features/HALP.png')}/>
    <Header title='Helplist'/>
    <List.Section >
        <List.Item
            title = "Markus"
            titleStyle={[Styles.dm_text,Styles.text_size16]}
            description="Heeeeeeelp"
            style={Styles.lm_whitelist}
            descriptionStyle={[Styles.lm_text,Styles.text_size14 ]}
            />
             <List.Item
            title = "Sondre"
            titleStyle={[Styles.lm_text,Styles.text_size16]}
            description="Heeeeeeelp"
            descriptionStyle={[Styles.lm_text,Styles.text_size14 ]}
            style={Styles.lm_bluelist}
            />
               <List.Item
              title = "Nikolai"
              titleStyle={[Styles.lm_text,Styles.text_size16]}
              description="Heeeeeeeelp"
              style={Styles.lm_whitelist}
              descriptionStyle={[Styles.lm_text,Styles.text_size14 ]}
            />
               <List.Item
            title = "I need HALP"
            titleStyle={[Styles.lm_text,Styles.text_size16]}
            description="Ole"
            descriptionStyle={[Styles.lm_text,Styles.text_size14 ]}
            style={Styles.lm_bluelist}
            />
               <List.Item
            title = "I need HALP"
            titleStyle={[Styles.lm_text,Styles.text_size16]}
            description="Sivert"
            style={Styles.lm_whitelist}
            descriptionStyle={[Styles.lm_text,Styles.text_size14 ]}
            />
               <List.Item
            title = "Charlotte"
            titleStyle={[Styles.lm_text,Styles.text_size16]}
            description="Heeeeeeelp"
            descriptionStyle={[Styles.lm_text,Styles.text_size14 ]}
            style={Styles.lm_bluelist}
            />
        </List.Section>
</ScrollView>
  );
}


export default Helplist