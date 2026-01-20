import createHomeStyles from '@/app/styles/home.style';
import { api } from '@/convex/_generated/api';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'


const TodoInput = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async () => {
        if(newTodo.trim()){
            try{
                await addTodo({ text: newTodo })
                setNewTodo("");
            } catch (err){
                console.log(err);
                Alert.alert("Error", "Failed to add Todo")
            }
        };  
    };

  return (
   <View style={homeStyles.inputSection}>
    <View style={homeStyles.inputWrapper}>
        <TextInput 
           style={homeStyles.input}
           placeholder='What needs to be done?'
           value={newTodo}
           onChangeText={setNewTodo}
           onSubmitEditing={handleAddTodo}
           placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
        onPress={handleAddTodo}
        activeOpacity={0.5}
        disabled={!newTodo.trim()}
        >
            <LinearGradient
                colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
            >
                <Ionicons name='add' size={24} color={colors.textOnPrimary}/>
            </LinearGradient>
        </TouchableOpacity>
    </View>
   </View>
  )
}

export default TodoInput