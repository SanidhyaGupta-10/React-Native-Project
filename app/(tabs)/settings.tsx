import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import createSettingsStyles from '../styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressStats from '@/components/ProgressStats';
import Preferences from '@/components/Preferences';
import DangerZone from '@/components/DangerZone';

const settings = () => {
    const { colors } = useTheme();
    const settingStyles = createSettingsStyles(colors);

    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={settingStyles.container}
        >
            <SafeAreaView style={settingStyles.safeArea}>
                <View style={settingStyles.header}>
                    <View style={settingStyles.titleContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
                            <Ionicons name='settings' size={28} color={colors.textOnPrimary} />
                        </LinearGradient>
                        <Text style={settingStyles.title}>
                            Settings
                        </Text>
                    </View>
                </View>

                <ScrollView
                    style={settingStyles.scrollView}
                    contentContainerStyle={settingStyles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <ProgressStats />
                    {/* Preferences */}
                    <Preferences />

                    <DangerZone />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default settings