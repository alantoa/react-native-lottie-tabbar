import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LottieTabbar, { TabItem } from '../../src';

const BottomTab = createBottomTabNavigator();

export enum RootScreenEnum {
  RootTab1 = 'home',
  RootTab2 = 'community',
  RootTab3 = 'cars',
  RootTab4 = 'notice',
}
export const palette = {
  transparent: `rgba(0,0,0,0)`,
  Main: `rgba(61, 219, 209, 1)`,
  ActiveMain: `rgba(41, 142, 136, 1)`,
  Danger: `rgba(255, 61, 74, 1)`,
  Warning: `rgba(255, 187, 0, 1)`,
  Info: `rgba(0, 99, 247, 1)`,
  Success: `rgba(1, 208, 134, 1)`,
  W: `rgba(255, 255, 255, 1)`,
  G1: `rgba(245, 247, 250, 1)`,
  G2: `rgba(225, 227, 229, 1)`,
  G3: `rgba(195, 197, 199, 1)`,
  G4: `rgba(157, 159, 163, 1)`,
  G5: `rgba(108, 110, 112, 1)`,
  G6: `rgba(39, 41, 46, 1)`,
  G7: `rgba(44, 45, 47, 1)`,
  G8: `rgba(23, 26, 31, 1)`,
  B: `rgba(0, 0, 0, 1)`,
};

const getViewStyle = (color: string) => ({
  flex: 1,
  backgroundColor: color,
});

const RootTab1 = () => {
  return <View style={getViewStyle(palette.Main)} />;
};
const RootTab2 = () => {
  return <View style={getViewStyle(palette.Info)} />;
};
const RootTab3 = () => {
  return <View style={getViewStyle(palette.Danger)} />;
};

const RootTab4 = () => {
  return <View style={getViewStyle(palette.Warning)} />;
};

const _tabs: TabItem = {
  [RootScreenEnum.RootTab1]: {
    title: 'Home',
    lottieFile: require('./lottie/home.json'),
    iconSize: 24,
    textWidth: 30,
  },
  [RootScreenEnum.RootTab2]: {
    title: 'Community',
    lottieFile: require('./lottie/community.json'),
    iconSize: 24,
    textWidth: 60,
  },
  [RootScreenEnum.RootTab3]: {
    title: 'Cars',
    lottieFile: require('./lottie/car.json'),
    iconSize: 24,
    textWidth: 24,
  },
  [RootScreenEnum.RootTab4]: {
    title: 'Message',
    lottieFile: require('./lottie/notice.json'),
    iconSize: 24,
    textWidth: 46,
    isShowBadge: true,
    badgeCount: 1,
  },
};

const App = () => {
  const [tabs, setTabs] = useState(_tabs);
  useEffect(() => {
    setTimeout(() => {
      const obj = { ...tabs } as any;
      obj[RootScreenEnum.RootTab4].badgeCount += 2;
      setTabs(obj);
    }, 2000);
  }, [tabs]);
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName={RootScreenEnum.RootTab1}
        tabBar={(props) => <LottieTabbar {...props} tabs={tabs} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <BottomTab.Screen name={RootScreenEnum.RootTab1} component={RootTab1} />
        <BottomTab.Screen name={RootScreenEnum.RootTab2} component={RootTab2} />
        <BottomTab.Screen name={RootScreenEnum.RootTab3} component={RootTab3} />
        <BottomTab.Screen name={RootScreenEnum.RootTab4} component={RootTab4} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};
export default App;
