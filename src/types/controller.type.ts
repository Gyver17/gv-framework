import { ControllerParams } from '../interfaces';

export type Controller = (params: ControllerParams) => void | Promise<void>;
