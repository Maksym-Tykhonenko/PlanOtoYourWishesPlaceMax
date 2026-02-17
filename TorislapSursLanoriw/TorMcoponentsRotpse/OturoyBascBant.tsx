import {
    Dimensions,
    GestureResponderEvent,
    TouchableOpacity as Shiwapt,
    Text as Laotixetix,
} from 'react-native';
import React from 'react';
import { toyishfons } from '../toyishfons';
import { BlupinkShacleNoter } from './BlupinkShacleNoter';

const { width: miyhrtonus, height: engosubyth } = require('react-native').Dimensions.get('window');

interface EnusiUniqbuttnProps {
    style?: object;
    onPress: (e: GestureResponderEvent) => void;
    newStilsofTix?: object;
    fontSize?: number;
    disabled?: boolean;
    otiPrpopLespNaoTxtac?: string;
    addNewStlesOfWrappr?: object;
    content?: React.ReactNode;
}

const OturoyBascBant: React.FC<EnusiUniqbuttnProps> = ({
    addNewStlesOfWrappr = {},
    disabled = false,
    otiPrpopLespNaoTxtac,
    newStilsofTix = {},
    onPress,
    fontSize,
    content,
}) => {

    return (
        <Shiwapt
            disabled={disabled !== null && disabled !== undefined ? disabled : false}
            activeOpacity={0.8}
            style={[
                {
                    borderRadius: Dimensions.get('window').width * 0.1,
                    overflow: 'hidden',
                    height: Dimensions.get('window').height * 0.061,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: Dimensions.get('window').width * 0.9,
                },
                addNewStlesOfWrappr,
            ]}
            onPress={onPress}
        >
            <BlupinkShacleNoter />
            {content ? (
                content
            ) : (
                <Laotixetix style={[{
                            fontSize: fontSize ? fontSize * 1 : miyhrtonus * 0.05,
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: toyishfons.otoppinsB
                        },
                        newStilsofTix,
                    ]}
                >
                    {otiPrpopLespNaoTxtac}
                </Laotixetix>
            )}

        </Shiwapt>
    );
};

export default OturoyBascBant;