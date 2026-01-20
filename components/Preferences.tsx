import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/hooks/useTheme';
import createSettingsStyles from '@/app/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


const Preferences = () => {
    const [isAutoSync, setIsAutoSync] = useState(true);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const settingsStyles = createSettingsStyles(colors);


    return (
        <LinearGradient colors={colors.gradients.surface}
            style={settingsStyles.section}
        >
            {/* DarkMode */}
            <Text style={settingsStyles.sectionTitle}>Preferences</Text>

            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient
                        style={settingsStyles.settingIcon}
                        colors={colors.gradients.primary}
                    >
                        <Ionicons name='moon' size={18} color='#fff'/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Dark Mode</Text>
                </View>
                <Switch 
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor={'#fff'}
                    trackColor={{ false: colors.border, true: colors.primary}}
                />
            </View>
            {/* NOTIFICATIONS */}
           <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient
                        style={settingsStyles.settingIcon}
                        colors={colors.gradients.warning}
                    >
                        <Ionicons name='notifications' size={18} color='#fff'/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Notifications</Text>
                </View>
                <Switch 
                    value={isNotificationEnabled}
                    onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
                    thumbColor={'#fff'}
                    trackColor={{ false: colors.border, true: colors.warning}}
                />
            </View>
            {/* AutoSync */}
           <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient
                        style={settingsStyles.settingIcon}
                        colors={colors.gradients.success}
                    >
                        <Ionicons name='sync' size={18} color='#fff'/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Notifications</Text>
                </View>
                <Switch 
                    value={isAutoSync}
                    onValueChange={() => setIsAutoSync(!isAutoSync)}
                    thumbColor={'#fff'}
                    trackColor={{ false: colors.border, true: colors.success}}
                />
            </View>
        </LinearGradient>
    )
}

export default Preferences