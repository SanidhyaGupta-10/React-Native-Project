import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'green',
            tabBarStyle: {
                backgroundColor: '#1e293b',
                borderTopWidth: 1,
                borderTopColor: 'gray',
                height: 90,
                paddingBottom: 30,
                paddingTop: 10,
            }, 
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                textTransform: 'capitalize',
            },
            headerShown: false
        }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Todos',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='flash-outline' size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='settings' size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}
export default TabsLayout;