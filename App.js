import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';

export default function App() {
  const [tasks, setTasks] = useState([]);  // Holds the list of tasks
  const [task, setTask] = useState('');    // Holds the current task input

  // Function to add a new task to the list
  const addTask = () => {
    if (task.trim()) {  // Check if task is not empty
      setTasks([...tasks, { id: Math.random().toString(), text: task, completed: false }]);
      setTask('');  // Clear the input field after adding the task
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to render each task in the list
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text style={item.completed ? styles.completedTaskText : styles.taskText}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo</Text>

      {/* Input for adding a new task */}
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={task}
        onChangeText={setTask}
      />
      
      {/* Button to add a task */}
      <Button title="Add Task" onPress={addTask} />

      {/* Task list */}
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e3e3e3',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTaskText: {
    fontSize: 16,
    flex: 1,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#ff5c5c',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 20,
    width: '100%',
  },
});
