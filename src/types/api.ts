import type { ResultStatus } from "./enum";

export interface Result<T = unknown> {
	status: ResultStatus;
	message: string;
	data: T;
}
