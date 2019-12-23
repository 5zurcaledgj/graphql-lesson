import React from "react";

import MenuItem from "../menu-item/menu-item.component";
import { INITIAL_DATA } from "./initial-data";

import "./directory.styles.scss";

const Directory = () => (
  <div className="directory-menu">
    {INITIAL_DATA.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;
