import nativeIdGenerator from 'react-native-uuid';

export const uuid = () => nativeIdGenerator.v4().toString();
