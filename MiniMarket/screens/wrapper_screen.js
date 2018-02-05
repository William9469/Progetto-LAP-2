import React from 'react';
import LoginScreen from './login_screen';
import TabNav from '../navigators/tab_navigator';
import StackNav from '../navigators/stack_navigator';
import TabNavLoginRegistration from '../navigators/tab_navigator_wrapper_screen';
import { connect } from 'react-redux';
import { logInThunk, signInThunk } from '../actions/login_actions';


class WrapperScreen extends React.Component {
    render(){
        if(this.props.loggedIn){

            return <StackNav/>
        }
        return <TabNavLoginRegistration />
    }
}

const mapStateToProps = (state) => {
    return ({loggedIn: state.authenticationReducer.loggedIn});
}



export default connect(mapStateToProps, null)(WrapperScreen);