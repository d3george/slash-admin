export interface Result<T = unknown> {
	status: number;
	message: string;
	data: T;
}
