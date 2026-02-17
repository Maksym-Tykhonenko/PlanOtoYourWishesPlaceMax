import React, { useState as slaceofstat, useEffect as feusect, } from 'react';
import {
    ScrollView,
    Pressable,
    Text as Toxote,
    TouchableOpacity,
    Dimensions,
    Modal,
    KeyboardAvoidingView,
    TextInput,
    View as SeboxiwLapRuo,
    SafeAreaView,
    Platform,
    Image as TomiagLacpeSIg,
} from 'react-native';
import { Alert } from 'react-native';
import { toyishfons } from '../toyishfons';
import { BlupinkShacleNoter } from '../TorMcoponentsRotpse/BlupinkShacleNoter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import OturoyBascBant from '../TorMcoponentsRotpse/OturoyBascBant';

const VISION_BOARD_KEY = 'VISION_BOARD_IMAGES';
const WISH_LISTS_KEY = 'WISH_LISTS';

export default function RytmhaWillnavTonxtUniq() {
    const { width: W, height: H } = Dimensions.get('window');
    const PLUS_SIZE = W * 0.13;
    // State
    const [visionModal, setVisionModal] = slaceofstat(false);
    const [wishLists, setWishLists] = slaceofstat<any[]>([]);
    const [visionImages, setVisionImages] = slaceofstat<any[]>([]);
    const [newWishModal, setNewWishModal] = slaceofstat(false);
    const [wishTitle, setWishTitle] = slaceofstat('');
    const [wishEmoji, setWishEmoji] = slaceofstat('🤗');
    const [selectedWish, setSelectedWish] = slaceofstat<any>(null);
    const [wishContentModal, setWishContentModal] = slaceofstat(false);
    const [wishItems, setWishItems] = slaceofstat<any[]>([]);
    const [newWishItem, setNewWishItem] = slaceofstat({ image: null, list: '', name: '', price: '', notes: '' });
    const [showWishItemForm, setShowWishItemForm] = slaceofstat(false); // NEW: для перемикання на форму

    // Vision board image picker
    const pickVisionImage = async () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.8, selectionLimit: 1 },
            async (response) => {
                if (response.assets && response.assets.length > 0) {
                    const uri = response.assets[0].uri;
                    const updated = [...visionImages, { id: Date.now() + Math.random(), uri }];
                    setVisionImages(updated);
                    await AsyncStorage.setItem(VISION_BOARD_KEY, JSON.stringify(updated));
                }
            }
        );
    };

    // Wish item image picker
    const pickWishItemImage = async () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.8, selectionLimit: 1 },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setNewWishItem({ ...newWishItem, image: response.assets[0].uri });
                }
            }
        );
    };

    // Load vision board and wish lists
    feusect(() => {
        AsyncStorage.getItem(VISION_BOARD_KEY).then(data => {
            if (data) setVisionImages(JSON.parse(data));
        });
        AsyncStorage.getItem(WISH_LISTS_KEY).then(data => {
            if (data) setWishLists(JSON.parse(data));
        });
    }, []);

    // Save wish lists
    const saveWishLists = async (lists: any[]) => {
        setWishLists(lists);
        await AsyncStorage.setItem(WISH_LISTS_KEY, JSON.stringify(lists));
    };

    // Add wish list
    const handleAddWishList = async () => {
        if (!wishTitle) return;
        const newWish = {
            id: Date.now().toString() + Math.floor(Math.random() * 100000).toString(),
            title: wishTitle,
            emoji: wishEmoji,
            items: [],
        };
        const updated = [...wishLists, newWish];
        await saveWishLists(updated);
        setWishTitle('');
        setWishEmoji('🤗');
        setNewWishModal(false);
    };

    // Open wish content modal
    const openWishContent = (wish: any) => {
        setSelectedWish(wish);
        setWishItems(wish.items || []);
        setWishContentModal(true);
    };

    // Save wish items to selected wish
    const saveWishItems = async (items: any[]) => {
        const updatedLists = wishLists.map(w =>
            w.id === selectedWish.id ? { ...w, items } : w
        );
        await saveWishLists(updatedLists);
        setWishItems(items);
    };

    // Add wish item (оновлено для статусу і id)
    const handleAddWishItem = async () => {
        if (!newWishItem.image || !newWishItem.name || !newWishItem.price) return;
        const item = {
            ...newWishItem,
            id: Date.now().toString() + Math.floor(Math.random() * 100000).toString(),
            status: 'Active', // NEW: статус
            createdAt: new Date().toISOString(), // NEW: дата додавання
        };
        const updated = [...wishItems, item];
        await saveWishItems(updated);
        setNewWishItem({ image: null, list: '', name: '', price: '', notes: '' });
        setShowWishItemForm(false); // NEW: повернення до списку
    };

    // Функція для зміни статусу wish item
    const toggleWishItemStatus = async (itemId: string) => {
        const updatedItems = wishItems.map(item =>
            item.id === itemId
                ? { ...item, status: item.status === 'Active' ? 'Completed' : 'Active' }
                : item
        );
        await saveWishItems(updatedItems);
    };

    // Видалення wish item з wish list
    const handleDeleteWishItem = async (itemId: string) => {
        const updated = wishItems.filter(item => item.id !== itemId);
        await saveWishItems(updated);
    };

    // Видалення wish list
    const handleDeleteWishList = async (wishId: string) => {
        const updated = wishLists.filter(w => w.id !== wishId);
        await saveWishLists(updated);
    };

    // Emoji list for wish list creation
    const emojiList = ['🤗', '📚', '💅', '🎁', '🏠', '🍷', '🌟', '💡', '⌚️'];

    // Підрахунок статистики по статусах
    const allItems = wishLists.flatMap(w => w.items || []);
    const statusStats = [
        {
            label: 'All',
            value: allItems.length,
            color: '#FFD600',
            icon: require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/wallet.png'),
        },
        {
            label: 'Active',
            value: allItems.filter(i => i.status === 'Active').length,
            color: '#FF2E8C',
            icon: require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/starinpink.png'),
        },
        {
            label: 'Completed',
            value: allItems.filter(i => i.status === 'Completed').length,
            color: '#00D26A',
            icon: require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/checkimg.png'),
        },
    ];

    // Додати функцію для видалення зображення з Vision Board
    const handleDeleteVisionImage = async (imgId: string) => {
        const updated = visionImages.filter(img => img.id !== imgId);
        setVisionImages(updated);
        await AsyncStorage.setItem(VISION_BOARD_KEY, JSON.stringify(updated));
    };

    return (
        <SeboxiwLapRuo style={{ flex: 1, alignItems: 'center', width: W }}>
            {/* Statuses */}
            <SeboxiwLapRuo style={{
                justifyContent: 'space-between',
                marginBottom: H * 0.01,
                width: W * 0.95,
                marginTop: H * 0.045,
                flexDirection: 'row',
            }}>
                {statusStats.map(s => (
                    <SeboxiwLapRuo key={s.label} style={{
                        backgroundColor: '#0700C4',
                        height: H * 0.1,
                        borderRadius: W * 0.07,
                        width: W * 0.31,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: W * 0.03,
                    }}>
                        <SeboxiwLapRuo style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            flexDirection: 'row',
                        }}>
                            <TomiagLacpeSIg source={s.icon} style={{ width: W * 0.09, height: W * 0.09, marginBottom: 2, resizeMode: 'contain' }} />
                            <Toxote style={{
                                fontSize: W * 0.055,
                                fontFamily: toyishfons.otoppinsM,
                                color: s.color,
                                fontStyle: 'italic',
                            }}>{s.value}</Toxote>
                        </SeboxiwLapRuo>
                        <Toxote style={{
                            marginTop: H * 0.005,
                            fontFamily: toyishfons.otoppinsM,
                            fontSize: W * 0.037,
                            color: '#fff',
                            fontStyle: 'italic',
                        }}>{s.label}</Toxote>
                    </SeboxiwLapRuo>
                ))}
            </SeboxiwLapRuo>

            {/* Vision Board Button */}
            <OturoyBascBant
                otiPrpopLespNaoTxtac='Open Vision Board'
                addNewStlesOfWrappr={{
                    marginTop: H * 0.01,
                }}
                onPress={() => setVisionModal(true)}
            />

            {/* Wish Place Title */}
            <Toxote style={{
                alignSelf: 'flex-start',
                fontSize: W * 0.08,
                fontFamily: toyishfons.baloo2,
                textAlign: 'left',
                marginTop: H * 0.01,
                color: '#fff',
                marginLeft: W * 0.05,
            }}>
                Your Wish Place
            </Toxote>

            {/* Wish Lists */}
            <ScrollView style={{ width: W, }} contentContainerStyle={{ paddingBottom: H * 0.23, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                <SeboxiwLapRuo style={{ width: W * 0.95, marginTop: H * 0.01, flex: 1 }}>
                    {wishLists.length === 0 ? null : wishLists.map((wish, idx) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onLongPress={() => {
                                Alert.alert(
                                    'Delete Wish List',
                                    'Are you sure you want to delete this Wish List?',
                                    [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Delete',
                                            style: 'destructive',
                                            onPress: () => handleDeleteWishList(wish.id),
                                        },
                                    ],
                                    { cancelable: true }
                                );
                            }}
                            key={wish.id}
                            onPress={() => openWishContent(wish)}
                            style={{
                                height: H * 0.08,
                                backgroundColor: '#0700C4',
                                paddingHorizontal: W * 0.05,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: H * 0.018,
                                borderRadius: W * 0.07,
                            }}>
                            <Toxote style={{
                                marginRight: W * 0.03,
                                fontSize: W * 0.07,
                            }}>{wish.emoji}</Toxote>
                            <Toxote style={{
                                color: '#fff',
                                flex: 1,
                                fontSize: W * 0.05,
                                fontFamily: toyishfons.baloo2,
                            }}>{wish.title}</Toxote>
                            <Toxote style={{
                                fontFamily: toyishfons.baloo2,
                                color: '#fff',
                                fontSize: W * 0.045,
                            }}>{`( ${wish.items?.length || 0} )`}</Toxote>
                        </TouchableOpacity>
                    ))}
                </SeboxiwLapRuo>
            </ScrollView>

            {/* Add Wish List Button */}
            <TouchableOpacity
                onPress={() => setNewWishModal(true)}
                style={{
                    right: W * 0.08,
                    bottom: H * 0.16,
                    position: 'absolute',
                }}>
                <TomiagLacpeSIg
                    source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/plusBtnPink.png')}
                    style={{
                        width: PLUS_SIZE,
                        height: PLUS_SIZE,
                        resizeMode: 'contain',
                    }}
                />
            </TouchableOpacity>

            {/* Vision Board Modal */}
            <Modal visible={visionModal} animationType="slide" transparent>
                <SeboxiwLapRuo style={{
                    flex: 1,
                    width: W,
                    height: H,
                    backgroundColor: '#000',
                }}>
                    <TomiagLacpeSIg
                        source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/gronindint.png')}
                        style={{
                            position: 'absolute',
                            width: W,
                            height: H,
                            resizeMode: 'cover',
                        }}
                    />
                    <SafeAreaView />
                    {/* Header */}
                    <SeboxiwLapRuo style={{
                        paddingHorizontal: W * 0.05,
                        alignItems: 'center',
                        marginTop: H * 0.01,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: W,
                    }}>
                        <TouchableOpacity onPress={() => setVisionModal(false)}
                            style={{
                            }}>
                            <TomiagLacpeSIg
                                source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/simplArow.png')}
                                style={{
                                    width: W * 0.16,
                                    height: W * 0.16,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>

                        <Toxote style={{
                            fontFamily: toyishfons.baloo2,
                            color: '#fff',
                            textAlign: 'left',
                            fontSize: W * 0.07,
                            margin: W * 0.016,
                            flex: 1,
                        }}>
                            Vision Board
                        </Toxote>

                        <TouchableOpacity onPress={pickVisionImage}
                            style={{
                                alignItems: 'center',
                                borderRadius: W * 0.1,
                                backgroundColor: '#FFD600',
                                height: W * 0.16,
                                justifyContent: 'center',
                                width: W * 0.16,
                            }}>
                            <TomiagLacpeSIg source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/emptImg.png')}
                                style={{ width: W * 0.07, height: W * 0.07, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </SeboxiwLapRuo>
                    {/* Vision Images */}
                    <ScrollView
                        contentContainerStyle={{
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                            paddingHorizontal: W * 0.05,
                            marginTop: H * 0.03,
                            flexDirection: 'row',
                        }}>
                        {visionImages.length === 0 ? null : visionImages.map(img => (
                            <TouchableOpacity
                                key={img.id}
                                onLongPress={() => {
                                    Alert.alert(
                                        'Delete TomiagLacpeSIg',
                                        'Are you sure you want to delete this image from your Vision Board?',
                                        [
                                            { text: 'Cancel', style: 'cancel' },
                                            {
                                                text: 'Delete',
                                                style: 'destructive',
                                                onPress: () => handleDeleteVisionImage(img.id),
                                            },
                                        ],
                                        { cancelable: true }
                                    );
                                }}
                                activeOpacity={0.9}
                            >
                                <TomiagLacpeSIg
                                    source={{ uri: img.uri }}
                                    style={{
                                        width: W * 0.42,
                                        backgroundColor: '#fff2',
                                        height: H * 0.25,
                                        borderRadius: W * 0.06,
                                        margin: W * 0.015,
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {visionImages.length === 0 && (
                        <Toxote style={{
                            position: 'absolute',
                            fontFamily: toyishfons.otoppinsR,
                            color: '#fff',
                            alignSelf: 'center',
                            fontSize: W * 0.045,
                            textAlign: 'center',
                            bottom: H * 0.1,
                        }}>
                            Save images that reflect what you want, dream of, or plan to make real
                        </Toxote>
                    )}
                </SeboxiwLapRuo>
            </Modal>

            {/* New Wish List Modal */}
            <Modal visible={newWishModal} animationType="fade" transparent>
                <SeboxiwLapRuo style={{
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{
                            width: W,
                            alignItems: 'center',
                        }}
                    >
                        <SeboxiwLapRuo style={{
                            paddingVertical: H * 0.035,
                            width: W * 0.88,
                            alignItems: 'center',
                            borderRadius: W * 0.07,
                            backgroundColor: '#0700C4',
                        }}>
                            <Toxote style={{
                                marginBottom: H * 0.02,
                                fontSize: W * 0.07,
                                fontFamily: toyishfons.baloo2,
                                color: '#fff',
                            }}>Create Wish List</Toxote>
                            <TouchableOpacity
                                onPress={() => { /* Emoji picker logic if needed */ }}
                                style={{
                                    height: W * 0.18,
                                    justifyContent: 'center',
                                    backgroundColor: '#18186B',
                                    width: W * 0.18,
                                    borderRadius: W * 0.09,
                                    alignItems: 'center',
                                    marginBottom: H * 0.025,
                                }}>
                                <Toxote style={{ fontSize: W * 0.09 }}>{wishEmoji}</Toxote>
                            </TouchableOpacity>
                            {/* Emoji picker row */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: H * 0.01, paddingHorizontal: W * 0.035 }}>
                                {emojiList.map(e => (
                                    <TouchableOpacity key={e} onPress={() => setWishEmoji(e)}
                                        style={{
                                            marginHorizontal: W * 0.01,
                                            borderRadius: W * 0.5,
                                            width: W * 0.12,
                                            overflow: 'hidden',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: W * 0.12,
                                        }}>
                                        {wishEmoji === e && <BlupinkShacleNoter />}
                                        <Toxote style={{ fontSize: W * 0.07 }}>{e}</Toxote>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <TextInput
                                placeholderTextColor="#bfcfff"
                                value={wishTitle}
                                style={{
                                    borderRadius: W * 0.07,
                                    width: '90%',
                                    height: H * 0.055,
                                    backgroundColor: '#18186B',
                                    paddingHorizontal: W * 0.04,
                                    color: '#fff',
                                    fontFamily: toyishfons.otoppinsM,
                                    fontSize: W * 0.045,
                                    marginBottom: H * 0.018,
                                }}
                                onChangeText={setWishTitle}
                                placeholder="Title"
                            />
                            <OturoyBascBant
                                disabled={!wishTitle}
                                onPress={handleAddWishList}
                                addNewStlesOfWrappr={{
                                    opacity: wishTitle ? 1 : 0.4,
                                    width: '90%',
                                }}
                                otiPrpopLespNaoTxtac='Save'
                            />
                            <TouchableOpacity
                                onPress={() => setNewWishModal(false)}
                                style={{
                                    marginTop: H * 0.01,
                                }}
                            >
                                <Toxote style={{
                                    color: '#fff',
                                    fontFamily: toyishfons.otoppinsM,
                                    fontSize: W * 0.045,
                                }}>Cancel</Toxote>
                            </TouchableOpacity>
                        </SeboxiwLapRuo>
                    </KeyboardAvoidingView>
                </SeboxiwLapRuo>
            </Modal>

            {/* Wish Content Modal */}
            <Modal visible={wishContentModal} animationType="slide" transparent>
                <SeboxiwLapRuo style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.25)',
                }}>
                    <SeboxiwLapRuo style={{
                        borderRadius: W * 0.07,
                        width: W,
                        alignItems: 'center',
                        backgroundColor: '#0700C4',
                        height: H,
                        paddingVertical: H * 0.035,
                    }}>
                        <SafeAreaView />
                        <TomiagLacpeSIg
                            source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/gronindint.png')}
                            style={{
                                position: 'absolute',
                                width: W,
                                height: H,
                                resizeMode: 'cover',
                            }}
                        />
                        {/* Header */}
                        <SeboxiwLapRuo style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingHorizontal: W * 0.04,
                            width: '100%',
                            marginBottom: H * 0.01,
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => { setWishContentModal(false); setShowWishItemForm(false); }}
                                style={{
                                }}>
                                <TomiagLacpeSIg
                                    source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/simplArow.png')}
                                    style={{
                                        width: W * 0.14,
                                        height: W * 0.14,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                            <Toxote style={{
                                color: '#fff',
                                fontFamily: toyishfons.baloo2,
                                fontSize: W * 0.06,
                            }}>{selectedWish?.title}</Toxote>
                            <TouchableOpacity
                                onPress={() => setShowWishItemForm(true)}
                                style={{
                                    borderRadius: W * 0.07,
                                    width: W * 0.14,
                                    backgroundColor: '#040071',
                                    height: W * 0.14,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Toxote style={{ color: '#fff', fontSize: W * 0.07 }}>{selectedWish?.emoji}</Toxote>
                            </TouchableOpacity>
                        </SeboxiwLapRuo>
                        {/* --- Заміна контенту на форму --- */}
                        {showWishItemForm ? (
                            // --- Форма додавання wish item (як на фото) ---
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                style={{
                                    width: W,
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <SeboxiwLapRuo style={{
                                    backgroundColor: '#0700C4',
                                    borderRadius: W * 0.07,
                                    alignItems: 'center',
                                    paddingVertical: H * 0.035,
                                    width: W * 0.88,
                                }}>
                                    <Toxote style={{
                                        fontSize: W * 0.07,
                                        fontFamily: toyishfons.baloo2,
                                        color: '#fff',
                                        marginBottom: H * 0.02,
                                    }}>Create Wish</Toxote>
                                    <TouchableOpacity
                                        onPress={pickWishItemImage}
                                        style={{
                                            justifyContent: 'center',
                                            marginBottom: H * 0.025,
                                            width: W * 0.36,
                                            backgroundColor: '#18186B',
                                            borderRadius: W * 0.07,
                                            alignItems: 'center',
                                            height: W * 0.36,
                                        }}>
                                        {newWishItem.image ? (
                                            <TomiagLacpeSIg
                                                source={{ uri: newWishItem.image }}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    resizeMode: 'cover',
                                                    borderRadius: W * 0.07,
                                                }}
                                            />
                                        ) : (
                                            <TomiagLacpeSIg
                                                source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/emptImg.png')}
                                                style={{
                                                    width: W * 0.12,
                                                    height: W * 0.12,
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>

                                    <TextInput
                                        placeholderTextColor="#bfcfff"
                                        value={newWishItem.name}
                                        onChangeText={v => setNewWishItem({ ...newWishItem, name: v })}
                                        style={{
                                            width: '90%',
                                            height: H * 0.055,
                                            backgroundColor: '#18186B',
                                            borderRadius: W * 0.07,
                                            color: '#fff',
                                            fontFamily: toyishfons.otoppinsR,
                                            fontSize: W * 0.045,
                                            marginBottom: H * 0.012,
                                            paddingHorizontal: W * 0.04,
                                        }}
                                        placeholder="Gift Name"
                                    />
                                    <TextInput
                                        onChangeText={v => setNewWishItem({ ...newWishItem, price: v })}
                                        placeholder="Price"
                                        value={newWishItem.price}
                                        placeholderTextColor="#bfcfff"
                                        keyboardType="numeric"
                                        style={{
                                            width: '90%',
                                            height: H * 0.055,
                                            backgroundColor: '#18186B',
                                            borderRadius: W * 0.07,
                                            color: '#fff',
                                            fontFamily: toyishfons.otoppinsR,
                                            fontSize: W * 0.045,
                                            marginBottom: H * 0.012,
                                            paddingHorizontal: W * 0.04,
                                        }}
                                    />
                                    <TextInput
                                        onChangeText={v => setNewWishItem({ ...newWishItem, notes: v })}
                                        placeholderTextColor="#bfcfff"
                                        value={newWishItem.notes}
                                        placeholder="Notes"
                                        style={{
                                            marginBottom: H * 0.018,
                                            backgroundColor: '#18186B',

                                            borderRadius: W * 0.07,
                                            width: '90%',
                                            height: H * 0.055,
                                            color: '#fff',

                                            fontSize: W * 0.045,
                                            fontFamily: toyishfons.otoppinsR,
                                            paddingHorizontal: W * 0.04,

                                        }}
                                    />
                                    <OturoyBascBant
                                        onPress={handleAddWishItem}
                                        otiPrpopLespNaoTxtac='Save'
                                        disabled={!(newWishItem.image && newWishItem.name && newWishItem.price)}
                                        addNewStlesOfWrappr={{
                                            width: '90%',
                                            opacity: newWishItem.image && newWishItem.name && newWishItem.price ? 1 : 0.4,
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => { setShowWishItemForm(false); setNewWishItem({ image: null, list: '', name: '', price: '', notes: '' }); }}
                                        style={{
                                            marginTop: H * 0.01,
                                        }}
                                    >
                                        <Toxote style={{
                                            color: '#fff',
                                            fontFamily: toyishfons.otoppinsSB,
                                            fontSize: W * 0.045,
                                        }}>Cancel</Toxote>
                                    </TouchableOpacity>
                                </SeboxiwLapRuo>
                            </KeyboardAvoidingView>
                        ) : (
                            // --- Старий контент wish list ---
                            <>
                                {wishItems.length > 0 &&
                                    <TouchableOpacity
                                        onPress={() => setShowWishItemForm(true)}
                                        style={{
                                            right: W * 0.08,
                                            bottom: H * 0.07,
                                            zIndex: 10,
                                            position: 'absolute',
                                        }}>
                                        <TomiagLacpeSIg
                                            source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/plusBtnPink.png')}
                                            style={{
                                                width: PLUS_SIZE,
                                                height: PLUS_SIZE,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </TouchableOpacity>
                                }

                                {wishItems.length === 0 ? (
                                    <SeboxiwLapRuo style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                        <TomiagLacpeSIg
                                            source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/grtWmnHelloYou/NoticeTheDetails.png')}
                                            style={{
                                                height: H * 0.3,

                                                width: W * 0.48,

                                                resizeMode: 'stretch',

                                            }}
                                        />
                                        <SeboxiwLapRuo style={{
                                            backgroundColor: '#0700C4',
                                            width: W * 0.85,
                                            alignItems: 'center',
                                            paddingHorizontal: W * 0.04,
                                            borderRadius: W * 0.05,
                                            paddingVertical: H * 0.014,
                                        }}>
                                            <Toxote style={{
                                                color: '#fff',
                                                fontFamily: toyishfons.otoppinsR,
                                                fontSize: W * 0.037,
                                                textAlign: 'center',
                                                marginBottom: H * 0.012,
                                            }}>
                                                You haven’t added any wishes yet.{"\n"}Start by saving something you truly want
                                            </Toxote>
                                            <TouchableOpacity
                                                onPress={() => setShowWishItemForm(true)}
                                                style={{
                                                    marginTop: H * 0.01,
                                                }}>
                                                <TomiagLacpeSIg
                                                    source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/plusBtnPink.png')}
                                                    style={{
                                                        width: PLUS_SIZE,
                                                        height: PLUS_SIZE,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </SeboxiwLapRuo>
                                    </SeboxiwLapRuo>
                                ) : (
                                    <ScrollView
                                        contentContainerStyle={{
                                            flexWrap: 'wrap',
                                            paddingBottom: H * 0.14,
                                            justifyContent: 'space-between',
                                            width: W * 0.9,
                                            flexDirection: 'row',
                                        }}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {wishItems.map((item, idx) => (
                                            <Pressable
                                                onLongPress={() => {
                                                    Alert.alert(
                                                        'Delete Wish',
                                                        'Are you sure you want to delete this wish?',
                                                        [
                                                            {
                                                                text: 'Cancel',
                                                                style: 'cancel',
                                                            },
                                                            {
                                                                text: 'Delete',
                                                                style: 'destructive',
                                                                onPress: () => handleDeleteWishItem(item.id),
                                                            },
                                                        ],
                                                        { cancelable: true }
                                                    );
                                                }}
                                                key={item.id}
                                                style={{
                                                    paddingHorizontal: W * 0.025,
                                                    width: W * 0.43,
                                                    overflow: 'hidden',
                                                    backgroundColor: '#0700C4',
                                                    marginBottom: H * 0.025,
                                                    alignItems: 'center',
                                                    padding: W * 0.012,
                                                    height: H * 0.3,
                                                    borderRadius: W * 0.06,
                                                }}
                                            >
                                                {/* Назва */}
                                                <Toxote
                                                    style={{
                                                        color: '#fff',
                                                        fontFamily: toyishfons.otoppinsM,
                                                        fontSize: W * 0.055,
                                                        textAlign: 'center',
                                                    }}
                                                    numberOfLines={1}
                                                >
                                                    {item.name}
                                                </Toxote>
                                                {/* Notes */}
                                                <Toxote
                                                    style={{
                                                        marginBottom: H * 0.012,
                                                        fontFamily: toyishfons.otoppinsR,
                                                        fontSize: W * 0.031,
                                                        color: '#bfcfff',
                                                        textAlign: 'center',
                                                    }}
                                                    numberOfLines={1}
                                                >
                                                    {item.notes || 'Some Notes here'}
                                                </Toxote>
                                                {/* Зображення */}
                                                <TomiagLacpeSIg
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        resizeMode: 'cover',
                                                        height: '55%',
                                                        borderRadius: W * 0.045,
                                                        width: '100%',
                                                        marginBottom: 0,
                                                    }}
                                                />
                                                {/* Статус і ціна */}
                                                <SeboxiwLapRuo
                                                    style={{
                                                        width: '100%',
                                                        alignItems: 'center',
                                                        marginBottom: H * 0.018,
                                                        justifyContent: 'space-between',
                                                        marginTop: H * 0.012,
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    {/* Status pill (додаємо TouchableOpacity) */}
                                                    <TouchableOpacity
                                                        activeOpacity={0.7}
                                                        style={{
                                                            backgroundColor: item.status === 'Completed' ? '#00BD39' : '#FA29F9',
                                                            borderRadius: W * 0.06,
                                                            paddingVertical: H * 0.008,
                                                            width: W * 0.21,
                                                        }}
                                                        onPress={() => toggleWishItemStatus(item.id)}
                                                    >
                                                        <Toxote
                                                            style={{
                                                                color: '#fff',
                                                                fontFamily: toyishfons.otoppinsR,
                                                                fontSize: W * 0.03,
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            {item.status === 'Completed' ? 'Completed' : 'Active'}
                                                        </Toxote>
                                                    </TouchableOpacity>
                                                    {/* Price */}
                                                    <Toxote style={{
                                                        textAlign: 'right',

                                                        fontFamily: toyishfons.otoppinsSB,

                                                        fontSize: W * 0.044,

                                                        color: '#fff',

                                                    }}
                                                    >
                                                        {item.price}
                                                    </Toxote>
                                                </SeboxiwLapRuo>
                                            </Pressable>
                                        ))}
                                    </ScrollView>
                                )}
                            </>
                        )}
                    </SeboxiwLapRuo>
                </SeboxiwLapRuo>
            </Modal>
        </SeboxiwLapRuo>
    );
}
