import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorageHook = () => {

    const getItem = (key: string) => {
        return AsyncStorage.getItem(key)
    }

    const setItem = (key: string, value: string) => {
        return AsyncStorage.setItem(
            key,
            value,
          )
    }

    return {
      getItem,
      setItem
    };
}