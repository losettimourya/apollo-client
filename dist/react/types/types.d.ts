import type { ReactNode } from "react";
import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { Observable, ObservableSubscription } from "../../utilities/index.js";
import type { FetchResult } from "../../link/core/index.js";
import type { ApolloError } from "../../errors/index.js";
import type { ApolloCache, ApolloClient, DefaultContext, FetchPolicy, MutationOptions, NetworkStatus, ObservableQuery, OperationVariables, InternalRefetchQueriesInclude, WatchQueryOptions, WatchQueryFetchPolicy } from "../../core/index.js";
export type { QueryReference } from "../cache/QueryReference.js";
export type { DefaultContext as Context } from "../../core/index.js";
export type CommonOptions<TOptions> = TOptions & {
    client?: ApolloClient<object>;
};
export interface BaseQueryOptions<TVariables extends OperationVariables = OperationVariables> extends Omit<WatchQueryOptions<TVariables>, "query"> {
    ssr?: boolean;
    client?: ApolloClient<any>;
    context?: DefaultContext;
}
export interface QueryFunctionOptions<TData = any, TVariables extends OperationVariables = OperationVariables> extends BaseQueryOptions<TVariables> {
    skip?: boolean;
    onCompleted?: (data: TData) => void;
    onError?: (error: ApolloError) => void;
    defaultOptions?: Partial<WatchQueryOptions<TVariables, TData>>;
}
export type ObservableQueryFields<TData, TVariables extends OperationVariables> = Pick<ObservableQuery<TData, TVariables>, "startPolling" | "stopPolling" | "subscribeToMore" | "updateQuery" | "refetch" | "reobserve" | "variables" | "fetchMore">;
export interface QueryResult<TData = any, TVariables extends OperationVariables = OperationVariables> extends ObservableQueryFields<TData, TVariables> {
    client: ApolloClient<any>;
    observable: ObservableQuery<TData, TVariables>;
    data: TData | undefined;
    previousData?: TData;
    error?: ApolloError;
    loading: boolean;
    networkStatus: NetworkStatus;
    called: boolean;
}
export interface QueryDataOptions<TData = any, TVariables extends OperationVariables = OperationVariables> extends QueryFunctionOptions<TData, TVariables> {
    children?: (result: QueryResult<TData, TVariables>) => ReactNode;
    query: DocumentNode | TypedDocumentNode<TData, TVariables>;
}
export interface QueryHookOptions<TData = any, TVariables extends OperationVariables = OperationVariables> extends QueryFunctionOptions<TData, TVariables> {
}
export interface LazyQueryHookOptions<TData = any, TVariables extends OperationVariables = OperationVariables> extends Omit<QueryHookOptions<TData, TVariables>, "skip"> {
}
export interface LazyQueryHookExecOptions<TData = any, TVariables extends OperationVariables = OperationVariables> extends LazyQueryHookOptions<TData, TVariables> {
    query?: DocumentNode | TypedDocumentNode<TData, TVariables>;
}
export type SuspenseQueryHookFetchPolicy = Extract<WatchQueryFetchPolicy, "cache-first" | "network-only" | "no-cache" | "cache-and-network">;
export interface SuspenseQueryHookOptions<TData = unknown, TVariables extends OperationVariables = OperationVariables> extends Pick<QueryHookOptions<TData, TVariables>, "client" | "variables" | "errorPolicy" | "context" | "canonizeResults" | "returnPartialData" | "refetchWritePolicy"> {
    fetchPolicy?: SuspenseQueryHookFetchPolicy;
    queryKey?: string | number | any[];
    skip?: boolean;
}
export type BackgroundQueryHookFetchPolicy = Extract<WatchQueryFetchPolicy, "cache-first" | "network-only" | "no-cache" | "cache-and-network">;
export interface BackgroundQueryHookOptions<TData = unknown, TVariables extends OperationVariables = OperationVariables> extends Pick<QueryHookOptions<TData, TVariables>, "client" | "variables" | "errorPolicy" | "context" | "canonizeResults" | "returnPartialData" | "refetchWritePolicy"> {
    fetchPolicy?: BackgroundQueryHookFetchPolicy;
    queryKey?: string | number | any[];
    skip?: boolean;
}
export interface QueryLazyOptions<TVariables> {
    variables?: TVariables;
    context?: DefaultContext;
}
export type LazyQueryResult<TData, TVariables extends OperationVariables> = QueryResult<TData, TVariables>;
export type QueryTuple<TData, TVariables extends OperationVariables> = LazyQueryResultTuple<TData, TVariables>;
export type LazyQueryExecFunction<TData, TVariables extends OperationVariables> = (options?: Partial<LazyQueryHookExecOptions<TData, TVariables>>) => Promise<QueryResult<TData, TVariables>>;
export type LazyQueryResultTuple<TData, TVariables extends OperationVariables> = [LazyQueryExecFunction<TData, TVariables>, QueryResult<TData, TVariables>];
export type RefetchQueriesFunction = (...args: any[]) => InternalRefetchQueriesInclude;
export interface BaseMutationOptions<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> extends Omit<MutationOptions<TData, TVariables, TContext, TCache>, "mutation"> {
    client?: ApolloClient<object>;
    notifyOnNetworkStatusChange?: boolean;
    onCompleted?: (data: TData, clientOptions?: BaseMutationOptions) => void;
    onError?: (error: ApolloError, clientOptions?: BaseMutationOptions) => void;
    ignoreResults?: boolean;
}
export interface MutationFunctionOptions<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> extends BaseMutationOptions<TData, TVariables, TContext, TCache> {
    mutation?: DocumentNode | TypedDocumentNode<TData, TVariables>;
}
export interface MutationResult<TData = any> {
    data?: TData | null;
    error?: ApolloError;
    loading: boolean;
    called: boolean;
    client: ApolloClient<object>;
    reset(): void;
}
export declare type MutationFunction<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> = (options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>) => Promise<FetchResult<TData>>;
export interface MutationHookOptions<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> extends BaseMutationOptions<TData, TVariables, TContext, TCache> {
}
export interface MutationDataOptions<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> extends BaseMutationOptions<TData, TVariables, TContext, TCache> {
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>;
}
export type MutationTuple<TData, TVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> = [
    (options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>) => Promise<FetchResult<TData>>,
    MutationResult<TData>
];
export interface OnDataOptions<TData = any> {
    client: ApolloClient<object>;
    data: SubscriptionResult<TData>;
}
export interface OnSubscriptionDataOptions<TData = any> {
    client: ApolloClient<object>;
    subscriptionData: SubscriptionResult<TData>;
}
export interface BaseSubscriptionOptions<TData = any, TVariables extends OperationVariables = OperationVariables> {
    variables?: TVariables;
    fetchPolicy?: FetchPolicy;
    shouldResubscribe?: boolean | ((options: BaseSubscriptionOptions<TData, TVariables>) => boolean);
    client?: ApolloClient<object>;
    skip?: boolean;
    context?: DefaultContext;
    onComplete?: () => void;
    onData?: (options: OnDataOptions<TData>) => any;
    onSubscriptionData?: (options: OnSubscriptionDataOptions<TData>) => any;
    onError?: (error: ApolloError) => void;
    onSubscriptionComplete?: () => void;
}
export interface SubscriptionResult<TData = any, TVariables = any> {
    loading: boolean;
    data?: TData;
    error?: ApolloError;
    variables?: TVariables;
}
export interface SubscriptionHookOptions<TData = any, TVariables extends OperationVariables = OperationVariables> extends BaseSubscriptionOptions<TData, TVariables> {
}
export interface SubscriptionDataOptions<TData = any, TVariables extends OperationVariables = OperationVariables> extends BaseSubscriptionOptions<TData, TVariables> {
    subscription: DocumentNode | TypedDocumentNode<TData, TVariables>;
    children?: null | ((result: SubscriptionResult<TData>) => JSX.Element | null);
}
export interface SubscriptionCurrentObservable {
    query?: Observable<any>;
    subscription?: ObservableSubscription;
}
export type NoInfer<T> = [T][T extends any ? 0 : never];
//# sourceMappingURL=types.d.ts.map