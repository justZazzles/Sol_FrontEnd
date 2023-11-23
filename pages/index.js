import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [walletBalance, setWalletBalance] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const atmBalance = (await atm.getBalance()).toNumber();
      setBalance(atmBalance);

      if (account) {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const wallet = provider.getSigner(account);
        const walletBalance = ethers.utils.formatEther(await wallet.getBalance());
        setWalletBalance(walletBalance);
      }
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };
  const deposit5 = async () => {
    if (atm) {
      let tx = await atm.deposit(5);
      await tx.wait();
      getBalance();
    }
  };
  const deposit10 = async () => {
    if (atm) {
      let tx = await atm.deposit(10);
      await tx.wait();
      getBalance();
    }
  };
  const deposit20 = async () => {
    if (atm) {
      let tx = await atm.deposit(20);
      await tx.wait();
      getBalance();
    }
  };


  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };
  const withdraw5 = async () => {
    if (atm) {
      let tx = await atm.withdraw(5);
      await tx.wait();
      getBalance();
    }
  };
  const withdraw10 = async () => {
    if (atm) {
      let tx = await atm.withdraw(10);
      await tx.wait();
      getBalance();
    }
  };
  const withdraw20 = async () => {
    if (atm) {
      let tx = await atm.withdraw(20);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Current Account: {account}</p>
        <p>Metamask Balance: {walletBalance} ETH</p>
        <p>ATM Balance: {balance} ETH</p>

        <label>Deposit ATM: &nbsp;&nbsp;&nbsp;</label>
        <button onClick={deposit}> 1 ETH</button>
        <button onClick={deposit5}> 5 ETH</button>
        <button onClick={deposit10}> 10 ETH</button>
        <button onClick={deposit20}> 20 ETH</button><br/>
        
        <label>Withdraw ATM: </label>
        <button onClick={withdraw}> 1 ETH</button>
        <button onClick={withdraw5}> 5 ETH</button>
        <button onClick={withdraw10}> 10 ETH</button>
        <button onClick={withdraw20}> 20 ETH</button><br/><br/>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
        <main className="container">
      <header><h1>Welcome to the ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: white;
          color: black;
          border-style: solid;
          border-width: 8px;
          
        }
      `}
      </style>
    </main>
  );
}