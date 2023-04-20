import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item": !props.selected
  });

  const imageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": props.selected,
    "interviewers__item-image": !props.selected
  });

  return (
    <li
      className={interviewerListItemClass}
      selected={props.selected}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className={imageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}