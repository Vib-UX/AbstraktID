// "use client";
// import { Web3AuthModalPack } from "@safe-global/auth-kit";
// import {
//   ADAPTER_EVENTS,
//   CHAIN_NAMESPACES,
//   WALLET_ADAPTERS,
// } from "@web3auth/base";
// import { MetamaskAdapter } from "@web3auth/metamask-adapter";
// import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import { useEffect, useState } from "react";
// import AppBar from "./AppBart";
// import { Box, Divider, Grid, Typography } from "@mui/material";
// import { EthHashInfo } from "@safe-global/safe-react-components";

// const connectedHandler = (data) => console.log("CONNECTED", data);
// const disconnectedHandler = (data) => console.log("DISCONNECTED", data);

// function SafeApp() {
//   const [web3AuthModalPack, setWeb3AuthModalPack] = useState();
//   const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(null);
//   const [userInfo, setUserInfo] = useState();
//   const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const options = {
//         clientId:
//           "BOM7C2-rwnQM6qAgTr-0fwXn27xVKFfCVorBH3nq_HqEJCLFkXmxSnGsosYz924x6ZEW7kvmhaZOhqe0yJ5gHms",
//         web3AuthNetwork: "testnet",
//         chainConfig: {
//           chainNamespace: CHAIN_NAMESPACES.EIP155,
//           chainId: "0x1",
//           rpcTarget: `https://polygon-mumbai.infura.io/v3/768b33091c0a45a99ef4ac03507e7683`,
//         },
//         uiConfig: {
//           theme: "dark",
//           loginMethodsOrder: ["google", "facebook"],
//         },
//       };

//       const modalConfig = {
//         [WALLET_ADAPTERS.TORUS_EVM]: {
//           label: "torus",
//           showOnModal: false,
//         },
//         [WALLET_ADAPTERS.METAMASK]: {
//           label: "metamask",
//           showOnDesktop: true,
//           showOnMobile: false,
//         },
//       };

//       const openloginAdapter = new OpenloginAdapter({
//         loginSettings: {
//           mfaLevel: "mandatory",
//         },
//         adapterSettings: {
//           uxMode: "popup",
//           whiteLabel: {
//             name: "Safe",
//           },
//         },
//       });

//       const metamaskAdapter = new MetamaskAdapter({
//         clientId:
//           "BOM7C2-rwnQM6qAgTr-0fwXn27xVKFfCVorBH3nq_HqEJCLFkXmxSnGsosYz924x6ZEW7kvmhaZOhqe0yJ5gHms",
//         sessionTime: 3600, // 1 hour in seconds
//         web3AuthNetwork: "testnet",
//         chainConfig: {
//           chainNamespace: CHAIN_NAMESPACES.EIP155,
//           chainId: "0x1",
//           rpcTarget: "https://rpc.ankr.com/polygon", // This is the public RPC we have added, please pass on your own endpoint while creating an app
//         },
//       });

//       const web3AuthModalPack = new Web3AuthModalPack({
//         txServiceUrl: "https://safe-transaction-goerli.safe.global",
//       });

//       await web3AuthModalPack.init({
//         options,
//         adapters: [openloginAdapter, metamaskAdapter],
//         modalConfig,
//       });

//       web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

//       web3AuthModalPack.subscribe(
//         ADAPTER_EVENTS.DISCONNECTED,
//         disconnectedHandler
//       );

//       setWeb3AuthModalPack(web3AuthModalPack);

//       return () => {
//         web3AuthModalPack.unsubscribe(
//           ADAPTER_EVENTS.CONNECTED,
//           connectedHandler
//         );
//         web3AuthModalPack.unsubscribe(
//           ADAPTER_EVENTS.DISCONNECTED,
//           disconnectedHandler
//         );
//       };
//     })();
//   }, []);

//   useEffect(() => {
//     if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
//       (async () => {
//         await login();
//       })();
//     }
//   }, [web3AuthModalPack]);

//   const login = async () => {
//     if (!web3AuthModalPack) return;

//     const signInInfo = await web3AuthModalPack.signIn();
//     console.log("SIGN IN RESPONSE: ", signInInfo);

//     const userInfo = await web3AuthModalPack.getUserInfo();
//     console.log("USER INFO: ", userInfo);

//     setSafeAuthSignInResponse(signInInfo);
//     setUserInfo(userInfo || undefined);
//     setProvider(web3AuthModalPack.getProvider());
//   };

//   const logout = async () => {
//     if (!web3AuthModalPack) return;

//     await web3AuthModalPack.signOut();

//     setProvider(null);
//     setSafeAuthSignInResponse(null);
//   };

//   console.log(safeAuthSignInResponse, userInfo);

//   return (
//     <>
//       <AppBar
//         onLogin={login}
//         onLogout={logout}
//         userInfo={userInfo}
//         isLoggedIn={!!provider}
//       />
//       {safeAuthSignInResponse?.eoa && (
//         <Grid container>
//           <Grid item md={4} p={4}>
//             <Typography variant="h3" color="secondary" fontWeight={700}>
//               Owner account
//             </Typography>
//             <Divider sx={{ my: 3 }} />
//             <EthHashInfo
//               address={safeAuthSignInResponse.eoa}
//               showCopyButton
//               showPrefix
//               prefix={getPrefix("0x5")}
//             />
//           </Grid>
//           <Grid item md={8} p={4}>
//             <>
//               <Typography variant="h3" color="secondary" fontWeight={700}>
//                 Available Safes
//               </Typography>
//               <Divider sx={{ my: 3 }} />
//               {safeAuthSignInResponse?.safes?.length ? (
//                 safeAuthSignInResponse?.safes?.map((safe, index) => (
//                   <Box sx={{ my: 3 }} key={index}>
//                     <EthHashInfo
//                       address={safe}
//                       showCopyButton
//                       shortAddress={false}
//                     />
//                   </Box>
//                 ))
//               ) : (
//                 <Typography variant="body1" color="secondary" fontWeight={700}>
//                   No Available Safes
//                 </Typography>
//               )}
//             </>
//           </Grid>
//         </Grid>
//       )}
//     </>
//   );
// }

// const getPrefix = (chainId) => {
//   switch (chainId) {
//     case "0x1":
//       return "eth";
//     case "0x5":
//       return "gor";
//     case "0x100":
//       return "gno";
//     case "0x137":
//       return "matic";
//     default:
//       return "eth";
//   }
// };

// export default SafeApp;
'use client'
import Main from "../components/Main"

const MainApp = () => {
  return <Main />
}

export default MainApp