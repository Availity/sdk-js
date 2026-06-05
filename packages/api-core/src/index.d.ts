import AvApi from './api';
import AvMicroservice from './ms';

export type { AvApiConfig, AvApiResponse, RequestConfig, PaginatedData } from './api';
export { AvMicroservice };
export default AvApi;

export declare function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: Record<string, unknown>[]): T;
