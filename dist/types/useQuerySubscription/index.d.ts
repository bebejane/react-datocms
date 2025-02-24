import { ChannelErrorData, ConnectionStatus, Options } from 'datocms-listen';
export declare type SubscribeToQueryOptions<QueryResult, QueryVariables> = Omit<Options<QueryResult, QueryVariables>, 'onStatusChange' | 'onUpdate' | 'onChannelError'>;
export declare type EnabledQueryListenerOptions<QueryResult, QueryVariables> = {
    /** Whether the subscription has to be performed or not */
    enabled?: true;
    /** The initial data to use while the initial request is being performed */
    initialData?: QueryResult;
} & SubscribeToQueryOptions<QueryResult, QueryVariables>;
export declare type DisabledQueryListenerOptions<QueryResult, QueryVariables> = {
    /** Whether the subscription has to be performed or not */
    enabled: false;
    /** The initial data to use while the initial request is being performed */
    initialData?: QueryResult;
} & Partial<SubscribeToQueryOptions<QueryResult, QueryVariables>>;
export declare type QueryListenerOptions<QueryResult, QueryVariables> = EnabledQueryListenerOptions<QueryResult, QueryVariables> | DisabledQueryListenerOptions<QueryResult, QueryVariables>;
export declare function useQuerySubscription<QueryResult = any, QueryVariables = Record<string, any>>(options: QueryListenerOptions<QueryResult, QueryVariables>): {
    error: ChannelErrorData | null;
    status: ConnectionStatus;
    data: QueryResult | undefined;
};
