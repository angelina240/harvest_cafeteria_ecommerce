import axios from "axios"
import { getApiUrl } from "./apiConfig"

export const getAllPurchases = async () => {
    const url = getApiUrl(`sale/history`)
    const response = await axios.get(url, { withCredentials: true })
    return response.data
}