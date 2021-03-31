const { setup, deployContract, dispatchContract } = require('./utils');

async function main() {
	setup();

	// TODO: code your deploy
	console.log('hello deployer');

	const TestJSON = require('../build/contracts/Test.json');
	const TestContract = await deployContract(TestJSON);
	console.log('Test Contract deployed at address: ', TestContract.options.address);

	const tx = await dispatchContract(TestJSON.abi, TestContract.options.address, methods => methods.test());
	console.log('dispatch Test Contract result: ', tx);
}

main();
