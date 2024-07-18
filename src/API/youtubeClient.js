import axios from 'axios'

export default class YoutubeClient {
	constructor() {
		this.httpClient = axios.create({
			baseURL: 'https://www.googleapis.com/youtube/v3',
			params: { key: process.env.REACT_APP_YOUTUBE_API_KEY }
		})

	}

	async search(params) {
		return await this.httpClient.get('search', params);
	}

	async videos(params) {
		return await this.httpClient.get('videos', params);
	}

	async channel(params) {
		return await this.httpClient.get('channels', params);
	}

	async commentThreads(params) {
		return await this.httpClient.get('commentThreads', params)
	}

	async relatedVideo(params) {
		return await this.httpClient.get('search', params)
	}

	async videoInfo(params) {
		return await this.httpClient.get('videos', params)
	}
}