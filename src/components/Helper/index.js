require('dotenv/config');
const axios = require('axios');

const toFixed = _amount => Number(_amount).toFixed(2);

const formatNumber = _amount => new Intl.NumberFormat('en', { maximumSignificantDigits: 3 }).format(Number(_amount));

const walletShortner = (_data, _start, _end) => {
    let result = '';
    for(let i = _start;  i < _end; i++) result = [...result, _data[i]];
    return result.join('');
}

const shortener = (_data) => {
    const _splited = _data.split('');
    const _length = _splited.length;

    const firstPart = `${_splited[0]}${_splited[1]}${_splited[2]}${_splited[3]}${_splited[4]}${_splited[5]}${_splited[6]}`;
    const secondPart = `${_splited[_length - 7]}${_splited[_length - 6]}${_splited[_length - 5]}${_splited[_length - 4]}${_splited[_length -3]}${_splited[_length - 2]}${_splited[_length - 1]}`;
    return `${firstPart}...${secondPart}`;
}

const fixedDataArray = async _data => {
    if(_data.length <= 10) return _data;
    let _result = [];
    for(let i = 0; i < 10; i++) _result = [..._result, _data[i]];
    return _result;
}

const getRefferalHistory = async (web3, amusedToken, user) => {
    try {
        const startBlock = await (await axios.get("https://amused-finance-backend.herokuapp.com/api/v1/startBlock"))
        const _endBlock = parseInt(await web3.eth.getBlockNumber());
        let _tempData = [];
        
        for(let i = startBlock; i <= _endBlock; i = i + 10000) {
            const _step = i + 10000;
            const _result = await amusedToken.getPastEvents("ReferralReward", { fromBlock: i, toBlock: _step });
            _tempData = [..._tempData, ..._result]
        }
        _tempData = _tempData.filter(item => web3.utils.toChecksumAddress(item.returnValues.referrer) === web3.utils.toChecksumAddress(user));

        _tempData = _tempData.map(item => {
            const { blockNumber, returnValues, transactionHash: hash } = item;
            const { user, referrer, purchased, reward, timestamp } = returnValues;
            return {
                user,
                referrer,
                blockNumber,
                purchased: web3.utils.fromWei(purchased, "ether"),
                reward: web3.utils.fromWei(reward, "ether"),
                hash,
                timestamp
            }
        });
        _tempData = _tempData.reverse();
        return _tempData;
    } catch (error) { 
        console.log(error);
        return error.message;
    }
}

export { 
    toFixed, 
    formatNumber,
    walletShortner,
    shortener,
    fixedDataArray,
    getRefferalHistory
}