// import "./App.css";
// import { useState } from "react";
// import PolygonIDVerifier from "./PolygonIDVerifier";
// import VcGatedDapp from "./VcGatedDapp";
// import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";
// import Form from "./form";

// function App() {
//   // if you're developing and just want to see the dapp without going through the Polygon ID flow,
//   // temporarily set this to "true" to ignore the Polygon ID check and go straight to the dapp page
//   const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
//   return (
//     <>
//       {provedAccessBirthday ? (
//         <VcGatedDapp />
//       ) : (
//         <Center className="vc-check-page">
//           <Container>
//             <Card
//               style={{
//                 border: "2px solid #805AD5",
//               }}
//             >
//               <CardBody style={{ paddingBottom: 0 }}>
//                 <p>
//                   This is a fullstack template for creating a Polygon ID VC{" "}
//                   <a href="https://0xpolygonid.github.io/tutorials/#core-concepts-of-polygon-id-verifiable-credentials-identity-holder-issuer-and-verifier-triangle-of-trust">
//                     (Verifiable Credential)
//                   </a>{" "}
//                   gated dapp. Prove you were born before January 1, 2023 to use
//                   the dapp
//                 </p>

//                 <PolygonIDVerifier
//                   publicServerURL={
//                     process.env.REACT_APP_VERIFICATION_SERVER_PUBLIC_URL
//                   }
//                   localServerURL={
//                     process.env.REACT_APP_VERIFICATION_SERVER_LOCAL_HOST_URL
//                   }
//                   credentialType={"KYCAgeCredential"}
//                   issuerOrHowToLink={
//                     "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
//                   }
//                   onVerificationResult={setProvedAccessBirthday}
//                 />
//                 <Image
//                   src="https://bafybeibcgo5anycve5flw6pcz5esiqkvrzlmwdr37wcqu33u63olskqkze.ipfs.nftstorage.link/"
//                   alt="Polygon devs image"
//                   borderRadius="lg"
//                 />
//               </CardBody>
//               <Form />
//             </Card>
//           </Container>
//         </Center>
//       )}
//     </>
//   );
// }

// export default App;

import React from "react";
import Main from "./ui";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Form from "./form";

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
            <Route element={<Form />} path="/claim" />
          </Routes>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;