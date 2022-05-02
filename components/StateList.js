import React, {useEffect} from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { StatePlate } from "./StatePlate";
import { StateName } from "./StateName";

export function StateList(props) {
	return (
		<View style={styles.stateWrapper}>
			{props.stateList.map((state, key) => {
				return (
					<Pressable
						onPress={() => props.handlePress(state)}
						key={key}
						style={[
							styles.pressable,
							{
								backgroundColor: props.foundItems.includes(
									state
								)
									? "green"
									: "#f5f5f5",
							},
						]}
					>
						<View style={styles.stateContainer}>
							<StateName
								place={state}
								foundItems={props.foundItems}
							/>
							<StatePlate place={state} />
						</View>
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	stateWrapper: {
		width: "100%",
		height: "100%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	stateContainer: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		padding: 10,
	},
	pressable: {
		width: "95%",
		borderRadius: 10,
		margin: 10,
		shadowColor: "black",
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 25,
	},
});
