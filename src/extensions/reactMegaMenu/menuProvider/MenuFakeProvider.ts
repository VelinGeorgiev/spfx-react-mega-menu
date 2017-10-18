import { IMenuProvider, MenuItem } from "./index";

export class MenuFakeProvider implements IMenuProvider {

    public getAllItems(): Promise<MenuItem[]> {
        return new Promise<MenuItem[]>((resolve, reject) => {

            let result: MenuItem[] = [
                {id: 1, category: "Cat1", name: "Item1", url: "url1" },
                {id: 2, category: "Cat1", name: "Item2", url: "url1" },
                {id: 3, category: "Cat1", name: "Item3", url: "url1" },
                {id: 4, category: "Cat2", name: "Item1", url: "url1" },
                {id: 5, category: "Cat2", name: "Item2", url: "url1" }
            ];

            resolve(result);
        });
    }
}