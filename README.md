# contracts-deploy-starter

## Setup
`
npm
`
```
npm install
```
or
```
yarn
```

`
vi .env
`
```
address='your address'
privateKey='your privatekey'
bscscanKey='your bscscan api key'
```

`
setup deploy/config.json
`
```
chainURLs -
gasLimit -
gasPrice -
```

## Deployed Contracts

#### 1.Build Contracts
```
yarn build
```

#### 2.Deploy Contracts
```
yarn deploy --network testnet/mainnet
```

#### 3.Verify & Publish
```
yarn verify ContractName@ContractAddress --network testnet/mainnet
```
