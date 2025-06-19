import type { ResultStuts } from "./enum";

export interface Result<T = unknown> {
	status: ResultStuts;
	message: string;
	data: T;
}
