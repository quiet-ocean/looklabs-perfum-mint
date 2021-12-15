import axios from 'axios';
import * as dotenv from 'dotenv'
import env from '../config'

dotenv.config()

export const api = axios.create({

  baseURL: env.API,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});
export const LabelApi = axios.create({
  baseURL: env.LABEL_API,
  headers: {
    'crossDomain': 'true',
    'Accepts': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTION',
  }
})
