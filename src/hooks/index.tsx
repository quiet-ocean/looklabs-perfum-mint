import { useState, useEffect, useContext } from 'react'
import { useAppState, Context, TYPE_HOODIE } from '../state'
import { ProductProps, StyleProps } from '../types'
import { BigNumber } from 'ethers'
import { api } from '../utils'

const uri = [
'cyber_grid.mov',
'hoodie_v1.mov',
'hoodie_v2.mov',
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
[
    '<h2>Includes LOOK LABS propreiatry Metalight™ technilogy. Lightening in the dark, wireless chargable. Recycable OLED lights.</h2>',
],
['<h2>Hello, World!</h2>'],
['<h2>1x free AR mint</h2>'],
]

const data = [
{ type: 1, description: description[0] },
{ type: 2, description: description[1] },
{ type: 2, description: description[1] },
{ type: 3, description: description[2] },
{ type: 3, description: description[3] },
]

const styles: StyleProps[]= [
{id: 1, name: 'ver1', imageUri: '/static/hoodie/v1.png', animationUri: "/static/movies/hoodie_v1.mov", selected: false},
{id: 2, name: 'ver2', imageUri: '/static/hoodie/v2.png', animationUri: "/static/movies/hoodie_v2.mov", selected: false},
]

const useProductState = () => {
    const [products, setProducts] = useState({})

    const { contract } = useAppState()
    const { productState, productDispatch, appState, setAppState } = useContext(Context)
    const _loadProducts = async () => {
        
        let _products = await contract?.getProducts();
        if (_products && _products.length) {
        _products.forEach(async (item: any, key: number) => {
            // TEST PRODUCT, TO REMOVE WHEN THE DB IS WORKING           

            if(item.name === undefined || item.name === '')
            return
            let newItem: ProductProps = {
                id: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                contractType: item.contractType,
                category: item.category,
                sale: item.sale,
                url: item.url,

                type: BigNumber.from('1'),
                
                supply: item.supply,
                maxUnits: item.maxUnits,
                mediaUrl: "/static/movies/" + uri[item.id],
                description: 'description' + item.id,

                ids: [],
                styleId: BigNumber.from('1'),
                
            };

            let id = item.id.toNumber()
            const response = await api.get(`/product/${id}`)

            if(response.data !== null) {
                let data = response.data
                newItem =  {
                    ...newItem,
                    mediaUrl: data.mediaUrl,
                    description: data.description,
                }
            }
            // if(newItem.type === TYPE_HOODIE) {
            if(newItem.name.toLowerCase() === 'comfy5402') {
                newItem.type = TYPE_HOODIE
                productDispatch({ type: 'ADD_HOODIE', payload: newItem });
            } else {
                productDispatch({ type: "ADD_PRODUCT", payload: newItem });
            }
        });
        }
    }
    const loadProducts = async () => {
        if(contract === undefined || contract === null)
            return
        setAppState({...appState, loading: true})
        productDispatch({type: 'REMOVE_ALL', payload: ''})
        await _loadProducts()
        productDispatch({type: 'SET_LOADED', payload: true})
        setAppState({...appState, loading: false})
    }
    useEffect(() => {
        loadProducts()
    }, [])
    
    return productState.products
}

export { useProductState }