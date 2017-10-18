import { MenuItem } from "./MenuItem";

export interface IMenuProvider {

    getAllItems(): Promise<MenuItem[]>;
}