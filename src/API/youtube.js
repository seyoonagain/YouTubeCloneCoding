export default class Youtube {
	constructor(apiClient) {
		this.apiClient = apiClient
	}

	async search(keyword) {
		return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
	}

	async #searchByKeyword(keyword) {
		return this.apiClient.search({
			params: {
				part: 'snippet',
				maxResults: 30,
				type: 'video',
				q: keyword,
			}
		})
			.then(res => res.data.items)
			.then(items => items.map(item => ({ ...item, id: item.id.videoId })))
	}

	async #mostPopular() {
		return this.apiClient.videos({
			params: {
				part: 'snippet, statistics',
				chart: 'mostPopular',
				maxResults: 30,
			}
		})
			.then(res => res.data.items)
	}

	async channelInfo(id) {
		return this.apiClient.channel({
			params: {
				part: 'snippet, statistics',
				id,
			}
		})
			.then(res => res.data.items[0])
	}

	async comment(videoId) {
		return this.apiClient.commentThreads({
			params: {
				part: 'snippet',
				videoId,
				maxResults: 50,
			}
		})
			.then(res => res.data.items)
			.then(items => items.map(item => ({ ...item.snippet.topLevelComment.snippet, totalReplyCount: item.snippet.totalReplyCount, id: item.id })))
	}

	async relatedVideo(channelId) {
		return this.apiClient.relatedVideo({
			params: {
				part: 'snippet',
				channelId,
				maxResults: 30,
				type: 'video',
				order: 'viewCount'
			}
		})
			.then(res => res.data.items)
			.then(items => items.map(item => ({ ...item, id: item.id.videoId })))
	}

	async videoInfo(id) {
		return this.apiClient.videoInfo({
			params: {
				part: 'snippet, statistics',
				id: id,
			}
		})
			.then(res => res.data.items[0])
	}
}