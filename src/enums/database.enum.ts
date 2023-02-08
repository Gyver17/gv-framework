export enum TypeErrorDatabase {
	UNIQUE = 'UNIQUE_VIOLATION',
	FOREIGN_KEY = 'FOREIGN_KEY_VIOLATION',
}

export enum MessageErrorDatabase {
	UNIQUE = 'Duplicate key value violates unique constraint',
	FOREIGN_KEY = 'Insert or update violates foreign key constraint',
}
