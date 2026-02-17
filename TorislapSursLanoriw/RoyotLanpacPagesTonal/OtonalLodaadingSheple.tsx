import { useNavigation as ZqvNqtr } from '@react-navigation/native';
import { Image as XplImg, Dimensions as VytDim } from 'react-native';
import React, { useEffect as BqvEff } from 'react';
import { SafeAreaView as JxkSafe } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ZPL_BOOT_KEY = 'zpfhshf-3280spf0920jio-sfioj--fdsjf9w0jfl-osfofdsfpwjf90234j';

const SvlKqtr = (): React.ReactElement => {
    const navZpl = ZqvNqtr();
    const { width: XplWid, height: XplHei } = VytDim.get('window');

    BqvEff(() => {
        let isZplActive = true;
        const zplDelay = Math.floor(Math.random() * 900);

        const bootZplSeq = async () => {
            try {
                const zplFlag = await AsyncStorage.getItem(ZPL_BOOT_KEY);
                if (!zplFlag) {
                    await AsyncStorage.setItem(ZPL_BOOT_KEY, 'etched');
                }

                
            } catch (errZpl) {
                if (__DEV__) console.warn('ZplWarn::bootFail', errZpl);
            }
        };

        bootZplSeq();

        return () => {
            isZplActive = false;
        };
    }, [navZpl, XplWid]);

    return (
        <JxkSafe style={{
            justifyContent: 'center',
            width: XplWid,
            height: XplHei,
            flex: 1,
            alignItems: 'center',
        }}>
            <XplImg  style={{
                    height: XplHei,
                    width: XplWid,
                    position: 'absolute',
                    zIndex: 0,
                }} resizeMode="cover"
                source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/gronindint.png')}
            />

            <XplImg resizeMode="contain"
                style={{
                    width: XplWid * 0.8,
                    zIndex: 0,
                    height: XplWid * 0.8,
                }}
                source={require('../ShelaceToAsetsoul/UynaProctTosimagsLaphsiw/planotoLoadtix.png')}
            />

            {/* <QxwLodin /> */}
        </JxkSafe>
    );
};

export default SvlKqtr;
