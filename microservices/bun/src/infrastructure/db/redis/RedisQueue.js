import Redis from 'ioredis';
export class RedisQueue {
	constructor(host, port) {
		this.client = new Redis({ host, port });
	}
	async publish(channel, message) {
		console.log(`📨 Redis event [${channel}] → ${message}`);
		await this.client.publish(channel, message);
	}
}
