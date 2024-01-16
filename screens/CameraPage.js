import React, { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';



export default class CameraPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            type: Camera.Constants.Type.back,
            uri: null
        };
    }

    navigateToFullImage = () => {
        if (this.state.uri) {
            this.props.navigation.navigate('Fullimage', { uri: this.state.uri });
        }
    }
    componentDidMount(){
        this.useEffect()
    }

    async useEffect(){
        const {status} = await Camera.requestCameraPermissionsAsync();
        this.setState({hasPermission: status === 'granted'});
        if (status === 'granted') {
            hasPermission =true;
        } else {
            alert('No access to camera');
            hasPermission = false;
        }
    }

    async snap(){
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo)
            this.setState({uri: photo.uri})
        }
    }


    render() {
        if (this.state.hasPermission === null) {
            return <View/>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styles.container}>
                <Camera style={styles.camera} type={this.state.type} ref={ref => {
                    this.camera = ref;
                }}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.setState({type:
                                    this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                });
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSnap}
                            onPress={() => {
                                this.snap()
                            }}>
                            <Text style={styles.text}> Take photo </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <View style={styles.buttonContainer}>
                    <Image style={{flex: 1}} source={{uri: this.state.uri ? this.state.uri : 'https://reactnative.dev/img/tiny_logo.png'}}/>
                </View>

                <TouchableOpacity
                    style={styles.fullButton}
                    onPress={this.navigateToFullImage}
                    >
                    <Text style={styles.text}> View Fullscreen </Text>
                </TouchableOpacity>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonSnap: {
        marginTop: 20,
        flex: 0.3,
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },

    fullButton: {
        marginTop: 20,
        flex: 0.3,
        alignSelf: 'flex-start',
        alignItems: 'center',
    }
});
