import { useContext } from 'react';
import { web3Context } from '../Context';
import ErrorBoundary from "../ErrorBoundary/";
import { shortener } from '../Helper';
import { StakeTransactionWrapper } from './styles';

const StakeHistory = () => {
    const { stakeHistory } = useContext(web3Context);

    let _index = stakeHistory.length;
    const _txnItems = stakeHistory.map(item => {
        const { ethValue, tokenValue, hash, timestamp } = item;
        const _currentIndex = _index;
        _index--;
        return (
            <div className="grid card" key={_currentIndex}>
                <div className="grid">
                    <h2>{_currentIndex}</h2>
                </div>
                <div className="grid">
                    <h2>
                        <a href={`https://rinkeby.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer">
                            {shortener(hash)}
                        </a>
                    </h2>
                </div>
                <div className="grid">
                    <h2>
                        <a href={`https://rinkeby.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer">
                            {parseFloat(10000).toFixed(2)} AMD
                        </a>
                    </h2>
                </div>
                <div className="grid">
                    <h2>
                        <a href={`https://rinkeby.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer">
                            {parseFloat(tokenValue).toFixed(2)} AMD
                        </a>
                    </h2>
                </div>
                <div className="grid">
                    <h2>
                        <a href={`https://rinkeby.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer">
                            {parseFloat(ethValue).toFixed(6)} ETH
                        </a>
                    </h2>
                </div>
                <div className="grid">
                    <h2>
                        <a href={`https://rinkeby.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer">
                            {timestamp}
                        </a>
                    </h2>
                </div>
            </div>
        );
    });

    return (
        <StakeTransactionWrapper className="grid">
            <header className="grid header">
                <div className="grid">
                    <h2>#</h2>
                </div>
                <div className="grid">
                    <h2>Hash</h2>
                </div>
                <div className="grid">
                    <h2>Amount Unstaked</h2>
                </div>
                <div className="grid">
                    <h2>Estimated AMD Rewards</h2>
                </div>
                <div className="grid">
                    <h2>Estimated ETH Rewards</h2>
                </div>
                <div className="grid">
                    <h2>Date</h2>
                </div>
            </header>

            <div className="grid card-container">{_txnItems}</div>
        </StakeTransactionWrapper>
    )
}

export default ErrorBoundary(StakeHistory);;