import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { FetchResult } from "../link/core/index.js";
import type { DefaultContext, MutationQueryReducersMap, OperationVariables, MutationUpdaterFunction, OnQueryUpdated, InternalRefetchQueriesInclude } from "./types.js";
import type { ApolloCache } from "../cache/index.js";
import type { ObservableQuery } from "./ObservableQuery.js";
export type FetchPolicy = "cache-first" | "network-only" | "cache-only" | "no-cache" | "standby";
export type WatchQueryFetchPolicy = FetchPolicy | "cache-and-network";
export type MutationFetchPolicy = Extract<FetchPolicy, "network-only" | "no-cache">;
export type RefetchWritePolicy = "merge" | "overwrite";
export type ErrorPolicy = "none" | "ignore" | "all";
export interface QueryOptions<TVariables = OperationVariables, TData = any> {
    query: DocumentNode | TypedDocumentNode<TData, TVariables>;
    variables?: TVariables;
    errorPolicy?: ErrorPolicy;
    context?: DefaultContext;
    fetchPolicy?: FetchPolicy;
    pollInterval?: number;
    notifyOnNetworkStatusChange?: boolean;
    returnPartialData?: boolean;
    partialRefetch?: boolean;
    canonizeResults?: boolean;
}
export interface WatchQueryOptions<TVariables extends OperationVariables = OperationVariables, TData = any> extends Omit<QueryOptions<TVariables, TData>, "fetchPolicy"> {
    fetchPolicy?: WatchQueryFetchPolicy;
    nextFetchPolicy?: WatchQueryFetchPolicy | ((this: WatchQueryOptions<TVariables, TData>, currentFetchPolicy: WatchQueryFetchPolicy, context: NextFetchPolicyContext<TData, TVariables>) => WatchQueryFetchPolicy);
    initialFetchPolicy?: WatchQueryFetchPolicy;
    refetchWritePolicy?: RefetchWritePolicy;
}
export interface NextFetchPolicyContext<TData, TVariables extends OperationVariables> {
    reason: "after-fetch" | "variables-changed";
    observable: ObservableQuery<TData, TVariables>;
    options: WatchQueryOptions<TVariables, TData>;
    initialFetchPolicy: WatchQueryFetchPolicy;
}
export interface FetchMoreQueryOptions<TVariables, TData = any> {
    query?: DocumentNode | TypedDocumentNode<TData, TVariables>;
    variables?: Partial<TVariables>;
    context?: DefaultContext;
}
export type UpdateQueryFn<TData = any, TSubscriptionVariables = OperationVariables, TSubscriptionData = TData> = (previousQueryResult: TData, options: {
    subscriptionData: {
        data: TSubscriptionData;
    };
    variables?: TSubscriptionVariables;
}) => TData;
export type SubscribeToMoreOptions<TData = any, TSubscriptionVariables = OperationVariables, TSubscriptionData = TData> = {
    document: DocumentNode | TypedDocumentNode<TSubscriptionData, TSubscriptionVariables>;
    variables?: TSubscriptionVariables;
    updateQuery?: UpdateQueryFn<TData, TSubscriptionVariables, TSubscriptionData>;
    onError?: (error: Error) => void;
    context?: DefaultContext;
};
export interface SubscriptionOptions<TVariables = OperationVariables, TData = any> {
    query: DocumentNode | TypedDocumentNode<TData, TVariables>;
    variables?: TVariables;
    fetchPolicy?: FetchPolicy;
    errorPolicy?: ErrorPolicy;
    context?: DefaultContext;
}
export interface MutationBaseOptions<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> {
    optimisticResponse?: TData | ((vars: TVariables) => TData);
    updateQueries?: MutationQueryReducersMap<TData>;
    refetchQueries?: ((result: FetchResult<TData>) => InternalRefetchQueriesInclude) | InternalRefetchQueriesInclude;
    awaitRefetchQueries?: boolean;
    update?: MutationUpdaterFunction<TData, TVariables, TContext, TCache>;
    onQueryUpdated?: OnQueryUpdated<any>;
    errorPolicy?: ErrorPolicy;
    variables?: TVariables;
    context?: TContext;
}
export interface MutationOptions<TData = any, TVariables = OperationVariables, TContext = DefaultContext, TCache extends ApolloCache<any> = ApolloCache<any>> extends MutationBaseOptions<TData, TVariables, TContext, TCache> {
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>;
    fetchPolicy?: MutationFetchPolicy;
    keepRootFields?: boolean;
}
//# sourceMappingURL=watchQueryOptions.d.ts.map