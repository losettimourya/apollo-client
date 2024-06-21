import * as React from "react";
import { canUseSymbol } from "../../utilities/index.js";
import { invariant } from "../../utilities/globals/index.js";
var contextKey = canUseSymbol
    ? Symbol.for("__APOLLO_CONTEXT__")
    : "__APOLLO_CONTEXT__";
export function getApolloContext() {
    invariant("createContext" in React, 45);
    var context = React.createContext[contextKey];
    if (!context) {
        Object.defineProperty(React.createContext, contextKey, {
            value: (context = React.createContext({})),
            enumerable: false,
            writable: false,
            configurable: true,
        });
        context.displayName = "ApolloContext";
    }
    return context;
}
export var resetApolloContext = getApolloContext;
//# sourceMappingURL=ApolloContext.js.map