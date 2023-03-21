
import  { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ViewStyle  } from 'react-native';
import { List, Checkbox, TitleProps } from "react-native-paper";
import Styles from "../styles/styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <View>
      <Text style={Styles.Header}>{title}</Text>
    </View>
  );
};

interface DescriptionItemProps {
  description: string;
  style: ViewStyle;
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({ description, style }) => {
  return (
    <View style={style}>
      <Text style={[Styles.lm_text, Styles.text_size14]}>{description}</Text>
    </View>
  );
};

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

  const helplistData = [
    { id: "1", title: "Markus", description: "Heeeeeeelp!  My name is Markus and i need some serious help. Its hard" },
    { id: "2", title: "Sondre", description: "Heeeeeeelp" },
    { id: "3", title: "Nikolai", description: "Heeeeeeeelp" },
    { id: "4", title: "I need HALP", description: "Ole" },
    { id: "5", title: "I need HALP", description: "Sivert" },
    { id: "6", title: "Charlotte", description: "Heeeeeeelp" }
  ];


  interface CustomCheckboxProps {
    checked: boolean;
    onPress: () => void;
    size?: number;
    color?: string;
  }

  const Customcheckbox: React.FC<CustomCheckboxProps> = (
    {
      checked,
      onPress,
      size = 25,
      color = '#000',
    }) => {
      return (
        <TouchableOpacity onPress={onPress}>
          {checked ? (
            <MaterialCommunityIcons name="checkbox-marked" color={color} size={size} />
          ) : (
            <MaterialCommunityIcons name="checkbox-blank-outline" color={color} size={size} />
          )}
        </TouchableOpacity>
      );
    };

  interface CustomAccordionProps {
    expanded: boolean;
    onPress: () => void;
    title: string;
    titleStyle: object;
    style: object;
    description: string;
    descriptionStyle: object;
    onCheck: () => void;
    checked: boolean;
  }

  const CustomAccordion: React.FC<CustomAccordionProps> = ({
    expanded,
    onPress,
    title,
    titleStyle,
    style,
    description,
    descriptionStyle,
    onCheck,
    checked,
  }) => {
    const firstSentence = description.split('. ')[0];
    const subtitle = firstSentence + (firstSentence !== description ? '.' : '');
    const rest = description.substring(subtitle.length).trim().split('\n').join('\n');
  
    return (
      <View style={style}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flex: 1 }}>
            <Text style={titleStyle}>{title}</Text>
            <Text style={[Styles.lm_text, Styles.text_size14]} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onCheck}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Customcheckbox checked={checked} onPress={onCheck} />
          </TouchableOpacity>
        </TouchableOpacity>
        {expanded && (
          <View style={descriptionStyle}>
            <Text>{description}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={Styles.lm_background}>
      <Image style={[Styles.logo]} source={require('../features/HALP.png')} />
      <Header title='Helplist' />
      <List.Section>
        {helplistData.map((item, index) => (
          <CustomAccordion
            key={item.id}
            title={item.title}
            titleStyle={[
              Styles.lm_text,
              Styles.text_size16,
              { paddingHorizontal: 16, paddingVertical: 2 },
            ]}
            style={[
              index % 2 === 0 ? Styles.lm_whitelist : Styles.lm_bluelist,
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