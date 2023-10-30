'use client';
import {
    connectorsForWallets,
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    ledgerWallet,
    trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import * as React from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { optimismGoerli, polygonMumbai, scrollSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        polygonMumbai, scrollSepolia
    ],
    [publicProvider()]
);

const projectId = '103333b30405efc424b73b939a369d24' || '';
const demoAppInfo = {
    appName: 'Dapp Starter',
};

const { wallets } = getDefaultWallets({
    appName: demoAppInfo.appName,
    projectId,
    chains,
});

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                modalSize='compact'
                initialChain={optimismGoerli}
                showRecentTransactions
                appInfo={demoAppInfo}
                chains={chains}
            >
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}