import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function AppTextInput({ label, error, ...props }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#999"
        {...props} // placeholder, secureTextEntry, value, onChangeText
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bebebe",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderColor: "tomato",
  },
  errorText: {
    color: "tomato",
    fontSize: 12,
    marginTop: 5,
  },
});
