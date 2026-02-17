import React, { useState, useEffect, } from 'react';
import OturoyBascBant from '../TorMcoponentsRotpse/OturoyBascBant';
import { toyishfons } from '../toyishfons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

import {
    TouchableOpacity,
    Text,
    Modal,
    Dimensions,
    ScrollView,
    TextInput,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    View,
} from 'react-native';

const GIFT_STORAGE_KEY = 'GIFT_IDEAS_LIST';

export default function GiftIdeasScn() {
    const { width: W, height: H } = Dimensions.get('window');
    const [gifts, setGifts] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Form state
    const [giftName, setGiftName] = useState('');
    const [recipient, setRecipient] = useState('');
    const [event, setEvent] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [price, setPrice] = useState('');
    const [notes, setNotes] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null); // <-- ДОДАЙТЕ ЦЕ

    const inputFields = [
        {
            onChangeText: setGiftName,
            value: giftName,
            style: {},
            key: 'giftName',
            keyboardType: 'default',
            placeholder: 'Gift Name',
        },
        {
            onChangeText: setRecipient,
            value: recipient,
            key: 'recipient',
            keyboardType: 'default',
            placeholder: 'Recipient',
            style: {},
        },
        {
            value: event,
            style: {},
            key: 'event',
            onChangeText: setEvent,
            placeholder: 'Event',
            keyboardType: 'default',
        },
        {
            style: {},
            value: eventDate,
            keyboardType: 'default',
            onChangeText: setEventDate,
            key: 'eventDate',
            placeholder: 'Event Date',
        },
        {
            keyboardType: 'numeric',
            value: price,
            onChangeText: setPrice,
            style: {},
            key: 'price',
            placeholder: 'Price',
        },
        {
            style: { marginBottom: H * 0.018 },
            keyboardType: 'default',
            value: notes,
            onChangeText: setNotes,
            key: 'notes',
            placeholder: 'Notes',
        },
    ];

    // Load gifts from storage
    useEffect(() => {
        AsyncStorage.getItem(GIFT_STORAGE_KEY).then(data => {
            if (data) setGifts(JSON.parse(data));
        });
    }, []);

    // Save gifts to storage
    const saveGifts = async (newGifts: any[]) => {
        setGifts(newGifts);
        await AsyncStorage.setItem(GIFT_STORAGE_KEY, JSON.stringify(newGifts));
    };

    // Add new gift
    const handleSaveGift = async () => {
        if (!giftName || !recipient || !event || !eventDate || !price || !imageUri) return;
        const newGift = {
            id: Date.now().toString() + Math.floor(Math.random() * 100000).toString(),
            giftName,
            recipient,
            event,
            eventDate,
            price,
            notes,
            imageUri,
        };
        const updated = [...gifts, newGift];
        await saveGifts(updated);
        setModalVisible(false);
        setGiftName('');
        setRecipient('');
        setEvent('');
        setEventDate('');
        setPrice('');
        setNotes('');
        setImageUri(null);
    };

    // Delete gift
    const handleDeleteGift = async (giftId: string) => {
        const updated = gifts.filter(g => g.id !== giftId);
        await saveGifts(updated);
    };

    // Gift card size
    const CARD_W = W * 0.43;
    const CARD_H = H * 0.31;
    const CARD_RADIUS = W * 0.06;

    // Plus button
    const PLUS_SIZE = W * 0.13;

    // Modal image size
    const MODAL_IMG = W * 0.32;

    // Empty state image size
    const EMPTY_IMG = W * 0.48;

    // Вибір зображення
    const pickImage = async () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.8,
                selectionLimit: 1,
            },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setImageUri(response.assets[0].uri || null);
                }
            }
        );
    };

    return (
        <View style={{
            width: W,
            backgroundColor: 'transparent',
            alignItems: 'center',
            flex: 1,
        }}>
            {/* Header */}
            <Text style={{
                marginLeft: W * 0.05,

                fontFamily: toyishfons.baloo2,

                fontSize: W * 0.08,

                color: '#fff',
                alignSelf: 'flex-start',

                marginTop: H * 0.01,
                textAlign: 'left',

            }}>
                Gift Ideas
            </Text>
            <Text style={{
                marginBottom: H * 0.025,
                alignSelf: 'flex-start',
                marginLeft: W * 0.05,
                fontSize: W * 0.04,
                fontFamily: toyishfons.otoppinsM,
                color: '#fff',
                textAlign: 'left',
            }}>
                Ideas you don’t want to forget — for friends, family, and special moments
            </Text>

            {/* Main content */}
            {gifts.length === 0 ? (
                <View style={{
                    alignItems: 'center',
                    flex: 1,
                    width: '100%',
                }}>
                    <Image source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/grtWmnHelloYou/NoticeTheDetails.png')}
                        style={{
                            width: EMPTY_IMG,
                            resizeMode: 'stretch',
                            height: EMPTY_IMG * 1.3,
                        }}
                    />
                    <View style={{
                        paddingVertical: H * 0.014,
                        width: W * 0.85,
                        borderRadius: CARD_RADIUS,
                        paddingHorizontal: W * 0.04,
                        alignItems: 'center',
                        backgroundColor: '#0700C4',
                    }}>
                        <Text style={{
                            marginBottom: H * 0.012,
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: W * 0.037,
                            fontFamily: toyishfons.otoppinsR,
                        }}>
                            You haven’t saved any gift ideas yet.{"\n"}Capture ideas before they slip away
                        </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{
                                marginTop: H * 0.01,
                            }}>
                            <Image
                                source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/plusBtnPink.png')}
                                style={{
                                    width: PLUS_SIZE,
                                    height: PLUS_SIZE,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={{
                    alignItems: 'center',
                    width: '100%',
                    flex: 1,
                }}>
                    <ScrollView
                        contentContainerStyle={{
                            width: W * 0.9,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingBottom: H * 0.13,
                            flexWrap: 'wrap',
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {gifts.map((gift, idx) => (
                            <Pressable
                                onLongPress={() => {
                                    Alert.alert(
                                        'Delete Idea',
                                        'Are you sure you want to delete this idea?',
                                        [
                                            { text: 'Cancel', style: 'cancel' },
                                            {
                                                text: 'Delete',
                                                style: 'destructive',
                                                onPress: () => handleDeleteGift(gift.id),
                                            },
                                        ]
                                    );
                                }}
                                key={gift.id}
                                style={{
                                    alignItems: 'center',
                                    height: CARD_H,
                                    backgroundColor: '#0700C4',
                                    padding: W * 0.025,
                                    borderRadius: CARD_RADIUS,
                                    width: CARD_W,
                                }}>
                                <Text style={{
                                    fontSize: W * 0.045,
                                    fontFamily: toyishfons.otoppinsM,
                                    color: '#fff',
                                    marginBottom: 2,
                                }}>{gift.giftName}</Text>
                                <View style={{
                                    overflow: 'hidden',
                                    height: '64%',
                                    alignItems: 'center',
                                    borderRadius: CARD_RADIUS * 0.7,
                                    backgroundColor: '#040071',
                                    width: '100%',
                                    justifyContent: 'center',
                                    marginBottom: H * 0.01,
                                }}>
                                    {gift.imageUri ? (
                                        <Image
                                            source={{ uri: gift.imageUri }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                resizeMode: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <Text style={{ color: '#fff', fontSize: W * 0.09 }}>🖼️</Text>
                                    )}
                                </View>
                                <View style={{
                                    marginTop: 2,
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontFamily: toyishfons.otoppinsR,
                                        fontSize: W * 0.03,
                                        maxWidth: '70%',
                                    }} numberOfLines={1} ellipsizeMode="tail">{gift.recipient || 'Recipient'} • {gift.event || 'Event'}</Text>
                                    <Text style={{
                                        fontSize: W * 0.045,
                                        fontFamily: toyishfons.otoppinsSB,
                                        color: '#fff',
                                    }}>{gift.price}</Text>
                                </View>


                                <Text style={{
                                    textAlign: 'left',
                                    color: '#fff',
                                    opacity: 0.7,
                                    fontSize: W * 0.03,
                                    fontFamily: toyishfons.otoppinsM,
                                    alignSelf: 'flex-start',
                                }}>{gift.notes || 'Some Notes here'}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{
                        right: W * 0.08,
                        bottom: H * 0.16,
                        position: 'absolute',
                    }}>
                        <Image
                            source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/plusBtnPink.png')}
                            style={{
                                height: PLUS_SIZE,
                                resizeMode: 'contain',
                                width: PLUS_SIZE,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )}

            {/* Modal */}
            <Modal visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                transparent
                animationType="fade"
            >
                <View style={{
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{
                            width: W,
                            alignItems: 'center',
                        }}
                    >
                        <View style={{
                            alignItems: 'center',
                            width: W * 0.88,
                            borderRadius: CARD_RADIUS,
                            paddingVertical: H * 0.035,
                            backgroundColor: '#0700C4',
                        }}>
                            <Text style={{
                                fontSize: W * 0.07,
                                fontFamily: toyishfons.baloo2,
                                marginBottom: H * 0.02,
                                color: '#fff',
                            }}>Your Gift Idea</Text>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{
                                    marginBottom: H * 0.025,
                                    height: MODAL_IMG,
                                    justifyContent: 'center',
                                    borderRadius: CARD_RADIUS * 0.7,
                                    alignItems: 'center',
                                    width: MODAL_IMG,
                                    backgroundColor: '#040071',
                                    overflow: 'hidden',
                                }}>
                                {imageUri ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{
                                            width: '100%',
                                            resizeMode: 'cover',
                                            height: '100%',
                                        }}
                                    />
                                ) : (
                                    <Image
                                        style={{
                                            height: W * 0.1,
                                            width: W * 0.1,
                                            resizeMode: 'cover',
                                        }}
                                        source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/emptImg.png')}
                                    />
                                )}
                            </TouchableOpacity>
                            {/* Form */}
                            {inputFields.map((field, idx) => (
                                <TextInput
                                    onChangeText={field.onChangeText}
                                    placeholder={field.placeholder}
                                    placeholderTextColor="#bfcfff"
                                    value={field.value}
                                    key={field.key}
                                    keyboardType={field.keyboardType as any}
                                    style={{
                                        height: H * 0.055,
                                        backgroundColor: '#040071',
                                        color: '#fff',
                                        borderRadius: W * 0.1,
                                        width: W * 0.7,
                                        fontSize: W * 0.045,
                                        ...field.style,
                                        marginBottom: idx === inputFields.length - 1 ? (field.style.marginBottom || 0) : H * 0.012,
                                        paddingHorizontal: W * 0.04,
                                        fontFamily: toyishfons.otoppinsM,
                                    }}
                                />
                            ))}
                            <OturoyBascBant
                                disabled={!(giftName && recipient && event && eventDate && price && imageUri)}
                                otiPrpopLespNaoTxtac='Save Gift Idea'
                                onPress={handleSaveGift}
                                addNewStlesOfWrappr={{
                                    width: '80%',
                                    opacity: giftName && recipient && event && eventDate && price && imageUri ? 1 : 0.4,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    setImageUri(null);
                                }}
                                style={{
                                    marginTop: H * 0.01,
                                }}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontFamily: toyishfons.otoppinsM,
                                    fontSize: W * 0.04,
                                }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </View>
    );
}
