import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import '../App.css';

class Home extends Component {
    render() {
        return (
            <div className='home-page'>
                    <Container textAlign='center'>WELCOME TO OUR SYSTEM</Container>
            </div>
        );
    }
}

export default Home;
