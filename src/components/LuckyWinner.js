import React, { useEffect, useState } from "react";
import Web3 from "web3";
import LuckyWinner from "../abis/LuckyWinner.json";

const LuckyWinnerComponent = () => {
  const [account, setAccount] = useState(null);
  const [luckyWinner, setLuckyWinner] = useState(null);
  const [user, setUser] = useState({});
  const [erolledData, setEnrolledData] = useState({});
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const [accounts] = await web3.eth.getAccounts();
    setAccount(accounts);
    const balance = await web3.eth.getBalance(accounts);
    console.log(balance);

    const networkId = await web3.eth.net.getId();
    console.log("NetworkId-------", networkId);

    const luckyWinnerData = LuckyWinner.networks[networkId];
    console.log("luckWinnerData----------", luckyWinnerData);

    if (luckyWinnerData) {
      const luckyWinnerCon = new web3.eth.Contract(
        LuckyWinner.abi,
        luckyWinnerData.address
      );
      setLuckyWinner(luckyWinnerCon);

      const data = await luckyWinnerCon.methods.getEnrolledData().call();
      console.log(data);
      console.log('Total Price-------',window.web3.utils.fromWei(data[1]._hex, "Ether"))

      setEnrolledData(data);
    }
  };

  const getEnrollData = async () => {
    const data = await luckyWinner.methods.getEnrolledData().call();
    console.log(data);
    console.log('Total Price-------',window.web3.utils.fromWei(data[1]._hex, "Ether"))
    setEnrolledData(data)
  }
  const enrolUser = (e) => {
    console.log(user);
    user.userAddress = account;
    luckyWinner.methods
      .enrollUser(user)
      .send({
        from: account,
        value: window.web3.utils.toWei("1", "Ether"),
        gas: 4700000,
      })
      .on("transactionHash", async (hash) => {
        getEnrollData()
        //   const data = await luckyWinner.methods.getEnrolledData().call()
        //   console.log(data)
      });
    // sellTokens = (tokenAmount) => {
    //     this.setState({ loading: true })
    //     this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    //       this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    //         this.setState({ loading: false })
    //       })
    //     })
    //   }
  };

  const announceWinner = async() => {
      const data = await luckyWinner.methods.announceRandomWinner().call()
      console.log(data)
      console.log('Total Price-------',window.web3.utils.fromWei(data[2]._hex, "Ether"))
  }
  return (
    <div style={{ width: 500, margin: "auto", marginTop: 100 }}>
        <button onClick={() => announceWinner()} className="btn btn-primary btn-block btn-lg">
          Get Winner
        </button>
      {erolledData && erolledData[1] && erolledData[1]._hex && (
        <h1>
          Total Price: {window.web3.utils.fromWei(erolledData[1]._hex, "Ether")}{" "}
          ETH
        </h1>
      )}
      <div style={{ marginBottom: 30 }}>
        <h3>Enrolled Users</h3>
        {erolledData &&
          erolledData[0] &&
          erolledData[0].length &&
          erolledData[0].map((item) => (
            <div key={item.userAddress} style={{ marginBottom: 10 }}>
              <div>Name: {item.name}</div>
              <div>Address: {item.userAddress}</div>
              <div>phone: {item.phone}</div>
            </div>
          ))}
      </div>
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          enrolUser();
        }}
      >
        <div>
          <label className="float-left"></label>
          <span className="float-right text-muted">
            {/* Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')} */}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(e) => {
              user.name = e.target.value;
              setUser(user);
            }}
            className="form-control form-control-lg"
            placeholder="Name"
            required
          />
        </div>

        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(e) => {
              user.email = e.target.value;
              setUser(user);
            }}
            className="form-control form-control-lg"
            placeholder="email"
            required
          />
        </div>

        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(e) => {
              user.phone = e.target.value;
              setUser(user);
            }}
            className="form-control form-control-lg"
            placeholder="phone"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg">
          Enroll
        </button>
      </form>
    </div>
  );
};

export default LuckyWinnerComponent;
