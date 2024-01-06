"use client";
import { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ColorModeScript initialColorMode="dark" />
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </>
    );
}

export default Providers;
