import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AnimatedTabBarItem,
  TabBarItemStyleProps,
} from './animted-tab-bar-item';
import { useStableCallback } from './hooks/useStableCallback';
import { palette } from './theme/palette';

export const { width, height, scale, fontScale } = Dimensions.get('window');

const ABSOLUTE_FILL: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
};
const BOTTOM_VIEW: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: `rgba(255,255,255,1)`,
  flexDirection: 'row',
  position: 'relative',
  width: width,
  borderTopColor: palette.G2,
  borderTopWidth: 0.5,
  paddingHorizontal: 10,
};

export type TabItem = {
  [name: string]: {
    title: string;
    lottieFile: string;
    iconSize: number;
    textWidth: number;
    isShowBadge?: boolean;
    badgeCount?: number;
  };
};

export type TabbarProps = BottomTabBarProps &
  TabBarItemStyleProps & {
    tabs: TabItem;
    style?: StyleProp<ViewStyle>;
  };
const LottieTabbar = ({
  navigation,
  state,
  tabs: _tabs,
  style,
  ...rest
}: TabbarProps) => {
  const insets = useSafeAreaInsets();
  const tabs = useMemo(
    () =>
      Object.keys(_tabs).map((name) => {
        return {
          name,
          key: `key-${name}`,
          ..._tabs[name],
        };
      }),
    [_tabs]
  );
  const animatedLabel = useSharedValue(
    tabs.map((_, index) => {
      return state.index === index ? 1 : 0;
    })
  );

  const onAnimateLabel = useCallback(() => {
    'worklet';
    return (animatedLabel.value = tabs.map((_, i) => {
      return i === state.index ? 1 : 0;
    }));
  }, [animatedLabel, state.index, tabs]);

  useEffect(() => {
    onAnimateLabel();
  }, [onAnimateLabel, state]);

  const onPress = useStableCallback((index: number) => {
    const focused = index === state.index;
    const { key, name } = state.routes[index];

    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true,
    });

    if (!focused && !event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate(name),
        target: state.key,
      });
    }
  });

  return (
    <View
      style={StyleSheet.flatten([
        {
          height: 48.5 + insets.bottom,
          ...BOTTOM_VIEW,
          ...ABSOLUTE_FILL,
        },
        style,
      ])}
    >
      {tabs.map(({ key, ...itemRest }, index) => {
        return (
          <AnimatedTabBarItem
            key={key}
            animatedLabel={animatedLabel}
            index={index}
            animatedOnChange={onPress}
            {...itemRest}
            {...rest}
          />
        );
      })}
    </View>
  );
};

export default LottieTabbar;
