export interface Result<T = any> {
	status: number;
	message: string;
	data?: T;
}
