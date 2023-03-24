
import  { useState } from 'react';
import { View, Image  } from 'react-native';
import { List, } from "react-native-paper";
import {Light_Styles, Dark_Styles, Misc_Style} from "../styles/styles";
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

  const handleCheck = (id: string) => {
    const currentChecked = checked.get(id) || false;
    setChecked(new Map(checked.set(id, !currentChecked)));
  };

  const handleExpand = (id: string) => {
    const currentExpanded = expanded.get(id) || false;
    setExpanded(new Map(expanded.set(id, !currentExpanded)));
  };

  

  return (
    <View style={Light_Styles.lm_background}>
      <Image style={[Misc_Style.logo]} source={require('../features/HALP.png')} />
      <Header title='Helplist' />
      <List.Section>
        {helplistData.map((item, index) => (
          <CustomAccordion
            key={item.id}
            title={item.title}
            titleStyle={[Light_Styles.lm_text,
              { paddingHorizontal: 16, paddingVertical: 2, fontSize:14 },
            ]}
            style={[
              index % 2 === 0 ? Light_Styles.lm_whitelist : Light_Styles.lm_bluelist,
              { marginVertical: 2 },
            ]}
            expanded={expanded.get(item.id) || false}
            onPress={() => handleExpand(item.id)}
            description={item.description}
            descriptionStyle={{ paddingHorizontal: 16, paddingVertical: 6 }}
            onCheck={() => handleCheck(item.id)}
            checked={checked.get(item.id) || false}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default Helplist;