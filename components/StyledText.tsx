import { Text, TextProps, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';

interface StyledTextProps extends TextProps {
  regular?: boolean;
  bold?: boolean;
}

const StyledText: React.FC<StyledTextProps> = ({
  children,
  regular = true,
  bold = false,
  style,
  ...props
}) => {
  const getFontFamily = () => {
    if (bold) return 'Lexend-Regular';
    return 'Lexend-Light';
  };

  return (
    <Text
      style={[
        styles.text,
        { fontFamily: getFontFamily(), includeFontPadding: false },
        style,
      ]}
      
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
  },
});

export default StyledText;