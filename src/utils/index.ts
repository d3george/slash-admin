import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function nonNullable<T = unknown>(value: T): value is NonNullable<T> {
	return value !== null && value !== undefined;
}
