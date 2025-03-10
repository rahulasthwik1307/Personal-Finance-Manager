export const addMonths = (date, months) => {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
  }
  
  export const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0]
  }