import { View, Text, TouchableOpacity, ViewStyle  } from 'react-native';
import Styles from "../styles/styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Header component
interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <View>
      <Text style={Styles.Header}>{title}</Text>
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
      <Text style={[Styles.lm_text, {fontSize:14}]}>{description}</Text>
    </View>
  );
};

// Checkbox component
interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
  color?: string;
}

export const Customcheckbox: React.FC<CustomCheckboxProps> = (
  {
    checked,
    onPress,
    size = 25,
    color = '#000',
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        {checked ? (
          <MaterialCommunityIcons name="checkbox-blank-outline" color={color} size={size} />
        ) : (
          <MaterialCommunityIcons name="checkbox-blank-outline" color={color} size={size} />
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
    onCheck: () => void;
    checked: boolean;
  }

  export const CustomAccordion: React.FC<CustomAccordionProps> = ({
    expanded,
    onPress,
    title,
    style,
    description,
    descriptionStyle,
    onCheck,
    checked,
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
            <Text style={Styles.lm_text}>{title}</Text>
            <Text style={[Styles.lm_text, {fontSize:14}]} numberOfLines={1}>
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
           <Customcheckbox checked={checked} onPress={onCheck} color="#000" />
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

  export default {Header, CustomAccordion, Customcheckbox}

