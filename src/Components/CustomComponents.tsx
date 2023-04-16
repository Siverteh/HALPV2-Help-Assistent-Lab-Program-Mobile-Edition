import { View, Text, TouchableOpacity, ViewStyle  } from 'react-native';
import Styles from "../styles/styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DarkModeContext } from './GlobalHook';
import { useContext } from 'react'
import { theme } from '../styles/theme';


const { text, background } = useContext(DarkModeContext)


// Header component
interface Props {
  title: string;
}
export const Header = ({ title }: Props) => {
  return (
    <View>
      <Text style={[Styles.Header, {color:text}]}>{title}</Text>
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
    description: string;
    room: string;
    onCheck: () => void;
    checked: boolean;
    iconColor: object;
    style: object;
  }

  export const CustomAccordion: React.FC<CustomAccordionProps> = ({
    expanded,
    onPress,
    title,
    room,
    description,
    onCheck,
    checked,
    iconColor,
    style
  }) => {
    const titleStyle = {
      color: text,
      paddingHorizontal: 16,
      paddingVertical: 2,
      fontSize: 14,
    };
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
            <Text style={{color: text}} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          <View>
            <Text style={{color: text}}>Room:{room}</Text>
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
            <Text style={{color: text}}>{description}</Text>
          </View>
        )}
      </View>
    );
  };

  export default {Header, CustomAccordion, Customcheckbox}

