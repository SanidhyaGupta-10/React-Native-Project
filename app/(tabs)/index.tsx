import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
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

type Todo = Doc<"todos">

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  const toggleTodo = useMutation(api.todos.toggleTodo)

  const isLoading = todos === undefined

  if (isLoading) return <LoadingSpinner />

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id })
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Something went wrong")
    }
  }


  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isComplete ? colors.gradients.success : colors.gradients.empty}
              style={[
                homeStyles.checkboxInner,
                { borderColor: item.isComplete ? "transparent" : colors.border }
              ]}
            >
              {item.isComplete && <Ionicons name="checkmark" size={18} color={colors.surface} />}

            </LinearGradient>
          </TouchableOpacity>

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
          </View>

          <View style={homeStyles.todoActions}>
            <TouchableOpacity
              onPress={() => { }} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.warning}
                style={homeStyles.actionButton}
              >
                <Ionicons 
                 name="pencil" size={14} color='#fff'/>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity>
              <LinearGradient
                colors={colors.gradients.danger}
                style={homeStyles.actionButton}
              >
                <Ionicons 
                 name="trash" size={14} color='#fff'/>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </View>
    )
  }


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
          data={[]}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}