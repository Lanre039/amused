import { useContext, useEffect, useState } from "react";
import { IoMdSwap } from "react-icons/io";
import { web3Context } from "../../components/Context";
import { DashboardContainer } from "./styles.js";
import NormalTransaction from "./NormalTransaction";
import StakeHistory from "./StakeHistory";

const Dashboard = () => {
	const [activeTab, setActiveTab] = useState("Transaction History");
	const [stakedBalance, setStakedBalance] = useState(0);
	const [weeklyCashback, setWeeklyCashback] = useState(0);
	const [estimatedEthRewards, setEstimatedEthRewards] = useState(0);
	const [estimatedAmdRewards, setEstimatedAmdRewards] = useState(0);

	const context = useContext(web3Context);
	const { loading, amdPrice, balance, stakes, dailyCashback } = context;

	useEffect(() => {
		if (loading) return;
		(async () => {
			const { stakes: _stakes, ethValueEarned, tokenValueEarned } = stakes;

			setWeeklyCashback(() => parseFloat(dailyCashback) * 7);
			setStakedBalance(() => _stakes);
			setEstimatedEthRewards(() => ethValueEarned);
			setEstimatedAmdRewards(() => tokenValueEarned);
		})();
	}, [loading, stakes, dailyCashback]);

	const isValidWidth = parseFloat(window.innerWidth) >= 1024;
	return (
		<DashboardContainer className="grid">
			<div className="grid dashboard-wrapper">
				<div className="grid card-container">
					<section className="grid card">
						<div className="grid">
							<h3>AMD Price</h3>
						</div>
						<div className="grid sub-card">
							<h1>1.00 AMD</h1>
							<IoMdSwap className="icon" />
							<h1>${parseFloat(amdPrice).toFixed(2)}</h1>
						</div>
					</section>

					<section className="grid card">
						<div className="grid">
							<h3>AMD Balance</h3>
						</div>
						<div className="grid sub-card">
							<h1>{parseFloat(balance).toFixed(2)} AMD</h1>
							<IoMdSwap className="icon" />
							<h1>
								${(parseFloat(balance) * parseFloat(amdPrice)).toFixed(2)}
							</h1>
						</div>
					</section>

					<section className="grid card">
						<div className="grid">
							<h3>Staked Balance</h3>
						</div>
						<div className="grid sub-card">
							<h1>{parseFloat(stakedBalance).toFixed(2)} AMD</h1>
							<IoMdSwap className="icon" />
							<h1>
								${(parseFloat(stakedBalance) * parseFloat(amdPrice)).toFixed(2)}
							</h1>
						</div>
					</section>

					<section className="grid card">
						<div className="grid">
							<h3>Total claimed Rewards</h3>
						</div>
						<div className="grid sub-card">
							<h1>100 AMD</h1>
							<IoMdSwap className="icon" />
							<h1>$25</h1>
						</div>
					</section>

					<section className="grid card">
						<div className="grid">
							<h3>Daily Rewards</h3>
						</div>
						<div className="grid sub-card">
							<h1>{parseFloat(dailyCashback).toFixed(2)} AMD</h1>
							<IoMdSwap className="icon" />
							<h1>
								${(parseFloat(dailyCashback) * parseFloat(amdPrice)).toFixed(2)}
							</h1>
						</div>
					</section>

					<section className="grid card">
						<div className="grid">
							<h3>Weekly Rewards</h3>
						</div>
						<div className="grid sub-card">
							<h1>{parseFloat(weeklyCashback).toFixed(2)} AMD</h1>
							<IoMdSwap className="icon" />
							<h1>
								$
								{(parseFloat(weeklyCashback) * parseFloat(amdPrice)).toFixed(2)}
							</h1>
						</div>
					</section>

					<section className="grid card">
						<div className="grid">
							<h3>Estimated AMD Rewards</h3>
						</div>
						<div className="grid sub-card">
							<h1>{parseFloat(estimatedAmdRewards).toFixed(2)} AMD</h1>
							<IoMdSwap className="icon" />
							<h1>
								$
								{(
									parseFloat(estimatedAmdRewards) * parseFloat(amdPrice)
								).toFixed(2)}
							</h1>
						</div>
					</section>

					<section className="grid card">
						<div className="grid">
							<h3>Estimated ETH Rewards</h3>
						</div>
						<div className="grid sub-card">
							<h1>
								{parseFloat(estimatedEthRewards) < 0.01 &&
								parseFloat(estimatedEthRewards) !== 0
									? parseFloat(estimatedEthRewards).toFixed(9)
									: parseFloat(estimatedEthRewards).toFixed(2)}{" "}
								ETH
							</h1>
							<IoMdSwap className="icon" />
							<h1>{parseFloat(estimatedAmdRewards).toFixed(2)} AMD</h1>
						</div>
					</section>
				</div>
			</div>

			<div className={isValidWidth ? "grid txn-data" : "hide"}>
				<section className="grid transaction-header">
					<div
						id="transaction_history"
						className={
							activeTab === "Transaction History"
								? "grid tabs active"
								: "grid tabs"
						}
						onClick={() => setActiveTab("Transaction History")}
					>
						<h2>Transaction History</h2>
					</div>

					<div
						className={
							activeTab === "Staked History" ? "grid tabs active" : "grid tabs"
						}
						onClick={() => setActiveTab("Staked History")}
					>
						<h2>Staked History</h2>
					</div>
				</section>
				<section className="grid transaction-body">
					{activeTab === "Transaction History" ? (
						<NormalTransaction />
					) : (
						<StakeHistory />
					)}
				</section>
			</div>
		</DashboardContainer>
	);
};

export default Dashboard;
