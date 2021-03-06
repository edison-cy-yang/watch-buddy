import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Header from '../components/Header';

storiesOf("Header", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Header Logged in", () => <Header auth={{name: 'Edison'}}/>)
  .add("Header not logged in", () => <Header auth={null}/>);