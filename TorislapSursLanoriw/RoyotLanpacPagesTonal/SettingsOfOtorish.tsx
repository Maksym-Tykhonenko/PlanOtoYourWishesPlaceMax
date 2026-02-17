import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toyishfons } from '../toyishfons';
import React, {
    useState,
    useEffect,
} from 'react';
import {
    Switch,

    Text,

    TouchableOpacity,

    Alert,

    Dimensions,

    Share,

    View,

    Linking,

} from 'react-native';


export default function SettingsOfOtorish() {
    const { width: W, height: H } = Dimensions.get('window');
    const padding = W * 0.05;
    const btnHeight = H * 0.07;
    const btnRadius = W * 0.12;
    const btnMargin = H * 0.018;
    const fontSizeBtn = W * 0.045;
    const switchSize = W * 0.13;
    const ronavan = useNavigation();

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('notificationsEnabled').then(val => {
            if (val !== null) setNotificationsEnabled(val === 'true');
        });
    }, []);

    const toggleNotifications = async () => {
        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);
        await AsyncStorage.setItem('notificationsEnabled', newValue.toString());
    };

    const buttons = [
        { label: 'Share the app', onPress: () => { Share.share({ message: `If creating a wish list is a problem for you, our app is here to help make it easy and enjoyable!` }) } },
        // { label: 'Rate the app', onPress: () => {/* ... */ } },
        {
            label: 'Reset all data', onPress: () => {
                Alert.alert(
                    "Reset All Data",
                    "Are you sure you want to reset all data? This action cannot be undone.",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "OK", onPress: async () => {
                                await AsyncStorage.clear();
                                setNotificationsEnabled(true);
                                ronavan.replace('OtonalLodaadingSheple')
                            }
                        }
                    ]
                );
            }
        },
        {
            label: 'Terms of Use / Privacy Policy', onPress: () => {
                Linking.openURL('https://www.termsfeed.com/live/309257ac-83ae-4944-a8dc-bcbd35a04572')
            }
        },
    ];

    return (
        <View style={{
            width: W,
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'transparent',
        }}>
            <Text style={{
                color: '#fff',
                fontFamily: toyishfons.baloo2,
                textAlign: 'left',
                alignSelf: 'flex-start',
                marginTop: H * 0.01,
                marginLeft: W * 0.05,
                fontSize: W * 0.08,
                paddingBottom: H * 0.01,
            }}>
                Settings
            </Text>
            <View style={{
                height: btnHeight,
                flexDirection: 'row',
                marginBottom: btnMargin,
                width: W * 0.9,
                backgroundColor: '#0700C4',
                justifyContent: 'space-between',
                borderRadius: btnRadius,
                paddingHorizontal: padding,
                alignItems: 'center',
            }}>
                <Text style={{
                    fontFamily: toyishfons.otoppinsR,
                    fontSize: fontSizeBtn,
                    color: '#fff',
                }}>
                    Notifications
                </Text>
                <Switch
                    trackColor={{ false: '#3a3a7c', true: '#8316CA' }}
                    onValueChange={toggleNotifications}
                    value={notificationsEnabled}
                    thumbColor={notificationsEnabled ? '#fff' : '#fff'}
                    style={{
                        transform: [{ scaleX: switchSize / 40 }, { scaleY: switchSize / 40 }],
                        alignSelf: 'center',
                    }}
                />
            </View>
            {buttons.map((btn, idx) => (
                <TouchableOpacity
                    onPress={btn.onPress}
                    style={{
                        marginBottom: btnMargin,
                        height: btnHeight,
                        backgroundColor: '#0700C4',
                        borderRadius: btnRadius,
                        paddingHorizontal: padding,
                        justifyContent: 'center',
                        width: W * 0.9,
                    }}
                    activeOpacity={0.8}
                    key={idx}
                >
                    <Text style={{
                        fontFamily: toyishfons.otoppinsR,
                        fontSize: fontSizeBtn,
                        color: '#fff',
                    }}>
                        {btn.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
