export const Branch = {
	PROGRAMMING: 'PG',
	CONTENT: 'CT',
	MARKETING: 'MK',
	DESIGN: 'DS'
} as const;
export type Branch = (typeof Branch)[keyof typeof Branch];
