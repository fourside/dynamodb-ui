import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { MoreHoriz } from "@material-ui/icons";

interface Props {
  text :string
}

export const AbbreviationTooltip = ({ text } :Props) => {

  return (
    <Tooltip title={text}>
      <MoreHoriz />
    </Tooltip>
  );
};

