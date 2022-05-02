import React from "react";
import IMAGES from "../images";
import { Image, StyleSheet } from "react-native";

export function StatePlate(props) {
    return (
        <Image style={styles.plate} source={IMAGES[props.place]} />
    );
}

const styles = StyleSheet.create({
    plate: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
        width: 150,
        height: 75,
        resizeMode: "contain",
    },
});
