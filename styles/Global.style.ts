import { Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark';

const FontConstans = {
    familyRegular: 'Montserrat',
    color: isDarkMode ? "#ededeb" : "#4F4F4F",
    sizeTitleLogin: 24,
    sizeSubtitleLogin: 20,
};

const ColorsConstants = {
    backgroundColor: isDarkMode ? "#4F4F4F" : "#ededeb"
};

const SizeConstants = {

};

export {
    FontConstans,
    ColorsConstants,
    SizeConstants
}