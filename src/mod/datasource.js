import axios from 'axios'

const _queryString = (options = false) => {
  if (!options) return ''

  let str = []
  for (let i in options) {
    str.push(encodeURIComponent(i) + '=' + encodeURIComponent(options[i]))
  }

  return '?' + str.join('&')
}

const apiUrl = 'http://www.omdbapi.com/'
const apiKey = 'faf7e5bb'

const config = {
  movies: apiUrl 
}

export const getMovies = async ({search = 'batman', page = 1}) => {
  const url = config.movies + _queryString({apikey: apiKey, s: search, page})
  const result = await axios.get(url).then((response) => response.data)
  // console.log(result)
  return result
}


