import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { List } from "office-ui-fabric-react/lib/List";

import { Log } from "@microsoft/sp-core-library";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IMegaMenuProps } from "./IMegaMenuProps";
import { IMegaMenuState } from "./IMegaMenuState";
import { MenuItem } from "../menuProvider/index";
import styles from "./MegaMenuComponent.module.scss";

const STORAGE_KEY: string = "ReactMegaMenuApplicationCustomizer";
const LOG_SOURCE: string = "ReactMegaMenuApplicationCustomizer_MegaMenuComponent";


export default class MegaMenuComponent extends React.Component<IMegaMenuProps, IMegaMenuState> {

  constructor(props: IMegaMenuProps) {
    super(props);

    this.state = {
      showPanel: true,
      menuItems: []
    };

    // log.error(LOG_SOURCE, new Error(`Error loading announcements: ${error}`));
  }

  public componentDidMount(): void {

    this.props.menuProvider.getAllItems().then((result: MenuItem[]) => {

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
          type={PanelType.smallFluid}
          onDismiss={this.hideMenu.bind(this)}
          headerText="SPFx React Mega Menu"
        >
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col">
          {
            this.state.menuItems.map((item: MenuItem) => {
              return <span className={styles.menuItem}>{item.name} | </span>;
            })
          }
          </div>
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