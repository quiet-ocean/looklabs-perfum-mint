import { useState, useEffect } from "react";
// import { useLocation } from "react-router";
import { Button } from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'

const ScrollToTop = () => {

    // const { pathname } = useLocation();
    // const [showButton, setShowButton] = useState(false)

    let scrollToTop = () => {
        console.log('scroll to top')
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    // useEffect(() => {
    //     scrollToTop()
    // }, [pathname]);
    useEffect(()=>{
        // window.addEventListener('scroll', (e) => {
        //     if(window.pageYOffset > 300) {
        //         setShowButton(true)
        //     } else {
        //         setShowButton(false)
        //     }
        // }, true)
    })
    return null
    return (
        <Button style={{position: 'fixed', bottom: '10px', right: '10px', border: '1px solid white', width: '24px'}} onClick = {scrollToTop}><ChevronUpIcon/></Button>
    )
    // return null;
};

export { ScrollToTop }