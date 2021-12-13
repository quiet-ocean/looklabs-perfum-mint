import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  fonts: {
    heading: "IBM Plex Mono",
    body: "IBM Plex Mono",
  },
  colors: {
    default: {
      100: "#a5a5a5",
    },
    gray: "#808080",
  },
  components: {
    // InputField
    Input: {
      baseStyle: {
        color: "red",
      },
    },
    MenuItem: {
      baseStyle: {
        px: 0,
        py: 0,
        textAlign: "center",
      },
    },
    HStack: {
      baseStyle: {
        // width:'100%'
      },
      variants: {
        full: {
          width: "100%",
        },
      },
      defaultProps: {
        size: "lg",
        variants: "full",
      },
    },
    Box: {
      baseStyle: {
        padding: "15px",
        w: "100%",
        color: "red",
        border: "1px solid red !important",
      },
      variants: {
        full: {
          w: "100%",
          color: "red",
        },
      },
      defaultProps: {
        size: "lg",
        variants: "full",
      },
    },
    Button: {
      baseStyle: {
        w: "100%",
        // bgGradient: "linear(to-tr, #fd06b1, #ef313e, #cc672a, #a4a02e, #7dd632, #60ff35)",
        p: "45px",
        borderRadius: "0px !important",
        h: "56px",
        // color:'red',
      },
      size: {
        base: {
          fontSize: "24px",
        },
        md: {
          fontSize: "48px",
        },
      },
      defaultProps: {
        size: "md",
      },
    },
    Container: {
      baseStyle: {
        // color: 'red',
        px: "2px",
      },
      sizes: {
        base: {
          px: "0px",
          color: "red",
        },
        sm: {
          px: "10px",
          color: "blue",
        },
        md: {
          px: "20px",
          color: "yellow",
        },
      },
    },
    Text: {
      baseStyle: {
        textTransform: "uppercase",
        color: "#a5a5a5",
        fontFamily: "Verdana",
        fontSize: "16px",
      },
    },
    Heading: {
      baseStyle: {
        w: "100%",
        textTransform: "uppercase",
        color: "white",
      },
    },
  },
});

export { Theme };
