export interface ILang {
  [key: string]: {
    text: string;
    lng: "en-US" | "tr-TR";
    icon: string;
  };
}

const LANG: ILang = {
  EN: {
    text: "English",
    lng: "en-US",
    icon: "CustomUsa",
  },
  TR: {
    text: "Türkçe",
    lng: "tr-TR",
    icon: "CustomTurkey",
  },
};

export const getLangWithKey = (key: ILang["key"]["lng"]): ILang["key"] => {
  // @ts-ignore
  return LANG[Object.keys(LANG).filter((f) => LANG[f].lng === key)];
};

export default LANG;
