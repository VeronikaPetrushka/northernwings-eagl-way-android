import { ImageBackground, View } from "react-native"
import { back } from "../Northernconst/wingsassts"
import Wingsnvgt from "../Northernnavigation/Wingsnvgt"

interface NorthernBackgroundProps {
    route: React.ReactNode;
    nvgt: boolean;
}

const NorthernBackground: React.FC<NorthernBackgroundProps> = ({ route, nvgt }) => {
    
    return (
        <ImageBackground source={back} style={{ flex: 1 }}>
            <View style={{flex: 1}}>

                <View style={{ width: '100%', height: '100%' }}>{route}</View>

                {
                    nvgt && (
                        <View style={{width: '100%', position: 'absolute', bottom: 35, alignSelf: 'center', alignItems: 'center'}}>
                            <Wingsnvgt />
                        </View>
                    )
                }
                
            </View>
        </ImageBackground>
    )
};

export default NorthernBackground;