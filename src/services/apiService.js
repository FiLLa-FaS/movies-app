export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3'

  static async getResource(base, url) {
    const res = await fetch(`${base}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  async getSearchMovies(query, page = 1) {
    const res = await ApiService.getResource(
      this.apiBase,
      `/search/movie?api_key=b76930803193cf07dedaa55dd5793257&language=en-US&query=${query}&page=${page}&include_adult=false`
    )
    return res
  }
}
