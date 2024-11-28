import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const getSaleFullDetail = async (saleId) => {
    const url = getApiUrl(`saleDetail/${saleId}`)
    const response = await axios.get(url, { withCredentials: true })
    return response.data
}

