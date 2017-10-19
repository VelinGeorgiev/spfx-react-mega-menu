import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";

import { IMegaMenuProps } from "./IMegaMenuProps";
import { IMegaMenuState } from "./IMegaMenuState";
import { MenuCategory, MenuItem } from "../menuProvider/index";
import styles from "./MegaMenuComponent.module.scss";

export default class MegaMenuComponent extends React.Component<IMegaMenuProps, IMegaMenuState> {

  constructor(props: IMegaMenuProps) {
    super(props);

    this.state = {
      showPanel: true,
      menuItems: []
    };
  }

  public componentDidMount(): void {

    this.props.menuProvider.getAllItems().then((result: MenuCategory[]) => {

      this.setState((prevState: IMegaMenuState, props: IMegaMenuProps): IMegaMenuState => {
        prevState.menuItems = result;
        return prevState;
      });
    });
  }

  public render(): React.ReactElement<IMegaMenuProps> {
    return (
      <div>
        <DefaultButton
          iconProps={{ iconName: "Emoji2" }}
          title="Emoji"
          ariaLabel="Emoji"
          onClick={this.showMenu.bind(this)}
        />

        <Panel isOpen={this.state.showPanel}
          type={PanelType.smallFluid} headerClassName={styles.topPanel}
          onDismiss={this.hideMenu.bind(this)}
          headerText="SPFx React Mega Menu"
        >
        <div className={styles.grid}>
          <div className={`${styles.row}`}>
          {
            this.state.menuItems.map((menuCategory: MenuCategory) => {
              return <div className={styles.col6}>
                        <div className={`${styles.categoryItem}`}>
                          {menuCategory.category}
                        </div>
                        {menuCategory.items.map((item: MenuItem) => {
                           return <div className={styles.menuItem}>
                              <a href={item.url}>{item.name}</a>
                              </div>;
                        })
                      }
                      </div>;
            })
          }
          </div>
        </div>
        </Panel>
      </div>
    );
  }

  public showMenu(): void {

    this.setState((prevState: IMegaMenuState, props: IMegaMenuProps): IMegaMenuState => {
      prevState.showPanel = true;
      return prevState;
    });
  }

  public hideMenu(): void {

    this.setState((prevState: IMegaMenuState, props: IMegaMenuProps): IMegaMenuState => {
      prevState.showPanel = false;
      return prevState;
    });
  }
}