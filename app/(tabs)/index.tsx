import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import createHomeStyles from "../styles/home.style";
import TodoInput from "@/components/TodoInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editedText, setEditedText] = useState<string>();

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  // Handle Todo
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  // Handle Delete Todo
  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  // Handler Edit
  const handleEditTodo = (todo: Todo) => {
    setEditedText(todo.text);
    setEditingId(todo._id);
  };

  // Handler Save
  const handleSaveEdit = async () => {
    if (editingId && editedText) {
      try {
        await updateTodo({ id: editingId, text: editedText.trim() });
        setEditingId(null);
        setEditedText("");
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Something went wrong");
      }
    }
  };

  // Handler Cancel
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity style={homeStyles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient
              colors={
                item.isComplete
                  ? colors.gradients.success
                  : colors.gradients.empty
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isComplete
                    ? "transparent"
                    : colors.border,
                },
              ]}
            >
              {item.isComplete && (
                <Ionicons
                  name="checkmark"
                  size={18}
                  color={colors.surface}
                />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Line-through applied when task is completed */}
          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput 
                style={homeStyles.editInput}
                value={editedText}
                onChangeText={setEditedText}
                autoFocus
                multiline
                placeholder='Edit your todo....'
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButtons}>
                 <TouchableOpacity 
                onPress={handleSaveEdit}
                activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={handleCancelEdit}
                activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isComplete && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>

              <View style={homeStyles.todoActions}>
                {/* Edit icon */}
                <TouchableOpacity 
                onPress={() => handleEditTodo(item)}
                activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Delete icon */}
                <TouchableOpacity 
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      key={colors.bg}
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.bg}
        translucent={false}
      />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          /* showsVerticalScrollIndicator={false} */
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
