import { EventEmitter, ValidEventTypes } from '@nimsdk/vendor';
import { Packet } from '../parser';
export declare const BizServicesName: string[];
export declare const InnerServicesName: string[];
export interface V2InternalService<T extends ValidEventTypes = string> {
    name: string;
    onLoginStart(accountId: string): Promise<void>;
    onLoginFinished(accountId: string): Promise<void>;
    onLogout(): void | Promise<void>;
    emit(event: EventEmitter.EventNames<T>, ...args: EventEmitter.EventArgs<T, EventEmitter.EventNames<T>>): boolean;
    process(packet: Packet): Promise<Packet | void>;
}
