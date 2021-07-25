import React, { useContext, useState } from "react";
import Typewriter from "typewriter-effect";
import FisionDoughnut from "./FisionDoughnut";
import { HomeWrapper } from "./styles";
import { cashbackCalculator } from "../../components/Helper";
import { web3Context } from "../../components/Context";
import img1 from "../../assets/others/Amuse icon 1.png";
import img2 from "../../assets/others/Amuse icon 2.png";
import img3 from "../../assets/others/Amuse icon 3.png";
import img4 from "../../assets/others/Amuse icon 4.png";
import dashboardPreview from "../../assets/others/Amuse SS.jpg";

const Home = () => {
	const [inputAmount, setInputAmount] = useState("");
	const [cashbackCalculatorInput, setCashbackCalculatorInput] = useState(
		cashbackCalculator()
	);
	const { cashbackPercentage } = useContext(web3Context);

	const handleInput = async (e) => {
		e.preventDefault();
		if (isNaN(e.target.value)) return;
		setInputAmount(() => e.target.value);
		if (parseFloat(cashbackPercentage) === 0 || e.target.value === "") {
			setCashbackCalculatorInput(() => cashbackCalculator());
			return;
		}
		const _result = cashbackCalculator(
			parseFloat(e.target.value),
			cashbackPercentage
		);
		setCashbackCalculatorInput(() => _result);
	};

	return (
		<HomeWrapper className="grid white">
			<section className="grid banner">
				<section className="grid typewritter-effect">
					<div>
						<h1>100% Cashbacks On</h1>
						<h1>
							<Typewriter
								options={{
									strings: ["Ethereum Gas Spends", "Rewards for trading"],
									autoStart: true,
									loop: true,
								}}
							/>
						</h1>
						<p>From the Dev of TweetsZone.com</p>
						<div className="grid btns">
							<button type="button" className="active">
								Launch App
							</button>
							<button type="button">Download Whitepaper</button>
						</div>
					</div>
				</section>
				<section className="grid custom">
					<div className="grid circle" />
					<div className="dashboard-preview">
						<div className="grid image">
							<img src={dashboardPreview} alt="dashboard previewer" />
						</div>
					</div>
				</section>
			</section>

			<section className="grid features-container">
				<header className="grid">
					<h1 className="text-4xl md:text-5xl font-semibold pb-5">Features</h1>
					<p>
						Nostrud irure id consequat officia. Tempor velit mollit veniam
						occaecat sit dolore ex quis laborum est. Duis fugiat amet labore ad
						nisi duis commodo ullamco ad laboris. Minim cillum consectetur sit
						amet ad ad id eiusmod Lorem pariatur. Et id laboris ullamco deserunt
						non incididunt excepteur ipsum nostrud ipsum mollit.
					</p>
				</header>
				<div className="grid card-container">
					<div className="grid wrapper">
						<div className="grid card rounded shadow-lg m-3 transition transform duration-200 ease-in hover:-translate-y-3">
							<div className="grid img">
								<img src={img1} alt="description" />
							</div>
							<div className="grid header">
								<h1>hodl</h1>
							</div>
							<div className="grid detail">
								<p>2% rewards at every 24hours for all holders</p>
							</div>
						</div>

						<div className="grid card rounded shadow-lg m-3 transition transform duration-200 ease-in hover:-translate-y-3 text-blue-600">
							<div className="grid img">
								<img src={img2} alt="description" />
							</div>
							<div className="grid header">
								<h1>trade</h1>
							</div>
							<div className="grid detail">
								<p>Earn back 100% gas fees for all buy actions</p>
							</div>
						</div>

						<div className="grid card rounded shadow-lg m-3 transition transform duration-200 ease-in hover:-translate-y-3">
							<div className="grid img">
								<img src={img3} alt="description" />
							</div>
							<div className="grid header">
								<h1>stake</h1>
							</div>
							<div className="grid detail">
								<p>Earn 1.5% ETHER rewards for all staked AMD per 24hours</p>
							</div>
						</div>

						<div className="grid card rounded shadow-lg m-3 transition transform duration-200 ease-in hover:-translate-y-3">
							<div className="grid img">
								<img src={img4} alt="description" />
							</div>
							<div className="grid header">
								<h1>referral</h1>
							</div>
							<div className="grid detail">
								<p>
									Earn as much as 25% of the transaction fees paid by referree
									during buy actions
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="grid chart-container">
				<div className="grid wrapper">
					<header className="grid">
						<h4>TOKEN DISTRIBUTION</h4>
						<h1>Initial Distibution</h1>
					</header>
					<div className="grid fusion-chart">
						<FisionDoughnut
							type="doughnut3d"
							className="chart"
							showPercentValues={true}
						/>
					</div>
				</div>

				<div className="grid wrapper">
					<div className="grid">
						<header className="grid">
							<h1>Cashback Calculator</h1>
						</header>
						<form className="grid">
							<input
								value={inputAmount}
								placeholder="Enter amount in USD"
								onChange={handleInput}
							/>
						</form>
						<div className="grid fusion-chart">
							<FisionDoughnut
								type="doughnut2d"
								data={cashbackCalculatorInput}
								numberPrefix="$"
							/>
						</div>
					</div>
				</div>
			</div>
		</HomeWrapper>
	);
};

export default Home;
