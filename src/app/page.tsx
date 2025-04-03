"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi"; 

export default function TokenStaking() {
  const [totalBalance, setTotalBalance] = useState(1000);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [staked, setStaked] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [stakePercentage, setStakePercentage] = useState(0);
  const [stakingPeriod, setStakingPeriod] = useState(3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const interestRate = 0.1;

  const calculateReward = () => {
    return stakeAmount * interestRate * stakingPeriod;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = parseInt(e.target.value);
    setStakePercentage(percentage);
    const amountToStake = (percentage / 100) * totalBalance;
    setStakeAmount(amountToStake);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let amount = parseFloat(e.target.value) || 0;
    if (amount > totalBalance) amount = totalBalance;
    setStakeAmount(amount);
    setStakePercentage((amount / totalBalance) * 100);
  };

  const handleStakingPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStakingPeriod(parseInt(e.target.value));
  };

  const handleStake = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stakeAmount > totalBalance) {
      setModalMessage("Insufficient balance! Please enter a valid stake amount.");
      setIsModalOpen(true);
      return;
    }

    if (stakeAmount > 0) {
      setStaked(staked + stakeAmount);
      setRewards(calculateReward());
      setTotalBalance(totalBalance - stakeAmount);
      
      setModalMessage(`You have successfully staked ${stakeAmount.toFixed(2)} Tokens for ${stakingPeriod} ${stakingPeriod === 1 ? "Month" : "Months"}. Your calculated reward is: ${calculateReward().toFixed(2)} Tokens.`);
      setIsModalOpen(true);

      setStakeAmount(0);
      setStakePercentage(0);
      setStakingPeriod(3);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const calculateDisplayAmount = () => {
    if (totalBalance === 0) return 0;
    return stakePercentage ? ((stakePercentage / 100) * totalBalance).toFixed(2) : 0;
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <nav className="w-full bg-gray-800 p-4 shadow-md flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="text-xl font-semibold">🚀 AltToken</div>

        <div className="lg:hidden">
          <button onClick={toggleNav} className="text-white text-2xl">
            {isNavOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <ul className="hidden lg:flex space-x-6">
          <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Stake</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Rewards</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Dashboard</a></li>
        </ul>

        <div className={`lg:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 transition-all duration-300 ${isNavOpen ? "block" : "hidden"}`}>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Stake</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Rewards</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Dashboard</a></li>
          </ul>
        </div>
      </nav>

      <motion.h1 
        className="text-4xl font-bold mb-6 mt-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Stake your token for rewards
      </motion.h1>

      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4 md:w-11/12 lg:w-1/2 xl:w-1/3">
        <div className="mb-4">
          <h2 className="text-xl sm:text-lg">Total Balance: {totalBalance} Tokens</h2>
        </div>

        <div>
          <label className="text-lg">Stake Amount</label>
          <input
            type="number"
            value={isNaN(stakeAmount) ? 0 : stakeAmount}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <div className="text-xs text-gray-400 mt-1 mb-0">
          {totalBalance > 0 ? `${stakePercentage}% of your current balance = ${calculateDisplayAmount()} Tokens` : 'Insufficient balance to stake'}
        </div>

        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={stakePercentage}
            onChange={handleSliderChange}
            className="w-full"
            disabled={totalBalance === 0}
          />
          <div className="flex justify-between text-sm mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        <div>
          <label className="text-lg">Staking Period (Months)</label>
          <div className="input-group flex items-center mt-2 w-full">
            <input
              type="number"
              value={stakingPeriod}
              onChange={handleStakingPeriodChange}
              min="1"
              className="p-2 w-full bg-gray-700 text-white rounded-l-lg border-t border-b border-l border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="p-2 bg-gray-700 text-white border-t border-b border-r border-gray-600 rounded-r-lg">
              {stakingPeriod === 1 ? "Month" : "Months"}
            </span>
          </div>

          <div className="mt-2 w-full">
            <input
              type="range"
              min="1"
              max="36"
              value={stakingPeriod}
              onChange={handleStakingPeriodChange}
              className="w-full mt-1"
            />
            <div className="flex justify-between text-sm">
              <span className="text-center">1</span>
              <span className="text-center">6</span>
              <span className="text-center">12</span>
              <span className="text-center">24</span>
              <span className="text-center">36</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-lg">Calculated Reward: {calculateReward().toFixed(2)} Tokens</h2>
          <p className="text-sm text-gray-400">This is the reward you will receive after staking for the selected period.</p>
        </div>

        <button 
          onClick={handleStake} 
          className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-lg font-bold transition duration-300 mt-6 w-full sm:w-auto"
        >
          Stake Tokens
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"> 
          <div className="bg-gray-800 text-white p-6 rounded-lg w-1/3 sm:w-11/12 md:w-1/3 lg:w-1/4 xl:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <p className="mb-2">{modalMessage}</p>
            <div className="flex justify-end">
            <button 
              onClick={closeModal} 
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg text-white mt-4"
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
