// import theme fontsource
import "@fontsource/ibm-plex-mono/100.css";
import "@fontsource/ibm-plex-mono/200.css";
import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
// import { Switch, Route } from "react-router-dom";


import { ChakraProvider } from "@chakra-ui/react";
import { Store } from "./state";
import { Theme } from "./theme";
import { Root } from './layouts/Root'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = () => {
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ChakraProvider theme={Theme}>
          <Store>
            <Root />

          </Store>
        </ChakraProvider>
      </Web3ReactProvider>
    </Router>
  );
};

export { App };
