import { View, Text, TouchableOpacity, ViewStyle  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useContext } from 'react';
import Styles from "../styles/styles";
import { ThemeContext } from './ThemeContext';
import { Image } from 'react-native';


interface Props {
  title?: string;
}

export const Logo = () => {
  return (
    <Image style={[Styles.logo]} source={require('.././img/halpy3.png')} />
  )
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
        <MaterialCommunityIcons name="archive-outline" style={iconStyle} size={size} />
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
    const sentences = description.split('. ');
    const firstSentence = sentences[0];
    const remainingSentences = sentences.slice(1).join('. ');
  
    return (
      <View style={style}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={titleStyle}>{title}</Text>
            {expanded ? (
              <Text style={textStyle}>{description}</Text>
            ) : (
              <Text style={textStyle} numberOfLines={1}>
                {firstSentence}
              </Text>
            )}
          </View>
          <View>
            <Text style={textStyle}>Room: {room}</Text>
          </View>
          <TouchableOpacity
            onPress={onCheck}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Customcheckbox checked={checked} onPress={onCheck} iconStyle={textStyle} />
          </TouchableOpacity>
        </TouchableOpacity>
        {expanded && (
          <View>
            <Text style={textStyle}>{remainingSentences}</Text>
          </View>
        )}
      </View>
    );
  };
