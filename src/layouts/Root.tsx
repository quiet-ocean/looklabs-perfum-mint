import { BrowserRouter as Router } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Switch, Route } from "react-router-dom";
import { Connect } from "./";
import { Marketplace, Cart, Checkout, About, Whitepaper } from "../views";
import { Header, Footer, Navbar } from "../components";

import { ChakraProvider, VStack, Box } from "@chakra-ui/react";
import { Store, Context } from "../state";
import { Theme } from "../theme";
import { useContext } from "react";

const Root: React.FC = () => {
    return (
        <>
        <VStack
            align="stretch"
            justify={"space-between"}
            h="100%"
            
            spacing={"0px"}
            overflowY="auto"
            css={{
            "&::-webkit-scrollbar": {
                width: "6px",
            },
            "&::-webkit-scrollbar-track": {
                width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
                background: "#eee",
                borderRadius: "24px",
            },
            }}
        >
            <Box>
                <Header />
            </Box>
            <Box>
                <Navbar />
            </Box>
            <Box
            flexGrow={10}
            fontFamily='-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
            minHeight='500px'
            >
                <Connect>
                    <Switch>
                    <Route path="/about" component={About} />
                    <Route exact path="/" component={Marketplace} />
                    <Route exact path="/token" component={Marketplace} />
                    <Route exact path="/whitepaper" component={Whitepaper} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/checkout" component={Checkout} />
                    </Switch>
                </Connect>
            </Box>
            <Box>
                <Footer />
            </Box>
            
        </VStack>
        </>
    )
}

export { Root }