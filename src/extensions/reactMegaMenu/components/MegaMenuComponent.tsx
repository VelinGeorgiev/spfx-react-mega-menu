import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";

import { Log } from "@microsoft/sp-core-library";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IMegaMenuProps } from "./IMegaMenuProps";
import { IMegaMenuState } from "./IMegaMenuState";

const STORAGE_KEY: string = "ReactMegaMenuApplicationCustomizer";
const LOG_SOURCE: string = "ReactMegaMenuApplicationCustomizer_MegaMenuComponent";

export default class MegaMenuComponent extends React.Component<IMegaMenuProps, IMegaMenuState> {

  constructor(props: IMegaMenuProps) {
    super(props);

    this.state = { showPanel: false };

    // log.error(LOG_SOURCE, new Error(`Error loading announcements: ${error}`));
  }

  public render(): React.ReactElement<IMegaMenuProps> {
    return (
        <div>
            <DefaultButton
             iconProps={ { iconName: "Emoji2" } }
             title="Emoji"
             ariaLabel="Emoji"
             onClick={ this.showMenu.bind(this) }
            />

            <Panel isOpen={ this.state.showPanel }
              type={ PanelType.smallFluid }
              onDismiss={ this.hideMenu.bind(this)  }
              headerText="SPFx React Mega Menu"
            >
              <span>Content goes here.</span>
            </Panel>
        </div>
    );
  }

  public showMenu(): void {

    this.setState({ showPanel: true });
  }

  public hideMenu(): void {

    this.setState({ showPanel: false });
  }
}