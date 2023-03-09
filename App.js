import { useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
  Image,
} from "react-native";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isModelShow, setIsModelShow] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  // handle change
  const handleChange = (text) => {
    setNewGoal(text);
  };
  const handleAddGoal = () => {
    if (newGoal === "") return;
    setGoals([
      ...goals,
      {
        id: "demo" + newGoal,
        text: newGoal,
      },
    ]);
    setIsModelShow(false);
    setNewGoal("");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* title */}
      <Button title="Add Goal" onPress={() => setIsModelShow(true)} />
      <Text style={styles.title}>My Goals</Text>
      {/* input container */}
      {isModelShow && (
        <Modal animationType="fade">
          <View style={styles.InputModel}>
            <Image style={styles.image} source={require("./assets/goal.png")} />
            <TextInput
              value={newGoal}
              style={styles.inputField}
              onChangeText={handleChange}
            />
            {/* buttons container */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Add" onPress={handleAddGoal} />
              </View>
              <View style={styles.button}>
                <Button title="cancel" onPress={() => setIsModelShow(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* list of goals */}
      {goals.length === 0 && (
        <View style={styles.noGoalsContainer}>
          <Text style={styles.noGoalsMsg}>No Goals Yet</Text>
        </View>
      )}
      {goals.length !== 0 && (
        <FlatList
          data={goals}
          renderItem={({ item }) => {
            return (
              <View style={styles.eachGoal}>
                <Pressable
                  android_ripple={{ color: "#ddddddd" }}
                  style={(pressData) => pressData.pressed && styles.pressed}
                >
                  <Text style={styles.eachGoalText}>{item.text}</Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "purple",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 600,
    color: "white",
  },
  inputField: {
    borderColor: "white",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    color: "white",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 5,
  },
  noGoalsContainer: {
    height: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noGoalsMsg: {
    fontWeight: 600,
    fontSize: 30,
    color: "white",
  },
  InputModel: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "purple",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    margin: 20,
  },
  eachGoal: {
    backgroundColor: "#4630eb",
    fontSize: 18,
    color: "white",
    marginVertical: 3,
    borderRadius: 4,
  },
  eachGoalText: {
    fontSize: 18,
    color: "white",
    padding: 10,
  },
  pressed: {
    color: "#ddddddd",
  },
});
