import { palette } from '../example/src/App';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  TouchableWithoutFeedback,
  ViewStyle,
  Text,
  TextStyle,
  View,
  StyleProp,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import NoticeBadge from './badge';
import type { TabItem } from '.';
import { clamp } from './utils';

export const ml = (multiple = 1) => {
  return {
    marginLeft: 4 * multiple,
  };
};
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const BOTTOM_TAB_ITEM: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'nowrap',
};
const BOTTOM_TAB: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  flexWrap: 'nowrap',
  paddingTop: 12,
};
const CIRCLE_STYLE: ViewStyle = {
  width: 4,
  height: 4,
  borderRadius: 4,
  marginTop: 4,
  backgroundColor: palette.G7,
  position: 'absolute',
  bottom: -8,
  left: 10,
};
const TEXT_STYLE: TextStyle = {
  fontSize: 10,
  fontWeight: 'bold',
  lineHeight: 20,
  marginLeft: 4,
};

export type TabBarItemStyleProps = {
  textStyle?: StyleProp<TextStyle>;
  tabBarItemStyle?: StyleProp<ViewStyle>;
  tabBarItemContainerStyle?: StyleProp<ViewStyle>;
};

export type TabBarItemProps = TabItem[string] &
  TabBarItemStyleProps & {
    selectedIndex: Animated.SharedValue<number>;
    index: number;
    animatedLabel: Animated.SharedValue<number[]>;
    animatedOnChange: (index: number) => void;
  };

export const AnimatedTabBarItem = ({
  title,
  selectedIndex,
  index,
  animatedLabel,
  animatedOnChange,
  lottieFile,
  isShowBadge,
  badgeCount,
  iconSize,
  textWidth,
  textStyle,
  tabBarItemStyle,
  tabBarItemContainerStyle,
}: TabBarItemProps) => {
  const minWidth = iconSize;
  const maxWidth = minWidth + textWidth + 4;

  const viewStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedLabel.value[index] ? maxWidth : minWidth, {
        duration: 300,
      }),
    };
  }, [index, selectedIndex]);
  const labelContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedLabel.value[index], { duration: 300 }),
    };
  });

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(animatedLabel.value[index], { duration: 250 }),
        },
      ],
    };
  });

  const autoPlayAnimatedProps = useAnimatedProps(() => {
    return {
      progress: withTiming(clamp(0, animatedLabel.value[index], 0.5), {
        duration: 600,
      }),
    };
  });

  return (
    <TouchableWithoutFeedback onPress={() => animatedOnChange(index)}>
      <View style={[BOTTOM_TAB, tabBarItemContainerStyle]}>
        <Animated.View
          accessible={true}
          style={[BOTTOM_TAB_ITEM, viewStyle, tabBarItemStyle]}
          accessibilityRole="button"
        >
          <Animated.View style={{ width: iconSize, height: iconSize }}>
            <AnimatedLottieView
              animatedProps={autoPlayAnimatedProps}
              source={lottieFile}
            />
            {isShowBadge && <NoticeBadge count={badgeCount || 0} />}
            <Animated.View style={[CIRCLE_STYLE, circleStyle]} />
          </Animated.View>
          <Animated.View style={labelContainerStyle}>
            <Text
              numberOfLines={1}
              style={StyleSheet.flatten([TEXT_STYLE, textStyle])}
            >
              {title}
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
