export type MatchPassword = (
	value: string,
	savedValue: string,
) => Promise<void> | void;

export type HashPassword = (value: string) => Promise<string> | string;
