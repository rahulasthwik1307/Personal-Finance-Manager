import axios from 'axios'

export const getRates = async () => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
    return response.data.rates
  } catch (error) {
    // Fallback to local rates
    return {
      USD: 1,
      EUR: 0.93,
      INR: 83.12
    }
  }
}

export const convertCurrency = async (amount, from, to) => {
  const rates = await getRates()

      if (!rates[from] || !rates[to]) throw new Error('Invalid currency')
      return (amount * rates[to] / rates[from]).toFixed(2)
  }