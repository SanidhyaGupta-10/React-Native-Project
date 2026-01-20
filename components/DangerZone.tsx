import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import createSettingsStyles from '@/app/styles/settings.styles'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const DangerZone = () => {
    const { colors } = useTheme();
    const settingsStyles = createSettingsStyles(colors);

    const clearAllTodos = useMutation(api.todos.deleteAllTodos);


    const handleResetApp = async () => {
        Alert.alert(
            "Reset App",
            "Are you sure you want to reset the app?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await clearAllTodos();
                            Alert.alert(
                                "App reset",
                                `Successfully deleted ${result.deletedCount} todo ${result.deletedCount === 1 ? "item" : "items"}`
                            );
                        } catch (err) {
                            console.log(err);
                            Alert.alert("Error", "Failed to reset app");
                        }
                    }
                }
            ]
        )
    }
    return (
        <LinearGradient colors={colors.gradients.surface}
            style={settingsStyles.section}
        >
         <Text style={settingsStyles.sectionTitle}>Danger Zone</Text>

         <TouchableOpacity
            style={[settingsStyles.actionButton, { borderBottomWidth: 0}]}
            onPress={handleResetApp}
            activeOpacity={0.7}
         >
            <View style={settingsStyles.actionLeft}>
                <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
                    <Ionicons name='trash' size={20} color='#fff'/>
                </LinearGradient>
                <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
            </View>
            <Ionicons name='chevron-forward' size={14} color={colors.textMuted}/>
         </TouchableOpacity>
        </LinearGradient>
    )
}

export default DangerZone