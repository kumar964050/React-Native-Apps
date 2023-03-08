import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

import { v4 as uuidV4 } from "uuid";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  // handle change
  const handleOnChange = (text) => {
    setNewTask(text);
  };
  //  add new task
  const handleTask = () => {
    if (newTask === "") return "";
    const assNewTask = {
      id: uuidV4(),
      task: newTask,
      isCompleted: false,
    };
    setTasks([...tasks, assNewTask]);
    setNewTask("");
  };
  // delete tsk
  const handleDelete = (id) => {
    const filterData = tasks.filter((each) => each.id != id);
    setTasks(filterData);
  };
  // task complete handler
  const handleCompleteTask = (id) => {
    const mappedData = tasks.map((each) => {
      if (each.id === id) {
        if (each.isCompleted)
          return {
            ...each,
            isCompleted: false,
          };
        return {
          ...each,
          isCompleted: true,
        };
      }
      return each;
    });
    setTasks(mappedData);
  };

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.header}>
        <Text style={styles.title}>Todos</Text>
      </View>
      {/* add todo task */}
      <View style={styles.taskInput}>
        <Text style={styles.taskTitle}>Create Task</Text>
        <TextInput
          style={styles.InputText}
          placeholder="Enter Your Task Here..."
          onChangeText={handleOnChange}
          value={newTask}
        />
        <Button onPress={handleTask} title="Add" />
      </View>
      {/* list of tasks */}
      <Text style={styles.taskTitle}>My Tasks</Text>
      {/* no Todo Tasks */}
      {tasks.length === 0 && (
        <View style={styles.noTasks}>
          <Text style={styles.noTasksMsg}>No Todo Tasks</Text>
        </View>
      )}
      {/* todo tasks */}
      {tasks.length !== 0 && (
        <ScrollView style={styles.taskContainer}>
          {tasks.map((each) => {
            return (
              <View style={styles.eachTask} key={each.id}>
                <Text
                  onPress={() => handleCompleteTask(each.id)}
                  style={[styles.task, each.isCompleted && styles.str]}
                >
                  {each.task}
                </Text>
                <Text onPress={() => handleDelete(each.id)}>X</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 25,
    paddingTop: 50,
  },
  header: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  taskInput: {
    padding: 2,
    marginVertical: 5,
  },
  taskTitle: {
    fontSize: 20,
  },
  InputText: {
    borderColor: "lightgrey",
    borderWidth: 1,
    marginVertical: 10,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  noTasks: {
    marginVertical: 200,
  },
  noTasksMsg: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
  },
  taskContainer: {
    marginVertical: 10,
    overflow: "visible",
  },
  eachTask: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  task: {
    fontSize: 16,
  },
  str: {
    textDecorationLine: "line-through",
  },
});
