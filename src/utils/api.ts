import axios from 'axios';
import * as dotenv from 'dotenv'
import env from '../config'

dotenv.config()

export const api = axios.create({
  // baseURL: process.env.API_URL || 'http://localhost:5001/',
  // baseURL: 'https://elite.looklabs.xyz/',
  baseURL: env.API,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});