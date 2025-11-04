import Redis from 'ioredis';

export class RedisSubscriber {
	private client: Redis;

	constructor(host?: string, port?: string | number) {
		this.client = new Redis({
			host: host ?? '127.0.0.1',
			port: Number(port ?? 6379),
		});
	}

	async listen(channel: string) {
		await this.client.subscribe(channel);
		console.log(`Подписан на канал Redis: ${channel}`);

		this.client.on('message', (chan, message) => {
			console.log(`📨 [${chan}] ${message}`);
		});
	}
}
