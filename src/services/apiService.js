export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3'

  apiKey = 'b76930803193cf07dedaa55dd5793257'

  static async getResource(base, url) {
    const res = await fetch(`${base}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  async createGuestSession() {
    const res = await ApiService.getResource(this.apiBase, `/authentication/guest_session/new?api_key=${this.apiKey}`)
    return res
  }

  async getSearchMovies(query, page = 1) {
    const res = await ApiService.getResource(
      this.apiBase,
      `/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    )
    return res
  }

  async getRatedMovies(sessionId, page = 1) {
    const res = await ApiService.getResource(
      this.apiBase,
      `/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`
    )
    return res
  }

  async getGenres() {
    const res = await ApiService.getResource(this.apiBase, `/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
    return res
  }

  async rateMovie(movieId, sessionId, rate) {
    const rating = {
      value: rate,
    }
    const res = await fetch(
      `${this.apiBase}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(rating),
      }
    )

    if (!res.ok) {
      throw new Error(`Could not rate movie with ${movieId} id, received ${res.status}`)
    }
    const body = await res.json()
    return body
  }
}
