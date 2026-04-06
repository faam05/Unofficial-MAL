import { ANILIST_URL } from '../configs'

export const fetchAniList = async (query, variables = {}) => {
  const response = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const result = await response.json()
  if (!response.ok) throw new Error(result.errors?.[0]?.message || 'Error fetching data')
  return result.data
}
