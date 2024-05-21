import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected, bscWalletConnect } from "./connector";
import { useWeb3React } from "@web3-react/core";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, active, deactivate, chainId } =
    useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false); // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    var providerType = await localStorage.getItem("providerType");
    var isConnected = await localStorage.getItem("isConnected");
    if (isConnected) {
      connect(providerType).then((val) => {
        setIsLoading(false);
      });
    }
  }
  // Init Loading
  useEffect(() => {
    fetchData();
  }, []);

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  const handleWalletModal = async (state) => {
    setWalletModal(state);
  };

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet
  const connect = async (providerType) => {
    setShouldDisable(true);
    try {
      if (providerType === "metaMask") {
        await activate(injected).then(() => {
          localStorage.setItem("providerType", "metaMask");
          localStorage.setItem("isConnected", true);
          setShouldDisable(false);
          handleWalletModal(false);
        });
      } else if (providerType === "bscWalletConnect") {
        await activate(bscWalletConnect).then(() => {
          localStorage.setItem("providerType", "bscWalletConnect");
          localStorage.setItem("isConnected", true);
          setShouldDisable(false);
          handleWalletModal(false);
        });
      } else {
      }
      setWalletModal(false);
    } catch (error) {
      console.log("Error on connecting: ", error);
      setShouldDisable(false);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    try {
      await deactivate();
      await localStorage.removeItem("isConnected");
      await localStorage.removeItem("providerType");
      window.location.reload();
    } catch (error) {
      console.log("Error on disconnnect: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      chainId,
      isLoading,
      walletModal,
      handleWalletModal,
      connect,
      disconnect,
      library,
      shouldDisable,
    }),
    [isActive, isLoading, shouldDisable, account, walletModal, chainId]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
