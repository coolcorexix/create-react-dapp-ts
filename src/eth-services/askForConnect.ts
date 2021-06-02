import Web3 from 'web3';

export async function askForConnect(): Promise<boolean> {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        return true;
    }
    return false;
}