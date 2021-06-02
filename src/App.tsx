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
        askForConnect().then((rs) => {
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
        });
    }, []);
    if (!isEthEnabled) {
        return <div>
            Please install a wallet plugin such as Metamask to use this dapp.
        </div>
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
