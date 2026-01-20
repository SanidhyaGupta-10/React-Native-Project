import { View, Text } from 'react-native'
import React, { use } from 'react'
import { useTheme } from '@/hooks/useTheme';
import createSettingsStyles from '@/app/styles/settings.styles';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProgressStats = () => {
    const { colors } = useTheme();
    const settingStyles = createSettingsStyles(colors);

    const todos = useQuery(api.todos.getTodos);
    const totalTodos = todos ? todos.length : 0;
    const completedTodos = todos ? todos.filter((todo) => todo.isComplete).length : 0;
    const activeTodos = totalTodos - completedTodos;

    return (
        <LinearGradient colors={colors.gradients.surface}
            style={settingStyles.section}>
            {/* {Heading} */}
            <Text style={settingStyles.sectionTitle}>Progress Stats</Text>
                {/* Stats Cards */}
            <View style={settingStyles.statsContainer}>
                {/* {Total-Todos} */}
                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingStyles.statCard, { borderLeftColor: colors.primary }]}
                >
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient
                            colors={colors.gradients.primary}
                            style={settingStyles.statIcon}
                        >
                            <Ionicons name='list' size={20} color='#fff' />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingStyles.statNumber}>{totalTodos}</Text>
                        <Text style={settingStyles.statLabel}>Total Todos</Text>
                    </View>
                </LinearGradient>
                {/* Completed */}
                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingStyles.statCard, { borderLeftColor: colors.success }]}
                >
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient
                            colors={colors.gradients.success}
                            style={settingStyles.statIcon}
                        >
                            <Ionicons name='list' size={20} color='#fff' />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingStyles.statNumber}>{completedTodos}</Text>
                        <Text style={settingStyles.statLabel}>Completed</Text>
                    </View>
                </LinearGradient>
                {/* ActiveTodos */}
                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingStyles.statCard, { borderLeftColor: colors.warning}]}
                >
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient
                            colors={colors.gradients.warning}
                            style={settingStyles.statIcon}
                        >
                            <Ionicons name='list' size={20} color='#fff' />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingStyles.statNumber}>{activeTodos}</Text>
                        <Text style={settingStyles.statLabel}>Active</Text>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    )
}

export default ProgressStats