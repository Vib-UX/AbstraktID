import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Main from "./components/Main";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "AbksractID",
  projectId: "103333b30405efc424b73b939a369d24",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <Routes>
            <Route element={<Main />} path="/" />
          </Routes>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
