import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import AnimatedNumber from 'react-native-animated-numbers';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { palette } from './theme/palette';
const BADGE_CONTAINER_STYLE: ViewStyle = {
  backgroundColor: palette.Danger,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 4,
  minWidth: 16,
};
const BADGE_STYLE: ViewStyle = {
  backgroundColor: palette.W,
  padding: 1,
  position: 'absolute',
  right: -8,
  top: -8,
  borderRadius: 8,
};
const NUMBER_STYLE: TextStyle = {
  fontSize: 10,
  lineHeight: 14,
  fontWeight: 'bold',
  color: palette.W,
  letterSpacing: 0.1,
};

type IProps = {
  count: number;
};
const NoticeBadge = ({ count }: IProps) => {
  const badgeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(count === 0 ? 0 : 1),
    };
  }, [count]);

  return (
    <Animated.View style={[BADGE_STYLE, badgeStyle]}>
      <View style={BADGE_CONTAINER_STYLE}>
        <AnimatedNumber
          animateToNumber={count}
          fontStyle={NUMBER_STYLE}
          animationDuration={600}
        />
      </View>
    </Animated.View>
  );
};

export default NoticeBadge;
