import React, { Fragment } from 'react';
import Link from './Link';

function findCollapsedParent(node) {
  if (!node.data.isExpanded) {
    return node;
  } else if (node.parent) {
    return findCollapsedParent(node.parent);
  } else {
    return null;
  }
}

function Links({ links, stepPercent }) {
  return (
    <Fragment>
      {links.map((link, i) => {
        return (
          <Link
            data={link}
            linkType={'step'}
            layout={'cartesian'}
            orientation={'horizontal'}
            stepPercent={stepPercent}
            stroke="#374469"
            strokeWidth="1"
            fill="red"
            key={i}
          />
        )
      })}
    </Fragment>
  )
}

export default Links;