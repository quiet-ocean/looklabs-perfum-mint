import { Text, Box, Flex, Container, Stack, Image, Heading } from "@chakra-ui/react";

const Infographic: React.FC = () => {

    return (
        <Container maxW="100%">
            <Container maxW="container.xl" centerContent>
                <Text
                    as="h1"
                    color="white"
                    fontStyle="normal"
                    fontWeight="600"
                    mb={{ base: "1rem", lg: "3rem" }}
                    fontSize={{ base: "30px", lg: "40px" }}
                    textAlign="center"
                    textTransform="uppercase"
                    mt="72px"
                >
                    ELITE Genesis Drop
                </Text>
                <Text color="white" mt="1rem" mb={{ base: "6rem", lg: "6rem" }}>
                    Here is a description of the 4 NFT + physical products that you must
                    purchase in a single transaction in order to receive4 a Look Labs DAO
                    token. Note that you can purchase each of these products individually
                    as well. However, you will receive the bonus Look Labs DAO token for
                    each set of 4 products that you purchase. So, if you purchase 2 of
                    each products (8 total), you will receive 2 Look Labs DAO tokens:
                </Text>
            </Container>

            <div className="infographic-container">
                <div className="infographic-row-top">
                    <Image
                        src="/static/Union.svg"
                        boxSize="10%"
                        display={{ base: "none", lg: "block" }}
                    ></Image>
                    <Image src="/static/Union.svg" boxSize="10%"></Image>
                    <Image src="/static/Union.svg" boxSize="10%"></Image>
                    <Image
                        src="/static/EDP.svg"
                        width={{ base: "160px", lg: "10%" }}
                    ></Image>
                    <Image src="/static/Union.svg" boxSize="10%"></Image>
                    <Image src="/static/Union.svg" boxSize="10%"></Image>
                    <Image
                        src="/static/Union.svg"
                        boxSize="10%"
                        display={{ base: "none", lg: "block" }}
                    ></Image>
                </div>
                <div className="infoHolder">
                    <Image
                        src="/static/info-arrow.svg"
                        boxSize={{ base: "75px", lg: "150px" }}
                        mt="3rem"
                    ></Image>
                    <Heading
                        as="h2"
                        fontSize={{ base: "22px", lg: "40px" }}
                        fontWeight="600"
                        color="white"
                        textTransform="uppercase"
                        pt="3rem"
                        pb="3rem"
                    >
                        4 x PRODUCTS GENESIS DROP
                    </Heading>
                    <Container maxW="container.xl" centerContent>
                        <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
                            <Box
                                w={{ base: "100%", lg: "55%" }}
                                display="flex"
                                justifyContent="center"
                                flexDirection="column"
                                paddingRight={{ base: "none", lg: 30 }}
                            >
                                <video loop autoPlay style={{ width: "100%", height: "100%" }}>
                                    <source src={"/static/movies/cyber_edp.mp4"} />
                                </video>
                            </Box>
                            <Box
                                w={{ base: "100%", lg: "45%" }}
                                marginTop={{ base: 9, lg: 0 }}
                                textAlign="center"
                                justifyContent="center"
                                alignItems="flex-start"
                                flexDirection="column"
                                display="flex"
                            >
                                <h3
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    Cyber Eau de Parfum
                                </h3>
                                <h2
                                    style={{
                                        textAlign: "center",
                                        color: "#b7b7b7",
                                        fontSize: "1.2rem",
                                        marginBottom: "2rem",
                                    }}
                                    className="textInfo"
                                >
                                    NFT + PHYSICAL
                                </h2>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    CUSTOM LABEL
                                </p>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    MADE IN GRASSE, FRANCE
                                </p>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    Metalight™ technology
                                </p>
                            </Box>
                        </Flex>
                        {/* hoodie */}
                        <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
                            <Box
                                w={{ base: "100%", lg: "55%" }}
                                display="flex"
                                justifyContent="center"
                                flexDirection="column"
                                paddingRight={{ base: "none", lg: 30 }}
                            >
                                <video loop autoPlay style={{ width: "100%", height: "100%" }}>
                                    <source src={"/static/movies/comfy5402_black_bg.mp4"} />
                                </video>
                            </Box>
                            <Box
                                w={{ base: "100%", lg: "45%" }}
                                marginTop={{ base: 9, lg: 0 }}
                                textAlign="center"
                                justifyContent="center"
                                alignItems="flex-start"
                                flexDirection="column"
                                display="flex"
                            >
                                <h3
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    Comfy5402 Metalight™ Hoodie
                                </h3>
                                <h2
                                    style={{
                                        textAlign: "center",
                                        color: "#b7b7b7",
                                        fontSize: "1.2rem",
                                        marginBottom: "2rem",
                                    }}
                                    className="textInfo"
                                >
                                    NFT + PHYSICAL
                                </h2>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    Fractionalized Cryptopunk #5402
                                </p>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    WIRELESS CHARGING
                                </p>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    MOST COMFORTABLE HOODIE
                                </p>
                            </Box>
                        </Flex>
                        {/* coder */}
                        <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
                            <Box
                                w={{ base: "100%", lg: "55%" }}
                                display="flex"
                                justifyContent="center"
                                flexDirection="column"
                                paddingRight={{ base: "none", lg: 30 }}
                            >
                                <video loop autoPlay style={{ width: "100%", height: "100%" }}>
                                    <source src={"/static/movies/coder_metapass.mp4"} />
                                </video>
                            </Box>
                            <Box
                                w={{ base: "100%", lg: "45%" }}
                                marginTop={{ base: 9, lg: 0 }}
                                textAlign="center"
                                justifyContent="center"
                                alignItems="flex-start"
                                flexDirection="column"
                                display="flex"
                            >
                                <h3
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    coder.art Metapass
                                </h3>
                                <h2
                                    style={{
                                        textAlign: "center",
                                        color: "#b7b7b7",
                                        fontSize: "1.2rem",
                                        marginBottom: "2rem",
                                    }}
                                    className="textInfo"
                                >
                                    ERC1155
                                </h2>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    FREE MINT
                                </p>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    FREE AR NFC MINT
                                </p>
                            </Box>
                        </Flex>
                        {/* cold_zero */}
                        <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
                            <Box
                                w={{ base: "100%", lg: "55%" }}
                                display="flex"
                                justifyContent="center"
                                flexDirection="column"
                                paddingRight={{ base: "none", lg: 30 }}
                            >
                                <video loop autoPlay style={{ width: "100%", height: "100%" }}>
                                    <source src={"/static/movies/cold_zero_1.mp4"} />
                                </video>
                            </Box>
                            <Box
                                w={{ base: "100%", lg: "45%" }}
                                marginTop={{ base: 9, lg: 0 }}
                                textAlign="center"
                                justifyContent="center"
                                alignItems="flex-start"
                                flexDirection="column"
                                display="flex"
                            >
                                <h3
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    cold_zero Digital Fashion
                                </h3>
                                <h2
                                    style={{
                                        textAlign: "center",
                                        color: "#b7b7b7",
                                        fontSize: "1.2rem",
                                        marginBottom: "2rem",
                                    }}
                                    className="textInfo"
                                >
                                    ERC721
                                </h2>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    Decentraland wearable
                                </p>
                                <p
                                    style={{
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        color: "#808080",
                                        marginBottom: "1rem",
                                    }}
                                    className="textInfo"
                                >
                                    Generative fashion
                                </p>
                            </Box>
                        </Flex>

                        {/* dao here */}

                        <div className="rewards-row">
                            <div className="union-token-element"></div>
                        </div>
                        <div className="infoHolder">
                            <Image
                                src="/static/info-arrow.svg"
                                boxSize={{ base: "117px", lg: "150px" }}
                                mt="3rem"
                            ></Image>
                            <h2 className="info-text">
                                WHEN STACKED, TOKEN Owners Become Part of DAO
                            </h2>
                            <Image
                                src="/static/dao.svg"
                                boxSize={{ base: "100%", lg: "70%" }}
                            ></Image>
                            <Image
                                src="/static/arrows.svg"
                                height={{ base: "57px", lg: "57px" }}
                                mt="3rem"
                            ></Image>
                            <h2 className="info-text">
                                100% of retail revenue distributed between $ELITE token holders
                            </h2>
                            <Image
                                src="/static/house.svg"
                                boxSize={{ base: "40%", lg: "20%" }}
                            ></Image>
                        </div>
                    </Container>
                </div>

                {/* cart.art here */}
                <div className="cart-art-container">
                    <Box position="absolute" bottom="0" left="0" top="0" right="0">
                        <video
                            loop
                            autoPlay
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        >
                            <source
                                src={
                                    "https://rumfoords.cdn.prismic.io/rumfoords/779247b4-87cb-4908-b0a1-1b0a96078fc1_Splash_BG+%281%29.mp4"
                                }
                            />
                        </video>
                        {/* <img src="https://ipfs.io/ipfs/QmPdDZTiG7ygREc3rfwJePg8mJx9wteSrXTqmHLQgDvjz6"></img> */}
                    </Box>

                    <Stack
                        direction={["column", "row"]}
                        spacing="24px"
                        alignItems="center"
                        position="relative"
                        zIndex="1"
                    >
                        <Flex>
                            <a
                                href="//cart.art/"
                                className="container-title"
                                style={{ fontSize: "2rem", textTransform: "uppercase" }}
                            >
                                POWERED BY CART.ART
                            </a>
                        </Flex>
                        {/* <Flex justifyContent="center">
              <img src="/static/cart.svg" width="50%"></img>
            </Flex> */}
                    </Stack>
                </div>
            </div>

            <style jsx={true}>{`
        @media screen and (min-width: 62em) {
          .cart-art-container {
            margin-top: 6rem !important;
          }
        }

        .infoGraphic {
          flex-direction: column !important;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }

        .textInfo {
          font-family: IBM Plex Mono;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 21px;
          text-align: center;
          text-transform: uppercase;
        }

        .cart-art-container {
          width: 100%;
          height: 100%;
          padding: 80px;
          font-style: normal;
          font-weight: bold;
          font-size: 48px;
          line-height: 62px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #ffffff;
          margin-top: 3rem;
          // background-image: linear-gradient(
          //   152deg,
          //   #2e3192 0%,
          //   #ec008c 48%,
          //   #2a00ec 77%,
          //   #00d5ff 100%
          // );
          justify-content: center;
          position: relative;
        }

        .flex-item {
          padding-left: 21px;
          padding-right: 39px;
        }
        .info-row-2 {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 100px;
        }

        .info-text {
          color: white;
          font-family: IBM Plex Mono;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 31px;
          text-align: center;
          text-transform: uppercase;
          color: #ffffff;
          padding-top: 3rem;
          padding-bottom: 3rem;
        }

        .infoHolder {
          width: 100%;
          display: flex;
          justify-content: center;
          padding-bottom: 24px;
          flex-direction: column;
          align-items: center;
        }
        .edp-token-name {
          font-family: IBM Plex Mono;
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 100%;

          text-align: center;
          text-transform: uppercase;
          opacity: 0.5;
          color: #ffffff;
        }

        .edp-token-element {
          background-image: url("/static/EDP.svg");
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 300px;
          color: white;
          padding-top: 56px;
          background-repeat: no-repeat;
        }

        .infographic-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h2 {
          font-family: IBM Plex Mono;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 31px;
          text-align: center;
          text-transform: uppercase;

          color: #ffffff;
        }

        .infographic-header {
          font-family: IBM Plex Mono;
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          line-height: 52px;
          text-align: center;
          text-transform: uppercase;
          color: #ffffff;
        }
      `}</style>
        </Container>
    );
}

export { Infographic };
