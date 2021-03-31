const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');

const config = require('./config.json');
const dotenv = require('dotenv');
const args = require('yargs').argv

var account, web3, nonce = -1;

function setup() {
	if (!args.network) {
        throw Error('请添加参数 --network');
    }

    dotenv.config();

	account = {
		address: process.env.address,
        privateKey: process.env.privateKey,
	};
	web3 = new Web3(new Web3.providers.HttpProvider(config.chainURLs[args.network]));

    const web3_account = web3.eth.accounts.privateKeyToAccount('0x' + account.privateKey);
    web3.eth.accounts.wallet.add(web3_account);
    web3.eth.defaultAccount = web3_account.address;
}

function getNetwork() {
    return args.network;
}

async function get_tx_nonce() {
    return await web3.eth.getTransactionCount(account.address);
}

async function tx_nonce() {
    if (nonce === -1) {
        nonce = await get_tx_nonce();
    } else {
        nonce += 1;
    }
    return nonce;
}

async function deployContract(json, arguments) {
	await tx_nonce();
	const contract = new web3.eth.Contract(json.abi);
	return await contract.deploy({
		data: json.bytecode,
		arguments
	}).send({
		nonce: web3.utils.toHex(nonce),
		from: account.address,
		gas: web3.utils.toHex(config.gasLimit),
		gasPrice: web3.utils.toHex(config.gasPrice),
	});
}

async function dispatchContract(abi, address, selector) {
	await tx_nonce();
    const contract = new web3.eth.Contract(abi);
	const txOptions = {
        nonce: web3.utils.toHex(nonce),
        from: account.address,
        to: address,
        gas: web3.utils.toHex(config.gasLimit),
        gasPrice: web3.utils.toHex(config.gasPrice),
        data: selector(contract.methods).encodeABI()
    }
    const signed = await web3.eth.accounts.signTransaction(txOptions, account.privateKey);
    return await web3.eth.sendSignedTransaction(signed.rawTransaction);
}

module.exports = {
    setup,
    getNetwork,
    get_tx_nonce,
    deployContract,
	dispatchContract,
};
