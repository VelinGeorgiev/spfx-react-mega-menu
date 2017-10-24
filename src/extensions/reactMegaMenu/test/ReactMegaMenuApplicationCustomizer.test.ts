/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from "react";
import { expect } from "chai";
import { mount, ReactWrapper } from "enzyme";

import MegaMenuComponent from "../components/MegaMenuComponent";
import { IMegaMenuState } from "../components/IMegaMenuState";
import { IMegaMenuProps } from "../components/IMegaMenuProps";
import { IMenuProvider, MenuItem, MenuCategory, MenuSPListProvider } from "../menuProvider";

declare const sinon: sinon.SinonStatic;

mocha.timeout(0);

/**
 * Test the initial state i.e. button visible, menu invisible.
 */
describe("ReactMegaMenuApplicationCustomizer menu closed", () => {

  let reactComponent: ReactWrapper<IMegaMenuProps, IMegaMenuState>;
  let menuProviderStub: sinon.SinonStub;
  let componentDidMountSpy: sinon.SinonSpy;
  let fakeMenuData: Promise<MenuCategory[]> = new Promise<MenuCategory[]>((resolve, reject) => {
    resolve([
      {
        category: "Department of Finance",
        items: [
          { id: 1, name: "Economic", url: "https://Economic" },
          { id: 2, name: "Banking", url: "https://Banking" }
        ]
      },
      {
        category: "Department of Education and Skills",
        items: [
          { id: 3, name: "School Holidays", url: "https://Holidays" }
        ]
      }]);
  });

  /**
   * Before mocha hook.
   */
  before(() => {

    // add spy on the did mount event.
    componentDidMountSpy = sinon.spy(MegaMenuComponent.prototype, "componentDidMount");

    // stub the menu provider so we use fake data to test.
    menuProviderStub = sinon.stub(MenuSPListProvider.prototype, "getAllItems").returns(fakeMenuData);

    // mount the react component.
    reactComponent = mount(React.createElement(
      MegaMenuComponent,
      {
        menuProvider: new MenuSPListProvider("http://test.com")
      }
    ));
  });

  after(() => {
    componentDidMountSpy.restore();
    menuProviderStub.restore();
 });

  it("should button be visible", () => {

    let cssSelector: string = "[data-id='menuButton']";

    let menuButton: ReactWrapper<React.AllHTMLAttributes<{}>>;
    menuButton = reactComponent.find(cssSelector);

    expect(menuButton.length).to.be.greaterThan(0);
  });

  it("should panel not be visible", () => {

    let cssSelector: string = "[data-id='menuPanel']";

    let menuButton: ReactWrapper<React.AllHTMLAttributes<{}>>;
    menuButton = reactComponent.find(cssSelector);

    expect(menuButton.length).to.be.equal(0);
  });

  it("should initial state be null", () => {

    expect(reactComponent.state().showPanel).to.be.equal(false);
    expect(reactComponent.state().menuItems.length).to.be.equal(0);
  });

  it("should componentDidMount and menuProvider.getAllItems be called after 50 milisecs", (done) => {
    setTimeout(() => {

      expect(componentDidMountSpy.calledOnce).to.be.equal(true);
      expect(menuProviderStub.calledOnce).to.be.equal(true);

      done();

    }, 50);
  });

  it("should has 2 menuItems in the menuItems state after 50 milisecs", (done) => {
    setTimeout(() => {

      expect(reactComponent.state().showPanel).to.be.equal(false);
      expect(reactComponent.state().menuItems.length).to.be.equal(2);

      done();

    }, 50);
  });
});

describe("ReactMegaMenuApplicationCustomizer menu opened", () => {

  let reactComponent: ReactWrapper<IMegaMenuProps, IMegaMenuState>;
  let menuProviderStub: sinon.SinonStub;
  let fakeMenuData: Promise<MenuCategory[]> = new Promise<MenuCategory[]>((resolve, reject) => {
    resolve([
      {
        category: "Department of Finance",
        items: [
          { id: 1, name: "Economic", url: "https://Economic" },
          { id: 2, name: "Banking", url: "https://Banking" }
        ]
      },
      {
        category: "Department of Education and Skills",
        items: [
          { id: 3, name: "School Holidays", url: "https://Holidays" }
        ]
      }]);
  });

  /**
   * Before mocha hook.
   */
  before((done) => {

    // stub the menu provider so we use fake data to test.
    menuProviderStub = sinon.stub(MenuSPListProvider.prototype, "getAllItems").returns(fakeMenuData);

    // mount the react component.
    reactComponent = mount(React.createElement(
      MegaMenuComponent,
      {
        menuProvider: new MenuSPListProvider("http://test.com")
      }
    ));

    let menuButton: ReactWrapper<React.AllHTMLAttributes<{}>>;
    menuButton = reactComponent.find("[data-id='menuButton']").first();

    menuButton.simulate("click");

    setTimeout(done, 200); // all the menu should be loaded after 200.
  });

  /**
   * At that stage the menu is open so let's verify
   * that some stuff exist on the newly loaded panel
   * with menu categories and items.
   */
  it("should menu be visible after button click", () => {

    let menu: ReactWrapper<React.AllHTMLAttributes<{}>>;
    menu = reactComponent.find("[data-id='menuPanel']").first();

    expect(menu.length).to.be.greaterThan(0);
  });

  it("should showPanel state changed to true", () => {

    expect(reactComponent.state().showPanel).to.be.equal(true);
  });

  it("should has rendered just two menu category elements", () => {
    let menuCategories: ReactWrapper<React.AllHTMLAttributes<{}>>;
    menuCategories = reactComponent.find("[class|='categoryItem']");

    expect(menuCategories.length).to.be.equal(2);
  });

  it("should has rendered just three menu item elements", () => {
    let menuItems: ReactWrapper<React.AllHTMLAttributes<{}>>;
    menuItems = reactComponent.find("[class|='menuItem']");

    expect(menuItems.length).to.be.equal(2);
  });
});