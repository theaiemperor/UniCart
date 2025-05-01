import { create } from "zustand";

export interface ISettingProps {
  interface: {
    current: "dark" | "light" | "system";
    isDark?: boolean;
  };
}

export interface ISettingStore {
  settings: ISettingProps;
  resetSettings: () => void;
  updateSettings: (newSettings: Partial<ISettingProps>) => void;
}

const defaultSettings: ISettingProps = {
  interface: {
    current: "system",
  },
};

export default create<ISettingStore>((set) => ({
  settings: defaultSettings,
  resetSettings: () => {
    set((state) => ({
      ...state,
      settings: defaultSettings,
    }));
  },
  updateSettings: (newSettings: Partial<ISettingProps>) => {
    set((state) => ({
      ...state,
      settings: { ...state.settings, ...newSettings },
    }));
  },
}));
