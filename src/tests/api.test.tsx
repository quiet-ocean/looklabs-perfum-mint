import { render, screen } from '@testing-library/react'
import { api } from '../utils/api'

jest.useRealTimers();

describe('Label api test', () => {
    let label: string
    let p
    const ADDED = 1
    let LabelApi = api
    beforeEach((): void => {
        jest.setTimeout(60000);
        // p = new SUT.PlaywrightFluent();
        // label = Math.random().toString()
        label = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    })
    it('handle label check api', async () => {
        label = 'ff'
        let response = await LabelApi.get(`/label?name=${label}`)
        // LabelApi.get(`/label?name=${label}`)
        // .then(response => {
        //     console.log(response)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        console.log(response)
        // console.log(response.status)
        expect(response.status).toEqual(200)
    })
    it('handle label created randomly', () => {
        // let label = Math.random()
        console.log(label)
    })
    xit('handle a label and token being created', async () => {
        let response = await LabelApi.post(`/label`, {
            name: label,
            address: '0x03812c437Cce85494CFa65fDC9CDed37bAcCC8E1',
            productId: 1,
            type: ADDED,
          })
        console.log(response)
    })
})