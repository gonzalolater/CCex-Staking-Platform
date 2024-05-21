import React from "react";
import { Link } from "react-router-dom";

import { Web3Button, useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
function Header(props) {
  const { client } = props;
  const { isConnected } = useAccount();

  return (
    <nav className="navbar navbar-default navbar-trans navbar-expand-lg ">
      <div className="container">
        <Link className="navbar-brand text-brand" to="/">
          <img src="images/logo.png" alt="cenx" />
          <span></span>
        </Link>
        <div
          className="navbar-collapse collapse justify-content-left"
          id="navbarDefault"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" title="Stake">
                {" "}
                Stake{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Exchange" title="Trade">
                {" "}
                Trade{" "}
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/#"
                title="Supports"
                data-toggle="modal"
                data-target="#myModal-14"
              >
                {" "}
                Support{" "}
              </a>
            </li>

            <div className="modal" id="myModal-14">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Support</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="liquidity">
                      <h4>
                        Write email at support@birtisetoken.com for queries
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div className="right-side">
          <ul>
            <li>
              <Web3Button />
            </li>
          </ul>
        </div>

        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarDefault"
          aria-controls="navbarDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {" "}
          <span></span> <span></span> <span></span>{" "}
        </button>
      </div>
    </nav>
  );
}

export default Header;
