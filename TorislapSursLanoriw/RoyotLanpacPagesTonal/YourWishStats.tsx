const WISH_LISTS_KEY = 'WISH_LISTS';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { BlupinkShacleNoter } from '../TorMcoponentsRotpse/BlupinkShacleNoter';
import React, {
    useEffect,
    useState
} from 'react';
import { toyishfons } from '../toyishfons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function YourWishStats() {
    const { width: W, height: H } = Dimensions.get('window');
    // State
    const [allCount, setAllCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [tab, setTab] = useState<'week' | 'month' | 'all'>('week');

    // Load stats
    useEffect(() => {
        const loadStats = async () => {
            const data = await AsyncStorage.getItem(WISH_LISTS_KEY);
            let allItems: any[] = [];
            if (data) {
                const lists = JSON.parse(data);
                allItems = lists.flatMap((w: any) => w.items || []);
            }
            setAllCount(allItems.length);
            setActiveCount(allItems.filter(i => i.status === 'Active').length);
            setCompletedCount(allItems.filter(i => i.status === 'Completed').length);
        };
        loadStats();
    }, []);

    // Bar chart logic
    const maxBarHeight = H * 0.22;
    const barWidth = W * 0.19;
    const barSpacing = W * 0.07;
    const barRadius = W * 0.04;

    // Avoid division by zero
    const all = allCount || 1;
    const activeBarHeight = (activeCount / all) * maxBarHeight;
    const completedBarHeight = (completedCount / all) * maxBarHeight;

    // --- Всі позначки (іконки, значення, підпис) вирівнюємо по одному рівню у верхньому окремому View ---
    return (
        <View style={{
            width: W,



            alignItems: 'center',



            flex: 1,



            backgroundColor: 'transparent',



        }}>
            {/* Title */}
            <Text style={{
                marginTop: H * 0.01,
                color: '#fff',
                fontSize: W * 0.08,
                textAlign: 'left',
                alignSelf: 'flex-start',
                marginLeft: W * 0.05,
                fontFamily: toyishfons.baloo2,
            }}>
                Your Stats
            </Text>

            {/* Card */}
            <View style={{
                backgroundColor: 'rgba(34, 0, 80, 0.85)',
                marginTop: H * 0.025,
                borderRadius: W * 0.07,
                alignItems: 'center',
                overflow: 'hidden',
                width: W * 0.92,
            }}>
                <BlupinkShacleNoter />
                {/* Tabs */}
                <View style={{
                    borderWidth: W * 0.003,
                    width: '95%',
                    marginTop: H * 0.025,
                    flexDirection: 'row',
                    backgroundColor: '#ffffff75',
                    borderColor: '#ffffff39',
                    borderRadius: W * 0.07,
                    padding: 2,
                    alignSelf: 'center',
                }}>
                    {['week', 'month', 'all'].map((t, i) => (
                        <TouchableOpacity key={t} onPress={() => setTab(t as any)} style={{
                            paddingVertical: H * 0.008,
                            backgroundColor: tab === t ? '#fff' : 'transparent',
                            justifyContent: 'center',
                            borderRadius: W * 0.07,
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: toyishfons.otoppinsM,
                                color: tab === t ? '#080399' : '#fff',
                                fontStyle: 'italic',
                                letterSpacing: 0.2,
                                fontSize: W * 0.04,
                            }}>
                                {t === 'week' ? 'Week' : t === 'month' ? 'Month' : 'All'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Верхній ряд з іконками, значеннями, підписами --- */}
                <View style={{
                    marginBottom: H * 0.01,
                    width: '95%',
                    borderColor: '#ffffff39',
                    alignSelf: 'center',
                    marginTop: H * 0.035,
                    flexDirection: 'row',
                    borderRadius: W * 0.06,
                    justifyContent: 'space-between',
                    paddingVertical: H * 0.022,
                    paddingHorizontal: W * 0.03,
                    alignItems: 'center',
                    borderWidth: W * 0.003,
                    backgroundColor: '#ffffff75',
                }}>
                    {[
                        { label: 'Total wishes', value: allCount, icon: require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/wallet.png') },
                        { label: 'Active wishes', value: activeCount, icon: require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/starinpink.png') },
                        { label: 'Comple\nted', value: completedCount, icon: require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/checkimg.png') },
                    ].map((stat, idx) => (
                        <View key={stat.label} style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                marginBottom: 2,
                                fontFamily: toyishfons.otoppinsM,
                                fontSize: W * 0.07,
                                fontStyle: 'italic',
                                color: '#fff',
                            }}>{stat.value}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: H * 0.005,
                            }}>
                                <View style={{
                                    marginRight: W * 0.015,
                                    height: W * 0.07,
                                    borderRadius: W * 0.035,
                                    width: W * 0.07,
                                    overflow: 'hidden',
                                }}>
                                    <Image
                                        source={stat.icon}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'cover',
                                        }}
                                    />
                                </View>
                                <Text style={{
                                    fontSize: W * 0.037,
                                    fontFamily: toyishfons.otoppinsR,
                                    marginTop: 2,
                                    maxWidth: W * 0.19,
                                    color: '#fff',
                                }}>{stat.label}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* --- Стовпчики вирівняні по низу --- */}
                <View style={{
                    paddingHorizontal: W * 0.03,
                    alignSelf: 'center',
                    width: '92%',

                    borderRadius: W * 0.06,
                    marginTop: H * 0.01,
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    paddingBottom: H * 0.04,

                    flexDirection: 'row',

                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    minHeight: maxBarHeight + W * 0.02,
                }}>
                    {/* All */}
                    <View style={{ alignItems: 'center', width: barWidth + barSpacing, justifyContent: 'flex-end' }}>
                        <View style={{
                            backgroundColor: '#FFD600',
                            height: maxBarHeight,
                            borderRadius: barRadius,
                            width: barWidth,
                        }} />
                    </View>
                    {/* Active */}
                    <View style={{ alignItems: 'center', width: barWidth + barSpacing, justifyContent: 'flex-end' }}>
                        <View style={{
                            borderRadius: barRadius,
                            width: barWidth,
                            backgroundColor: '#FF2E8C',
                            height: activeBarHeight,
                        }} />
                    </View>
                    {/* Completed */}
                    <View style={{ alignItems: 'center', width: barWidth + barSpacing, justifyContent: 'flex-end' }}>
                        <View style={{
                            width: barWidth,
                            borderRadius: barRadius,
                            height: completedBarHeight,
                            backgroundColor: '#00D26A',
                        }} />
                    </View>
                </View>
            </View>
        </View>
    );
}
