import { StyleSheet } from 'react-native';
import { ColorsConstants, FontConstans } from './Global.style';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorsConstants.backgroundColor,
    },
    header: {
        backgroundColor: ColorsConstants.backgroundColor,
        paddingVertical: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 90,
    },
    userName: {
        color: FontConstans.color,
        marginLeft: 8,
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
    },
    logoutButton: {
        backgroundColor: FontConstans.color,
        marginLeft: 16,
    },
    listContainerPortrait: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    listContainerLandscape: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: FontConstans.color,
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    fab: {
        width: 154,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        elevation: 4,
    },
    fabLocation: {
        backgroundColor: ColorsConstants.backgroundColor,
    },
    fabForm: {
        backgroundColor: ColorsConstants.backgroundColor,
    },
    fabLabel: {
        fontSize: 24,
        color: FontConstans.color,
        fontWeight: "bold",
    },
    cityInfoContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        elevation: 4,
    },
});