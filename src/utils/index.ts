import { Platform } from 'react-native';

export * from './Math';
export const isIos = Platform.OS === 'ios';
