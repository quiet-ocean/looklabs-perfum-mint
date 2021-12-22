// @ts-nocheck
// for some reason the Marquee is not allowing more children when TS is enabled
import Marquee from "react-easy-marquee";
import { Box } from "@chakra-ui/react";
function Header() {
  return (
    <header>
      <Box>
        <Marquee duration={60000} height="98px" reverse={true} axis="X">
          <img src="/static/look-labs-grey.svg" width="158px" />
          <img src="/static/look-labs-grey.svg" width="158px" />
          <img
            src="/static/look-labs-grey.svg"
            width="158px"
            className="hide-mobile"
          />
          <img
            src="/static/look-labs-grey.svg"
            width="158px"
            className="hide-mobile"
          />
          <img
            src="/static/look-labs-grey.svg"
            width="158px"
            className="hide-mobile"
          />
          <img
            src="/static/look-labs-grey.svg"
            width="158px"
            className="hide-mobile"
          />
        </Marquee>
      </Box>
      <style jsx='true'>{`
        header {
          color: white;
          border-bottom: 1px solid #e5e5e5;
          border: 3px solid black;
          border-radius: 5px;
          overflow: hidden;
        }

        @media only screen and (max-width: 600px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

export { Header };
