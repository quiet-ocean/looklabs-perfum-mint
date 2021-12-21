// @ts-nocheck
import { useReducer, useEffect, useState, useContext } from "react";
import { productReducer } from "../../reducers";
import { Context, useAppState } from "../../state";
import { api } from "../../utils/api";
import * as dotenv from "dotenv";
import { TextSlider } from "../TextSlider";
import { ProductProps, StyleProps } from '../../types'
import { ProductItem } from "./ProductItem";
import { Container, Flex, Box, Text } from "@chakra-ui/react";
import { PRODUCT } from "../../state/constants";

dotenv.config();

const uri = [
  'cyber_grid.mov',
  'hoodie_v1.mov',
  'eight_fashion_metapass.mov',
  'coder_art_metapass.mp4',
]

const description = [
  [
    '<p>Cyber Eau de Parfume is the real taste of luxury in. Each Cyber comes with the digitalised version of the scent. The label is recoreded and customed on the blockchain. Each physical is matching the blockchain one.</p>',
  ],
  [
    '<h2>Includes LOOK LABS propreiatry Metalight™ technilogy. Lightening in the dark, wireless chargable. Recycable OLED lights.</h2>',
  ],
  ['<h2>Hello, World!</h2>'],
  ['<h2>1x free AR mint</h2>'],
]

const styles: StyleProps[][] = [
  [
    {id: 1, imageUri: '/static/hoodie/v1.png', animationUri: "/static/movies/cyber_grid.mov", selected: false},
    {id: 2, imageUri: '/static/hoodie/v2.png', animationUri: "/static/movies/cyber_grid.mov", selected: false},
  ],
  [
    {id: 1, imageUri: '/static/hoodie/v1.png', animationUri: "/static/movies/hoodie_v1.mov", selected: false},
    {id: 2, imageUri: '/static/hoodie/v2.png', animationUri: "/static/movies/hoodie_v2.mov", selected: false},
  ],
  [
    {id: 1, imageUri: '/static/hoodie/v1.png', animationUri: "/static/movies/eight_grid.mov", selected: false},
    {id: 2, imageUri: '/static/hoodie/v2.png', animationUri: "/static/movies/eight_fashion_metapass.mov", selected: false},
  ],
  [
    {id: 1, imageUri: '/static/hoodie/v1.png', animationUri: "/static/movies/coder_art_metapass.mp4", selected: false},
    {id: 2, imageUri: '/static/hoodie/v2.png', animationUri: "/static/movies/coder_metapass.mp4", selected: false},
  ],
]

const ProductList = () => {
  const { contract } = useAppState();
  const { state, dispatch, productState, productDispatch } = useContext(Context)
  // const [products, productDispatch] = useReducer(productReducer, []);1
  const [loading, setLoading] = useState(true);

  let _products = [];
  let products: ProductProps[] = productState.products

  let loadProduct = async () => {
    _products = await contract.getProducts();

    if (_products && _products.length) {
      _products.forEach(async (item, key) => {
        // TEST PRODUCT, TO REMOVE WHEN THE DB IS WORKING
        // const response = await api.get(`/product/${item.id}`)
        let newItem: ProductProps = {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          // contractType: item.contractType,
          sale: item.sale,
          // uri: item.url,
          mediaUrl: "/static/movies/" + uri[item.id],
          description: description[item.id],
          // type: item.name.toUpperCase() === 'CYBER EAU DE PARFUM' ? 2 : 1,
          type: item.name.toUpperCase() === 'CYBER EDP' ? 2 : 1,
          styles: styles[key],
          selectedStyle: 0,
        };

        productDispatch({ type: "ADD_PRODUCT", payload: newItem });
      });
    }
  };

  useEffect(async () => {
    dispatch({type: 'SET_PAGE', payload: PRODUCT})
    // productDispatch({type: 'REMOVE_ALL', payload: ''})
    if(!productState.loaded) {
      await loadProduct();
      productDispatch({type: 'SET_LOADED', payload: true})
      
    }
    setLoading(false);   
  }, []);

  return (
    <Flex color="white" direction={{ base: "column", md: "column" }}>
      {/* <Cart product={null}
        quantity="100" setLoading={setLoading}>
      </Cart> */}
      {/*products?.length === undefined || products?.length === 0 ? <Text textAlign='center' marginTop='10%'>No Product</Text> : null*/}
      {
        products?.map((item, key) => {
          if(item === undefined || item === '') return ''
          if (key === 0) {
            return (
              <Box key={key}>
                <Container maxW="100%" centerContent>
                  <ProductItem key={key} dataKey={key} product={item} setLoading={setLoading} />
                </Container>
                <TextSlider reverse={true} variant={1} />
              </Box>
            );
          } else if (key === 1) {
            return (
              <Box key={key}>
                <Container
                  maxW="100%"
                  boderbottom={{ base: "1px solid whtie", md: "none" }}
                  centerContent
                >
                  <ProductItem key={key} dataKey={key} product={item} setLoading={setLoading}/>
                </Container>
                <TextSlider
                  reverse={false}
                  variant={2}
                  display={{ base: "none", md: "block" }}
                />
              </Box>
            );
          } else {
            return (
              <Box key={key}>
                <Container maxW="100%" centerContent>
                  <ProductItem key={key} dataKey={key} product={item} setLoading={setLoading}/>
                </Container>
                {/* Dividier. ToDo - to be exported in component */}
                {/* skip border if it's last product not to overlap footer */}
                {key === products.length - 1 ? (
                  ""
                ) : (
                  <Box border="1px solid white"></Box>
                )}
              </Box>
            );
          }
        })
      }
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
    </Flex>
  );
};

export { ProductList };
