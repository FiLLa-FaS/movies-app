export default class SwapiService {
  apiBase = 'https://api.themoviedb.org/3'

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  async getSearchMovies() {
    const res = await this.getResource(
      '/search/movie?api_key=b76930803193cf07dedaa55dd5793257&language=en-US&query=return&page=1&include_adult=false'
    )
    return res.results
  }
}
