export const fetcher = async (url) => {
  const response = await fetch(url)
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
}
