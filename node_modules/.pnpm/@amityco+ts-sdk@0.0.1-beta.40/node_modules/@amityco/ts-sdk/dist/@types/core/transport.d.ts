import { ASCError } from '~/core/errors';
export {};
declare global {
    namespace Amity {
        type SuccessResponse<T> = {
            status: 'success';
            data: T;
        };
        type FailResponse = {
            status: 'fail';
            code: Amity.ServerError;
        };
        type ErrorResponse = {
            status: 'error';
            message: string;
            code: Amity.ServerError;
        };
        type Response<T> = SuccessResponse<T> | FailResponse | ErrorResponse;
        type Token = string;
        type Pagination = {
            paging: {
                previous?: Token;
                next?: Token;
            };
        };
        type MqttClient = {
            connect: (params: {
                accessToken: string;
                userId: string;
            }) => Promise<void>;
            disconnect: () => Promise<void>;
            get connected(): boolean;
            on: <T extends keyof Amity.MqttEvents>(event: T, handler: (payload: Amity.MqttEvents[T]) => void) => void;
            once: <T extends keyof Amity.MqttEvents>(event: T, handler: (payload: Amity.MqttEvents[T]) => void) => void;
            off: <T extends keyof Amity.MqttEvents>(event: T, handler?: (payload: Amity.MqttEvents[T]) => void) => void;
            removeAllListeners: () => void;
            subscribe: (topic: string, callback?: Amity.Listener<ASCError | void>) => Amity.Unsubscriber;
            unsubscribe: (topic: string) => void;
        };
    }
}
//# sourceMappingURL=transport.d.ts.map