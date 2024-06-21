import { __assign, __spreadArray } from "tslib";
import { invariant, newInvariantError } from "../globals/index.js";
export function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function (definition) {
        if (definition.kind === "OperationDefinition") {
            throw newInvariantError(
                70,
                definition.operation,
                definition.name ? " named '".concat(definition.name.value, "'") : ""
            );
        }
        if (definition.kind === "FragmentDefinition") {
            fragments.push(definition);
        }
    });
    if (typeof actualFragmentName === "undefined") {
        invariant(fragments.length === 1, 71, fragments.length);
        actualFragmentName = fragments[0].name.value;
    }
    var query = __assign(__assign({}, document), { definitions: __spreadArray([
            {
                kind: "OperationDefinition",
                operation: "query",
                selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                        {
                            kind: "FragmentSpread",
                            name: {
                                kind: "Name",
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ], document.definitions, true) });
    return query;
}
export function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
export function getFragmentFromSelection(selection, fragmentMap) {
    switch (selection.kind) {
        case "InlineFragment":
            return selection;
        case "FragmentSpread": {
            var fragmentName = selection.name.value;
            if (typeof fragmentMap === "function") {
                return fragmentMap(fragmentName);
            }
            var fragment = fragmentMap && fragmentMap[fragmentName];
            invariant(fragment, 72, fragmentName);
            return fragment || null;
        }
        default:
            return null;
    }
}
//# sourceMappingURL=fragments.js.map