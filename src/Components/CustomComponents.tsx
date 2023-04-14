import { View, Text, TouchableOpacity, ViewStyle  } from 'react-native';
import Styles from "../styles/styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { isDarkMode, setIsDarkMode } from '../App/App';

// Header component
interface Props {
  title: string;
  textStyle: object;
}

export const Header = ({ title, textStyle }: Props) => {
  return (
    <View>
      <Text style={[textStyle, Styles.Header]}>{title}</Text>
    </View>
  );
};

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
    titleStyle: object;
    style: object;
    description: string;
    descriptionStyle: object;
    room: string;
    onCheck: () => void;
    checked: boolean;
    roomstyle: object;
    subtitleStyle: object;
    iconColor: object;
  }

  export const CustomAccordion: React.FC<CustomAccordionProps> = ({
    expanded,
    onPress,
    title,
    style,
    room,
    description,
    titleStyle,
    descriptionStyle,
    onCheck,
    checked,
    roomstyle,
    subtitleStyle,
    iconColor,
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
            <Text style={titleStyle} >{title}</Text>
            <Text style={[subtitleStyle,{fontSize:14}]} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          <View>
            <Text style={roomstyle}>Room:{room}</Text>
            </View>         
          <TouchableOpacity
            onPress={onCheck}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
           <Customcheckbox checked={checked} onPress={onCheck} iconStyle={iconColor}  />
          </TouchableOpacity>
        </TouchableOpacity>
        {expanded && (
          <View >
            <Text style={descriptionStyle}>{description}</Text>
          </View>
        )}
      </View>
    );
  };

  export default {Header, CustomAccordion, Customcheckbox}

