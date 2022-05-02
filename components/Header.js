import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import IMAGES from "../images";

export function Header(props) {
	return (
		<View style={styles.header}>
			<Image source={IMAGES["logo"]} style={styles.logo} />
			<Text style={styles.text}>{props.foundStates.length} / 50</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 100,
		backgroundColor: "#f5f5f5",
		paddingTop: 35,
		paddingLeft: 10,
		paddingRight: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 2,
		shadowColor: "black",
		shadowOffset: { height: 2 },
		shadowOpacity: 100,
	},
	logo: {
		width: 90,
		resizeMode: "contain",
	},
    text: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    }
});
