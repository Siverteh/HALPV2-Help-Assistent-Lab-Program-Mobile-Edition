
import  { useState } from 'react';
import { View, Image  } from 'react-native';
import { Button, List, Text, } from "react-native-paper";
import Styles from "../styles/styles";
import { Header, CustomAccordion}  from "../Components/CustomComponents"

// Data to helplist
  const helplistData = [
    { id: "1", title: "Markus", description: "Heeeeeeelp!  My name is Markus and i need some serious help. Its hard" },
    { id: "2", title: "Sondre", description: "Heeeeeeelp" },
    { id: "3", title: "Nikolai", description: "Heeeeeeeelp" },
    { id: "4", title: "I need HALP", description: "Ole" },
    { id: "5", title: "I need HALP", description: "Sivert" },
    { id: "6", title: "Charlotte", description: "Heeeeeeelp" }
  ];




// Helplist
const Helplist = () => {

  const [checked, setChecked] = useState(new Map());
  const [expanded, setExpanded] = useState(new Map());
  const [Mode, setMode] = useState(false);

  const handleCheck = (id: string) => {
    const currentChecked = checked.get(id) || false;
    setChecked(new Map(checked.set(id, !currentChecked)));
  };

  const handleExpand = (id: string) => {
    const currentExpanded = expanded.get(id) || false;
    setExpanded(new Map(expanded.set(id, !currentExpanded)));
  };

  const handleToggle = () => {
    setMode(!Mode);
  }

  //const styles = Mode ? Styles : Styles;


  
  return (
    <View style={Styles.lm_background}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button onPress={() => handleToggle()}>
          <Text>Toggle</Text>
        </Button>
      </View>
      <Image style={[Styles.logo]} source={require('../features/HALP.png')} />
      <Header title='Helplist'/>
      <List.Section style= {Styles.lm_background}>
        {helplistData.map((item, index) => (
          <CustomAccordion
            key={item.id}
            title={item.title}
            titleStyle={[Styles.lm_text,
              { paddingHorizontal: 16, paddingVertical: 2, fontSize:14 },
            ]}
            style={[
              index % 2 === 0 ? Styles.lm_whitelist : Styles.lm_bluelist]}
            expanded={expanded.get(item.id) || false}
            onPress={() => handleExpand(item.id)}
            description={item.description}
            descriptionStyle={{ paddingHorizontal: 2, paddingVertical: 5 }}
            onCheck={() => handleCheck(item.id)}
            checked={checked.get(item.id) || false}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default Helplist;