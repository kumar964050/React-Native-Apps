import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
// import CheckBox from "react-native-check-box";
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
    <SafeAreaView style={styles.container}>
      {/* title */}
      <Text style={styles.title}>Todos</Text>
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
        <FlatList
          data={tasks}
          renderItem={(itemData) => {
            const each = itemData.item;
            return (
              <View style={styles.eachTask} key={each.id}>
                <View>
                  {/* <CheckBox /> */}
                  <Text
                    onPress={() => handleCompleteTask(each.id)}
                    style={[styles.task, each.isCompleted && styles.str]}
                  >
                    {each.task}
                  </Text>
                </View>

                <Text
                  style={styles.deleteIcon}
                  onPress={() => handleDelete(each.id)}
                >
                  X
                </Text>
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
    padding: 20,
    height: "100%",
  },
  title: {
    marginVertical: 10,
    fontSize: 30,
    textAlign: "center",
  },
  taskInput: {
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
    fontSize: 16,
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
  },
  eachTask: {
    backgroundColor: "#e6f6ff",
    padding: 15,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    borderLeftColor: "#096f92",
    borderLeftWidth: 5,
  },
  task: {
    fontSize: 16,
  },
  str: {
    textDecorationLine: "line-through",
  },
  deleteIcon: {
    fontSize: 20,
    color: "red",
  },
});
