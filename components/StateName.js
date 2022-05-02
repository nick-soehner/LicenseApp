import React from "react";
import { Text, StyleSheet } from "react-native";

export function StateName(props) {
	return (
		<Text
			style={[
				styles.text,
				{
					color: props.foundItems.includes(props.place)
						? "white"
						: "black",
				},
			]}
		>
			{props.place}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "white",
		textTransform: "capitalize",
		fontSize: 30,
		margin: 5,
		fontSize: 25,
	},
});
