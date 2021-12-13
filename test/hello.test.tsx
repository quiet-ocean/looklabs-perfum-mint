import axios from 'axios'
import { api } from '../src/utils/api'

describe('cyber service', async () => {
    it('update cyber', async () => {
        api.post(`/cyber/update`, {productId: 1, tokenId: 2})
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
    })
})
