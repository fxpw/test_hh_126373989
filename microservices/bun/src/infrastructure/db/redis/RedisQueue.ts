import Redis from 'ioredis';

export class RedisQueue {
	private client: Redis;

	constructor(host?: string, port?: string | number) {
		this.client = new Redis({
			host: host ?? '127.0.0.1',
			port: Number(port ?? 6379)
		});
	}

	async publish(channel: string, message: string): Promise<void> {
		console.log(`📨 Redis event [${channel}] → ${message}`);
		await this.client.publish(channel, message);
	}
}
