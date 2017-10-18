import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'ReactMegaMenuApplicationCustomizerStrings';

import MegaMenuComponent from './components/MegaMenuComponent';
import { IMegaMenuProps } from './components/IMegaMenuProps';
import Placeholder from '@microsoft/sp-application-base/lib/extensibility/Placeholder';

const LOG_SOURCE: string = 'ReactMegaMenuApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IReactMegaMenuApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ReactMegaMenuApplicationCustomizer
  extends BaseApplicationCustomizer<IReactMegaMenuApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    
    const element: React.ReactElement<IMegaMenuProps> = React.createElement(
      MegaMenuComponent, {}
    );

    console.log("Lets render.");
    console.dir(placeholder.domElement);
    
    ReactDom.render(element, placeholder.domElement);

    return Promise.resolve();
  }
}
