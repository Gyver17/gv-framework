import { ValidateParams } from './validate-params.interface';

export interface BaseValidator<T = any> {
	validate(params: ValidateParams): T | Promise<T>;
}
