import { useContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { utils, BigNumber } from "ethers";
import { Link } from "react-router-dom";
import { Infographic } from "../../components";

import {
    VStack,
    HStack,
    Flex,
    Box,
    Text,
    Button,
    useToast,
    Grid,
    GridItem,
    keyframes,
    Container
} from "@chakra-ui/react";


const Whitepaper = () => {

    return (
        <>
            <Container maxW="100%" centerContent>
                <Infographic />
            </Container>
        </>
    );
};

export { Whitepaper };
