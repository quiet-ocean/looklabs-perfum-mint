import { useEffect, useContext } from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import { Connect } from "./";
import { Context, useAppState } from '../state'
import { Marketplace, Cart, Checkout, About, Whitepaper, AddProduct, AdminPage } from "../views";
import { Header, Footer, Navbar, LoginModal } from "../components";
import { PrivateRoute } from './PrivateRoute';

import { VStack, Box, Text, useDisclosure } from "@chakra-ui/react";
import { setAuthToken, api } from '../utils';
// import { AnimatedSwitch } from 'react-router-transition'

function AutoScrollToTop({ history }: { history: any }) {
    useEffect(() => {
      const unlisten = history.listen(() => {
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { appState, setAppState } = useContext(Context)
    
    const loading = appState.loading

    // const loadUser = async () => {
    //     let res = await api.get('/auth')
    //     if(res && res.data) {
    //         let user: string = res.data
    //         setAppState({...appState, isAuthenticated: true, user: user})
    //     } else {

    //     }
    // }
    useEffect(() => {
        if(localStorage.token)  {
            // setAppState({...appState, isAuthenticated: true})
            setAuthToken(localStorage.token)
        }
        // loadUser()
        // let user = await loadUser()
        // setAppState({ ...appState, user: user})
    }, [])

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
                    <Navbar onOpen={onOpen}/>
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
                            <Route exact path="/products/:category" component={Marketplace} />
                            <PrivateRoute exact path="/add" component={AddProduct} />
                            <PrivateRoute exact path="/admin" component={AdminPage} />
                            <Route exact path="/whitepaper" component={Whitepaper} />                    
                            <Route exact path="/checkout" component={Checkout} />
                        </Switch>
                    </Connect>
                </Box>
                <Box>
                    <Footer />
                </Box>
                
            </VStack>
            {loading
            ?
            <Box
                style={{
                position: 'fixed',
                top: '0px',
                bottom: '0px',
                right: '0px',
                left: '0px',
                background: 'black',
                opacity: '0.5',
                }}
            >
                <Text color='white' zIndex={'2'} fontSize='22px' textAlign='center' marginTop='30%'>Loading...</Text>
            </Box>
            :
            ''
            }
            <LoginModal isOpen = {isOpen} onOpen={onOpen} onClose={onClose} />
        </div>
    )
}

export { Root }