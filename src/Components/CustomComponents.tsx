import { View, Text, TouchableOpacity, ViewStyle  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { ComponentProps, useContext } from 'react';
import DropDown from 'react-native-paper-dropdown';
import { Provider, DefaultTheme } from 'react-native-paper';
import Styles from "../styles/styles";
import { ThemeContext } from './ThemeContext';
import { Image } from 'react-native';


export const Logo = () => {
  return (
    <Image style={[Styles.logo]} source={require('.././img/halpy3.png')} />
  )
}


// Header component
interface Props {
  title: string;
}
export const Header = ({ title }: Props) => {
  const { text } = useContext(ThemeContext)
  return (
      <>
        <Logo/>
        <Text style={[Styles.Header, {color: text} ]}>{title}</Text>
      </>
  );
}


// Descripton component
interface DescriptionItemProps {
  description: string;
  style: ViewStyle;
}

export const DescriptionItem: React.FC<DescriptionItemProps> = ({ description, style }) => {
  return (
    <View style={style}>
      <Text style={[{fontSize:14}]}>{description}</Text>
    </View>
  );
};

// Checkbox component
interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
  iconStyle: object;
}

export const Customcheckbox: React.FC<CustomCheckboxProps> = (
  {
    checked,
    onPress,
    size = 25,
    iconStyle,
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        {checked ? (
          <MaterialCommunityIcons name="checkbox-blank-outline" style={iconStyle} size={size} />
        ) : (
          <MaterialCommunityIcons name="checkbox-blank-outline" style={iconStyle} size={size} />
        )}
      </TouchableOpacity>
    );
  };


  // Accordion component
  interface CustomAccordionProps {
    expanded: boolean;
    onPress: () => void;
    title: string;
    description: string;
    room: string;
    onCheck: () => void;
    checked: boolean;
    style: object;
    textStyle: object;
    titleStyle: object;
  }

  export const CustomAccordion: React.FC<CustomAccordionProps> = ({
    expanded,
    onPress,
    title,
    room,
    description,
    onCheck,
    checked,
    style,
    textStyle,
    titleStyle,
  }) => {

    const firstSentence = description.split('. ')[0];
    const subtitle = firstSentence + (firstSentence !== description ? '.' : '');

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
            <Text style={textStyle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          <View>
            <Text style={textStyle}>Room:{room}</Text>
            </View>
          <TouchableOpacity
            onPress={onCheck}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
           <Customcheckbox checked={checked} onPress={onCheck} iconStyle={textStyle}  />
          </TouchableOpacity>
        </TouchableOpacity>
        {expanded && (
          <View >
            <Text style={textStyle}>{description}</Text>
          </View>
        )}
      </View>
    );
  };
