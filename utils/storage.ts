import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "APP_";

export const storage = {
  async setData(key: string, value: string | Record<string, any> | boolean) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`${PREFIX}${key}`, jsonValue);
    } catch (e) {
      // saving error
    }
  },

  async getData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(`${PREFIX}${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  },
};
