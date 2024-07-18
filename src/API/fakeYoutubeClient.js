import axios from 'axios'

export default class FakeYoutubeClient {
	async search() {
		return axios
			.get('/videos/search.json')
	}

	async videos() {
		return axios
			.get('/videos/popular.json')
	}

	async channel() {
		return axios
			.get('/videos/channel.json')
	}

	async commentThreads() {
		return axios
			.get('/videos/comment.json')
	}

	async relatedVideo() {
		return axios
			.get('/videos/relatedVideo.json')
	}

	async videoInfo() {
		return axios
			.get('/videos/videoInfo.json')
	}
}