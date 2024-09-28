import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Main = () => {
	const router = useRouter();
	const theme = useTheme();
	return (
		<View style={styles.container}>
			<Pressable onPress={() => router.navigate("/city")}>
				<Text style={{ color: theme.colors.text }}>Main</Text>
			</Pressable>
		</View>
	);
};

export default Main;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
