import React from "react";

import TableCell from '@material-ui/core/TableCell';
import { AbbreviationTooltip } from "./AbbreviationTooltip";
import { CheckCircle, OpenInNew } from '@material-ui/icons';

const MAX_LENGTH = 40;
const HREF_PATTERN = /^https?:\/\//;

interface Props {
  field :string
  item :any
  handleClickShowItem :(event :React.MouseEvent, item :any) => void
  isDetail :boolean
}

export const ConditionalTableCell :React.FC<Props> = ({ field, item, handleClickShowItem, isDetail }) => {

  const value = item[field];
  if (!value) {
    return <TableCell />;
  }

  const type = typeof value;

  if (type === "object") {
    if (Array.isArray(value)) {
      return (
        <TableCell align="center">
          {value.map(v => (
            <NewWindowAnchor href={v} key={v} />
          ))}
        </TableCell>
      )
    } else {
      return <TableCell />;
    }
  }

  if (!isDetail && (type === "number" || type === "bigint")) {
    return (
      <TableCell align="right">
        {value}
      </TableCell>
    );
  }

  if (type === "boolean") {
    if (value) {
      return (
        <TableCell align="center">
          <CheckCircle />
        </TableCell>
      );
    }
    return <TableCell />;
  }

  if (HREF_PATTERN.test(value)) {
    return (
      <TableCell align="center">
        <NewWindowAnchor href={value} />
      </TableCell>
    )
  }

  const ShowRowAnchor :React.FC<{ id :string }> = ({ id }) => {
    return (
      <a href="#!" onClick={(event) => handleClickShowItem(event, item)}>
        {id}
      </a>
    );
  };

  if (!isDetail && field === "id") {
    return (
      <TableCell>
        <ShowRowAnchor id={value} />
      </TableCell>
    );

  }

  if (!isDetail && value.length > MAX_LENGTH) {
    return (
      <TableCell>
        {value.slice(0, MAX_LENGTH)}
        <AbbreviationTooltip text={value} />
      </TableCell>
    );
  }

  return (
    <TableCell>
      {value}
    </TableCell>
  );

};

const NewWindowAnchor :React.FC<{ href :string }> = ({ href }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <OpenInNew />
    </a>
  )
};
