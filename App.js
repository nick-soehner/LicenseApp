import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Alert,
	Button,
} from "react-native";
import { STATES, EXTRA } from "./data";
import { StateList } from "./components/StateList";
import { ExtraList } from "./components/ExtraList";
import { Header } from "./components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
	const stateList = Object.values(STATES);
	const [foundItems, setFoundItems] = useState([]);
	const [foundStates, setFoundStates] = useState([]);
	const extraList = Object.values(EXTRA);
	useEffect(() => getAllKeys(), []);
	useEffect(() => checkComplete(), [foundStates]);

	const addData = async (value) => {
		try {
			await AsyncStorage.setItem(value, "found");
		} catch (e) {
			console.log(e);
		}
	};

	const removeData = async (value) => {
		try {
			await AsyncStorage.removeItem(value);
		} catch (e) {
			console.log(e);
		}
	};

	const getAllKeys = async () => {
		let keys = [];
		let foundPlates = [];
		try {
			keys = await AsyncStorage.getAllKeys();
			keys.forEach((el) => {
				if (stateList.includes(el)) {
					foundPlates.push(el);
				} else {
					return;
				}
			});
		} catch (e) {
			console.log("getAllKeys Error");
		}

		setFoundItems(keys);
		setFoundStates(foundPlates);
	};

	const handlePress = (e) => {
		if (foundItems.includes(e)) {
			console.log(`removing ${e}`);
			removeData(e);
		} else {
			console.log(`adding ${e}`);
			addData(e);
		}

		getAllKeys();
	};

	const checkComplete = () => {
		if (foundStates.length >= 50) {
			Alert.alert("Congratulations!", "You found them all", [
				{
					text: "Reset",
					onPress: () => resetStateGame(),
					style: "cancel",
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
		} else {
			return;
		}
	};

	const resetStateGame = () => {
		setFoundStates([]);

		stateList.forEach((el) => {
			removeData(el);
		});

		getAllKeys();
	};

	const resetAll = () => {
		setFoundStates([]);

		foundItems.forEach((el) => {
			removeData(el);
		});

		setFoundItems([]);
	};

	const resetStateGameAlert = () => {
		Alert.alert("Reset State Game", "Are you sure you want to reset?", [
			{
				text: "Yes",
				onPress: () => resetStateGame(),
				style: "cancel",
			},
			{
				text: "No",
				onPress: () => console.log("No Pressed"),
			},
		]);
	};

	const resetAllAlert = () => {
		Alert.alert(
			"Reset Everything",
			"Are you sure you want to reset everything?",
			[
				{
					text: "Yes",
					onPress: () => resetAll(),
					style: "cancel",
				},
				{
					text: "No",
					onPress: () => console.log("No Pressed"),
				},
			]
		);
	};

	return (
		<View style={styles.container}>
			<Header foundItems={foundItems} foundStates={foundStates} />
			<SafeAreaView style={styles.safeAreaContainer}>
				<ScrollView style={styles.scrollView}>
					<StateList
						stateList={stateList}
						foundItems={foundItems}
						handlePress={handlePress}
					/>
					<ExtraList
						extraList={extraList}
						foundItems={foundItems}
						handlePress={handlePress}
					/>
					<Button
						title={"Reset States"}
						onPress={resetStateGameAlert}
						color="white"
					/>
					<Button
						title={"Reset All"}
						onPress={resetAllAlert}
						color="white"
					/>
				</ScrollView>
			</SafeAreaView>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "gray",
	},
	safeAreaContainer: {
		flex: 1,
		backgroundColor: "gray",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	scrollView: {
		width: "100%",
	},
	scrollViewFlex: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
