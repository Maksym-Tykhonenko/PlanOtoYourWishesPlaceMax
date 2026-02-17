import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState as BqvStep } from 'react';
const ZPL_INTRO_TAG = 'fs0dfijo-09risof-3209urijkmafpfjis-wef';
import {
    Image as FgkImg,
    View as Bosdfijoixijodisjf,
    SafeAreaView as SvlioSafdjoiqew,
    useWindowDimensions as Disdfonaoihowe,
    Text as IJoijdsfITixtoisdjf,
} from 'react-native';

import { useNavigation as ZqvNav } from '@react-navigation/native';

import MxvButtn from '../TorMcoponentsRotpse/OturoyBascBant';
import { toyishfons as XplFonts } from '../toyishfons';

const GronIntroUniq: React.FC = () => {
    const navZpl = ZqvNav();
    const { width: sotowh, height: lach } = Disdfonaoihowe();
    const [stepZpl, setStepZpl] = BqvStep(0);

    const introImgsZpl = [
        require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/grtWmnHelloYou/YourWishPlace.png'),
        require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/grtWmnHelloYou/NoticeTheDetails.png'),
        require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/grtWmnHelloYou/GiveWithIntention.png'),
    ];

    const zplTexts = [
        {
            main: 'Your Wish Place',
            sub: `A calm space to collect what you want, plan what matters, and keep your wishes in one place — clear, visual, and personal`
        },
        {
            main: 'Notice the Details',
            sub: `Images, ideas, moments — save what stands out. Turn what you see into clear wishes and organized plans`
        },
        {
            main: 'Give with Intention',
            sub: `Keep thoughtful gift ideas for friends and special moments.\nAdd photos, events, dates, and details — so nothing meaningful gets forgotten`
        },
    ];

    const handleZplNext = async () => {
        if (stepZpl < introImgsZpl.length - 1) {
            setStepZpl(v => v + 1);
        } else {
            try {
                await AsyncStorage.setItem(ZPL_INTRO_TAG, 'marked');
            } catch (errZpl) {
                if (__DEV__) console.warn('ZplWarn::IntroMarkFail', errZpl);
            }
            navZpl.replace?.('IncludingAplicPga');
        }
    };

    const currZplImg = introImgsZpl[stepZpl];

    return (
        <Bosdfijoixijodisjf style={{
            alignItems: 'center',
            flex: 1,
            height: lach,
            width: sotowh,
        }}>
            <SvlioSafdjoiqew />
            <FgkImg source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/gronindint.png')} style={{
                    height: lach,
                    alignSelf: 'center',
                    width: sotowh * 1.03,
                    position: 'absolute',
                }}
                resizeMode="cover"
            />

            <Bosdfijoixijodisjf style={{
                overflow: 'hidden',
                alignSelf: 'center',
                top: 0,
                height: lach * 0.53,
                position: 'absolute',
                width: sotowh * 1.0111,
            }}>
                <FgkImg style={{
                        width: sotowh * 1.0111,
                        height: lach * 0.53,
                        alignSelf: 'center',
                        position: 'absolute',
                    }}
                    resizeMode="cover"
                    source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/onbImageoftop.png')}
                />

                <FgkImg resizeMode="contain"
                    style={{
                        height: lach * 0.44,
                        width: sotowh,
                        bottom: 0,
                        position: 'absolute',
                        alignSelf: 'center',
                    }}
                    source={currZplImg}
                />
            </Bosdfijoixijodisjf>

            <Bosdfijoixijodisjf style={{
                width: sotowh * 0.9,
                top: lach * 0.55,
                position: 'absolute',
                alignSelf: 'center',
                height: lach * 0.3,
            }}>
                <IJoijdsfITixtoisdjf style={{
                    textAlign: 'left',
                    fontSize: sotowh * 0.08,
                    fontFamily: XplFonts.baloo2,
                    color: '#fff',
                }}>
                    {zplTexts[stepZpl].main}
                </IJoijdsfITixtoisdjf>

                <IJoijdsfITixtoisdjf style={{
                    fontSize: sotowh * 0.04,
                    textAlign: 'left',
                    fontFamily: XplFonts.otoppinsR,
                    color: '#fff',
                }}>
                    {zplTexts[stepZpl].sub}
                </IJoijdsfITixtoisdjf>
            </Bosdfijoixijodisjf>

            <MxvButtn onPress={handleZplNext} otiPrpopLespNaoTxtac='Next'
                addNewStlesOfWrappr={{
                    bottom: lach * 0.070534,
                    zIndex: 400,
                    position: 'absolute',
                }}
            />
        </Bosdfijoixijodisjf>
    );
};

export default GronIntroUniq;
