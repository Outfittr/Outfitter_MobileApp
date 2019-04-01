import React, {Component} from 'react';
import {
    StyleSheet, 
    View, 
    Text,
    AsyncStorage
} from 'react-native';
import {Font} from 'expo';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Wallpaper from './components/Wallpaper';
import SignupSection from './components/SignupSection';

export default class LoginRegister extends Component {
    state = {
        fontLoaded: false,
        mode: 0
    };

    constructor(props) {
        super(props)

        try {
            AsyncStorage.getItem('idToken').then((token) => {
                var req = new XMLHttpRequest();
                req.onreadystatechange = function() {
                    if(req.readyState == 4 && req.status === 200) {
                        res = JSON.parse(req.responseText)
                        if(res["success"]) {
                            props.nav.displayScreen(global.ScreenEnum.Survey);
                        }
                    }
                }
                req.open("GET", global.apiURL + 'users/' + token, true)
                req.send(null)
            })
        } catch (error) {
            console.error(error)
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'bella-fashion': require('./assets/font/bella-fashion.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    render() {
        var form = []

        if(this.state.mode === 0) {
            form.push(<LoginForm key={0} nav={this.props.nav}/>)
            form.push(<SignupSection key={1} parent={this}/>)
        } else {
            form.push(<RegisterForm key={0} parent={this}/>)
        }

        return (
            <Wallpaper>
                <View style={{alignItems: 'center', paddingTop: "10%",}}>
                    {
                        this.state.fontLoaded ? (
                            <Text style={styles.titleText}> Outfittr </Text>
                        ) : null
                    }
                </View>
                {form}
            </Wallpaper>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'bella-fashion',
        fontSize: 60,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 100
    }
});