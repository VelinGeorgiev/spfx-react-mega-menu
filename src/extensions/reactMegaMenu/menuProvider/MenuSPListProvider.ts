import { IMenuProvider, MenuCategory } from "./index";
import { Log } from "@microsoft/sp-core-library";
import { Web, ListEnsureResult, Item } from "sp-pnp-js";
import { MenuItem } from "./MenuItem";

const LOG_SOURCE: string = "ReactMegaMenuApplicationCustomizer_MenuSPListProvider";

/**
 * Mega Menu items SharePoint list provider.
 * Gets data from SharePoint list to populate the mega menu.
 * Caches that data in browser session storage to speed up
 * the menu load.
 */
export class MenuSPListProvider implements IMenuProvider {

    /**
     * Web absolute url so we can call pnp-js and get the menu list items.
     */
    private readonly _webAbsoluteUrl: string;

    /**
     * Browser session storage unique key.
     */
    private readonly _sessionStorageKey: string = "MegaMenuFormattedList";

    constructor(webAbsoluteUrl: string) {

        this._webAbsoluteUrl = webAbsoluteUrl;
    }

    /**
     * Gets all items from SharePoint list and stores the formatted
     * mega menu list in the sessionStorage for quick access.
     */
    public getAllItems(): Promise<MenuCategory[]> {
        return new Promise<MenuCategory[]>((resolve, reject) => {

            let result: MenuCategory[] = [];

            // get the list items from the session storage if available.
            let stringResult: string = window.sessionStorage.getItem(this._sessionStorageKey);

            if (stringResult) {

                result = JSON.parse(stringResult);

            } else {

                // session storage is empty so call the SharePoint list
                // and store to session storage for quick access.

                let web: Web = new Web(this._webAbsoluteUrl);

                web.lists.ensure("Mega Menu List")
                    .then((listResult: ListEnsureResult) => {

                        listResult.list.items
                            .select("ID", "MegaMenuCategory", "MegaMenuItemName", "MegaMenuItemUrl")
                            .get()
                            .then((items: Item[]) => {

                                result = this._map(items);

                                // cache for the session for quick access.
                                let jsonToString: string = JSON.stringify(result);
                                window.sessionStorage.setItem(this._sessionStorageKey, jsonToString);
                            })
                            .catch(error => {

                                Log.error(LOG_SOURCE, error);

                                reject(error);
                            });
                    })
                    .catch(error => {

                        Log.error(LOG_SOURCE, new Error("Mega Menu List does not exits."));

                        reject(error);
                    });
            }


            resolve(result);
        });
    }

    // tslint:disable:no-string-literal
    private _map(items: Item[], ): MenuCategory[] {

        let result: MenuCategory[] = [];

        for (let i: number = 0; i < items.length; i++) {

            let item: Item = items[i];

            let menuItem: MenuItem = {
                id: item["ID"],
                name: item["MegaMenuItemName"],
                url: item["MegaMenuItemUrl"]
            };

            let categories: MenuCategory[] = result.filter(x => x.category === item["MegaMenuCategory"]);

            if (categories.length) {
                categories[0].items.push(menuItem);
            } else {
                result.push({ category: item["MegaMenuCategory"], items: [menuItem] } as MenuCategory);
            }
        }

        return result;
    }
}