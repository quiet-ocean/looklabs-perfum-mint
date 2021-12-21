// import { useContext, useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom'
// import { utils, BigNumber } from "ethers";
// import { Link } from "react-router-dom";
import { useEffect, useContext } from 'react'
import { Context } from '../../state'
import { Infographic } from "../../components";
import { WHITEPAPER } from '../../state/constants';
import {
    Container
} from "@chakra-ui/react";


const Whitepaper = () => {

    const { dispatch } = useContext(Context)

    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: WHITEPAPER})
    }, [])
    return (
        <>
            <Container maxW="100%" centerContent>
                <Infographic />
            </Container>
        </>
    );
};

export { Whitepaper };
