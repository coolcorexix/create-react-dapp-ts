import React from 'react';
import logo from './logo.svg';
import './App.css';
import {getCurrentWeb3Instance} from './eth-services/getCurrentWeb3Instance';
import {askForConnect} from './eth-services/askForConnect';

function App() {
    const [isEthEnabled,
        setIsEthEnabled] = React.useState < boolean > (false);
    const [userAddress,
        setUserAddress] = React.useState < string > ('');
    React.useEffect(() => {
        askForConnect().then(handleAcceptForConnection);
    }, []);

    function handleAcceptForConnection(rs : boolean) {
        setIsEthEnabled(rs);
        if (!rs) {
            return;
        }
        getCurrentWeb3Instance()
            .eth
            .getAccounts()
            .then(accounts => {
                if (accounts && accounts[0]) {
                    setUserAddress(accounts[0]);
                }
            });
    };

    if (!isEthEnabled) {
        return (<div className="App">
            <div
                style={{
                fontSize: 16,
                marginTop: 64,
                marginBottom: 16
            }}>
                Please install a wallet plugin such as Metamask to use this dapp.
                <br/>
                If you have already installed:
            </div>

            <button
                onClick={() => askForConnect().then(handleAcceptForConnection)}
                style={{
                borderRadius: 4,
                backgroundColor: '#008b8b',
                color: 'white',
                fontSize: 32,
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 32,
                paddingLeft: 32,
                fontWeight: 'bold'
            }}>
                Connect
            </button>
        </div>);
    }
    return (
        <div className="App">
            <header className="App-header">
                <code>
                    Connected account address: {userAddress}
                </code>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit
                    <code>src/App.tsx</code>
                    and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
