// @ts-nocheck
import {
    MouseEvent,
    useState,
    useCallback,
    useEffect,
    useRef,
    Suspense,
    useContext,
  } from "react";
  import { utils } from "ethers";
  import { useAppState } from "../../state";
  import ReactPlayer from "react-player";
  import { Canvas } from "@react-three/fiber";
  import {
    Environment,
    Html,
    OrbitControls,
    PerspectiveCamera,
    useProgress,
  } from "@react-three/drei";
  import Model from "../Voxel/Model";
  // import axios from 'axios'
  import { OrderProps } from "../../types";
  import { Context } from "../../state";
  
  import {
    Container,
    Heading,
    VStack,
    Box,
    Button,
    Text,
    Input,
    Flex,
  } from "@chakra-ui/react";
  
  const ProductItem = ({ token, master }) => {
    const { boughtTokens, cyberName, setCyberName, labelExist } = useAppState();
    const tokenPrice = Number(utils.formatEther(token.price));
    const [order, setOrder] = useState<OrderProps>({
      qty: 1,
      productPrice: tokenPrice,
    });
  
    const { dispatch } = useContext(Context);
    const [input, setInput] = useState("");
  
    // const [faqIdx, setFaqIdx] = useState(null)
    // const [infoIdx, setInfoIdx] = useState(null)
    const cyberSupply = token.supply;
    const maxUnits = token.maxUnits;
  
    // const [dimensions, setDimensions] = useState<windowSize>({
    //   width: '100%',
    //   height: '100%',
    // })
  
    // const eliteAPI = 'https://api.looklabs.xyz/cyber'
  
    const updateSupply = useAppState(
      useCallback(({ getSupply }) => getSupply, [])
    );
  
    useEffect(() => {
      updateSupply();
    }, [updateSupply]);
  
    // const terminal = useRef<HTMLDivElement>(null)
  
    let add2Cart = (token, quantity) => {
      const item = { token, quantity };
      dispatch({ type: "ADD_TOKEN", payload: item });
    };
  
    // const onBuyClick = (e: MouseEvent) => {
    //   e.preventDefault()
  
    //   if (terminal.current) {
    //     const { current } = terminal
    //     const boundingRect = current.getBoundingClientRect()
    //     const { width, height } = boundingRect
    //     setDimensions({ width: width, height: height })
    //   }
  
    //   let access_token = '$LOOK_DOPE_LABS'
  
    //   axios
    //     .get(eliteAPI, {
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //       params: { label: cyberName },
    //     })
    //     .then(response => {
    //       const isValid = response.data.free
  
    //       if (isValid) {
    //         labelExist(isValid)
    //         mintArt() // to remove and leave to mintToken only
    //         // mintToken(order.qty, token.price.mul(order.qty))
    //       } else {
    //         labelExist(isValid)
    //       }
    //     })
    // }
  
    // const onGoBack = (e: MouseEvent) => {
    //   e.preventDefault()
    //   setTransactionDone(false) // reset transaction
    //   setLoading(false) // reset screen
    //   setOrder({
    //     qty: 1,
    //     productPrice: tokenPrice,
    //   }) // reset order
    // }
  
    const minQty = (e: MouseEvent) => {
      e.preventDefault();
      const newVal = order.qty - 1;
      const newPrice = tokenPrice * newVal;
      if (newVal >= 1) {
        setOrder({
          ...order,
          qty: newVal,
          productPrice: newPrice,
        });
      }
    };
  
    const plusQty = (e: MouseEvent) => {
      e.preventDefault();
      const newVal = order.qty + 1;
      const newPrice = tokenPrice * newVal;
  
      if (
        boughtTokens &&
        boughtTokens?.toNumber() + newVal <= cyberSupply &&
        newVal <= maxUnits
      ) {
        setOrder({
          ...order,
          qty: newVal,
          productPrice: newPrice,
        });
      }
    };
  
    // transaction
  
    const { setTransaction, setUser, getSupply, getCyberId, mintArt } =
      useAppState(
        useCallback(
          ({ setTransaction, setUser, getSupply, getCyberId, mintArt }) => ({
            setTransaction,
            setUser,
            getSupply,
            getCyberId,
            mintArt,
          }),
          []
        )
      );
  
    const transactionRef = useRef(useAppState.getState().transaction);
    // const [loading, setLoading] = useState<boolean>(false)
    // const [transactionDone, setTransactionDone] = useState<boolean>(false)
    const updateTransaction = useCallback(async () => {
      await setUser();
      setTransaction(undefined);
      await getCyberId();
      await getSupply();
      await mintArt();
    }, [setTransaction, setUser, getSupply, getCyberId, mintArt]);
  
    useEffect(() => {
      useAppState.subscribe(async ({ transaction }) => {
        try {
          transactionRef.current = transaction;
          if (!transaction) return;
          setLoading(true);
          const receipt = await transaction.wait();
          if (receipt.confirmations >= 1) {
            updateTransaction();
            setTransactionDone(true);
          }
        } catch (e) {
          console.log("transaction error", e);
          setLoading(false);
        }
      });
      return () => {
        useAppState.destroy();
      };
    }, [updateTransaction]);
  
    function changeCyberName(e) {
      labelExist(true);
      const val = e.target.value;
      const r = new RegExp("^[a-zA-Z0-9$#!&]+$");
      if (r.test(val) && val.length <= 5) {
        setInput(val);
        setCyberName(val);
      } else if (val.length === 0) {
        setInput("");
        setCyberName("");
      }
    }
  
    function Loader() {
      const { progress } = useProgress();
      return (
        <Html
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              margin: "auto",
              width: "150px",
              left: "-50px",
              top: "-150px",
              fontSize: "16px",
            }}
          >
            {progress}% LOADED.
          </div>
        </Html>
      );
    }
    return (
      <Container maxW="100%">
        <Container maxW="100%" spacing="10px" borderBottom="1px">
          <Flex direction={{ base: "column", md: "row" }}>
            <Box p="20px" w={{ base: "100%", md: "50%" }}>
              <Container bg="" h="521px">
                {master !== "undefined" && master ? (
                  <Canvas
                    camera
                    style={{
                      cursor: "grab",
                      paddingTop: "25px",
                      background: "url(static/grid.png)",
                      backgroundSize: 'contain'
                    }}
                  >
                    <PerspectiveCamera makeDefault position={[100, 130, -125]} />
                    <OrbitControls target={[0, 50, 0]} />
                    <Suspense fallback={<Loader />}>
                      <Model name={{ cyberName }} position={[0, 0, 0]} zoom={0} />
                      <Environment preset="city" />
                    </Suspense>
                  </Canvas>
                ) : (
                  <ReactPlayer
                    // url={token.media}
                    url={''}
                    loop={true}
                    playing={true}
                    muted={true}
                    width="100%"
                    height="100%"
                  />
                )}
              </Container>
            </Box>
            <Box p="20px" w={{ base: "100%", md: "50%" }}>
              <VStack align="stretch" spacing="25px" h="100%">
                <Box>
                  <Text color="#a5a5a5">ntf & physical</Text>
                </Box>
                <Box>
                  <Heading>{token.name}</Heading>
                </Box>
                <Box>
                  <Text color="white">0.01 + gas</Text>
                </Box>
                <Box h="100%">
                  <Text>
                    diam augue auctor aliquet tortor dui proin purus, amet. ut
                    pellentesque sem praesent cras adipiscing risus pellentesque
                    non id. risus sed vitae nisi sit. learn more
                  </Text>
                </Box>
                <Flex direction={{ base: "column", md: "row" }}>
                  {master !== "undefined" && master ? (
                    <VStack w="100%" h="100%" align="stretch">
                      <Box w="100%">
                        <Text>name your $edp pass</Text>
                      </Box>
                      <Box w="100%" p="8px">
                        <Input
                          fontFamily="Verdana"
                          border="1px solid"
                          borderRadius="0px"
                          p="17px"
                          h="100%"
                          fontSize="36px"
                          color="red"
                          textAlign="center"
                          maxLength="5"
                          textTransform="uppercase"
                          value={input}
                          onChange={changeCyberName}
                          autoComplete="off"
                        />
                      </Box>
                    </VStack>
                  ) : (
                    ""
                  )}
                  <Box w="100%">
                    <Text textTransform="uppercase" color="#a5a5a5">
                      how many units to mint?
                    </Text>
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      spacing="10px"
                      align="stretch"
                      mt="15px"
                    >
                      <Box
                        fontSize="36px"
                        w="100%"
                        textAlign="center"
                        border="3px solid #a5a5a5"
                        p="10px"
                        onClick={minQty}
                      >
                        -
                      </Box>
                      <Box w="" textAlign="center">
                        <Input
                          fontSize="36px"
                          p="36px"
                          w={{ base: "100%", md: "150px" }}
                          textAlign="center"
                          borderRadius="0px"
                          border="none"
                          value={order.qty}
                          min="1"
                          max="10"
                          readOnly
                        />
                      </Box>
                      <Box
                        fontSize="36px"
                        w="100%"
                        textAlign="center"
                        border="3px solid #a5a5a5"
                        p="10px"
                        onClick={plusQty}
                      >
                        +
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
                <Box>
                  {boughtTokens && boughtTokens?.toNumber() < cyberSupply && (
                    <Box>
                      <Button
                        bgGradient="linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)"
                        // onClick={onBuyClick}
                        onClick={() => {
                          add2Cart(token, order.qty);
                        }}
                        p="45px"
                      >
                        <Text
                          fontSize={{ base: "12px", md: "32px" }}
                          fontFamily="monospace"
                          color=""
                        >
                          ADD TO CART
                        </Text>
                      </Button>
                      <span className="btn-preorder--glitch"></span>
                    </Box>
                  )}
                  {/* show sold out if no tokens */}
                  {boughtTokens && boughtTokens?.toNumber() === cyberSupply && (
                    <h3
                      className="text-cyber"
                      style={{
                        color: "red",
                        marginTop: "6rem",
                        fontSize: "4rem",
                        display: "block",
                      }}
                    >
                      SOLD OUT
                    </h3>
                  )}
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Container>
        <Box p="10px" overflow="hidden">
          <Text
            fontSize="24px"
            textTransform="uppercase"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            purchase all four products to join the dao purchase all four products
            to join the dao purchase all four products to join the dao
          </Text>
        </Box>
      </Container>
    );
  };
  
  export { ProductItem }