const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search"

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    maxResults: 2,
    q: query,
    relevanceLanguage: "de",
    key: process.env?.NEXT_PUBLIC_YOUTUBE_API_KEY
  }
}
