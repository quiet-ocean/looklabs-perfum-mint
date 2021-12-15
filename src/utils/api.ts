import axios from 'axios'
import * as dotenv from 'dotenv'
import env from '../config'

dotenv.config()

export const api = axios.create({
  baseURL: env.API,
})
