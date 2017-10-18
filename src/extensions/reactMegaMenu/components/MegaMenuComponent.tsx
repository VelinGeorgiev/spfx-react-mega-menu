import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  IconButton
} from "office-ui-fabric-react";

import { Log } from "@microsoft/sp-core-library";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IMegaMenuProps } from "./IMegaMenuProps";
import { IMegaMenuState } from "./IMegaMenuState";

const STORAGE_KEY: string = "ReactMegaMenuApplicationCustomizer";
const LOG_SOURCE: string = "ReactMegaMenuApplicationCustomizer_MegaMenuComponent";

export default class MegaMenuComponent extends React.Component<IMegaMenuProps, IMegaMenuState> {

  constructor(props: IMegaMenuProps) {
    super(props);

    this.state = {};

    // log.error(LOG_SOURCE, new Error(`Error loading announcements: ${error}`));
  }

  public render(): React.ReactElement<IMegaMenuProps> {
    return (
        <div className="ms-Grid">
            <IconButton iconProps={ { iconName: "Home" } } />
        </div>
    );
  }
}