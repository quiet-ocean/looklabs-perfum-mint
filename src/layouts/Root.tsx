import { useEffect } from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import { Connect } from "./";
import { Marketplace, Cart, Checkout, About, Whitepaper } from "../views";
import { Header, Footer, Navbar } from "../components";

import { VStack, Box } from "@chakra-ui/react";
// import { AnimatedSwitch } from 'react-router-transition'

function AutoScrollToTop({ history }: { history: any }) {
    useEffect(() => {
      const unlisten = history.listen(() => {
        //   setTimeout(() => {
        //     window.scrollTo({top: 0, behavior: 'smooth'})
        //   }, 1000)
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
      });
      return () => {
        unlisten();
      }
    }, []);
  
    return (null);
  }

  const ST = withRouter(AutoScrollToTop)

const Root: React.FC = () => {
    
    return (
        <div style={{height: '100vh'}}>
        <VStack
            align="stretch"
            justify={"space-between"}            
            spacing={"0px"}
            // overflowY="auto"
            h='100%'
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
            >
                <Connect>
                    <ST />
                    <Switch>
                        <Route exact path="/" component={Marketplace} />
                        <Route path="/about" component={About} />
                        <Route exact path="/cart" component={Cart} />                    
                        <Route exact path="/token" component={Marketplace} />
                        <Route exact path="/whitepaper" component={Whitepaper} />                    
                        <Route exact path="/checkout" component={Checkout} />
                    </Switch>
                </Connect>
            </Box>
            <Box>
                <Footer />
            </Box>
            
        </VStack>
        </div>
    )
}

export { Root }