import {getNode, hasNode} from "./node"
import {IType, ITypeChecker} from "./types"

export type IModel = {
    $treenode: any // Actually Node, but that should not be exposed to the public...
} & Object

export interface IFactory<S, T> {
    create(snapshot?: S): T & IModel
    factoryName: string,
    is: ITypeChecker
    isFactory: boolean
    type: IType
}

export function isFactory(value: any): value is IFactory<any, any> {
    return typeof value === "object" && value && value.isFactory === true
}

export function getFactory(object: IModel): IFactory<any, any> {
    return getNode(object).factory
}

export function getChildFactory(object: IModel, child: string): IFactory<any, any> {
    return getNode(object).getChildFactory(child)
}

// TODO: ambigous function name, remove
export function isModel(model: any): model is IModel {
    return hasNode(model)
}
