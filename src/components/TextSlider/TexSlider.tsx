// @ts-nocheck
// for some reason the Marquee is not allowing more children when TS is enabled
import Marquee from "react-easy-marquee";
import { ReactElement } from "react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

const TextSlider = ({ direction, variant }) => {
  return (
    <>
      <Box
        borderTop={{ base: "1px solid white", md: "1px solid white" }}
        borderBottom={{ base: "1px solid white", md: "1px solid white" }}
      >
        <Marquee
          duration={60000}
          height="98px"
          reverse={direction ? true : false}
          axis="X"
        >
          {variant === 1 ? (
            <>
              <Text>Purchase all four products to join the dao</Text>
              <Text>Purchase all four products to join the dao</Text>
              <Text>Purchase all four products to join the dao</Text>
              <Text>Purchase all four products to join the dao</Text>
            </>
          ) : (
            <>
              <Text>
                powered by <Text as="u">cart.art</Text>
              </Text>
              <Text>
                powered by <Text as="u">cart.art</Text>
              </Text>
              <Text>
                powered by <Text as="u">cart.art</Text>
              </Text>
              <Text>
                powered by <Text as="u">cart.art</Text>
              </Text>
            </>
          )}
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
    </>
  );
};

export { TextSlider };
