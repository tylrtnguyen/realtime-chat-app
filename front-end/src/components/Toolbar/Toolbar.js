import React from 'react'
import Typography from '@material-ui/core/Typography'
import './Toolbar.css'

export default function Toolbar(props) {
    const { title, leftItems, rightItems } = props;
    return (
      <div className="toolbar">
        <div className="left-items">{ leftItems }</div>
        <Typography variant="h5" className="toolbar-title">{title}</Typography>
        <div className="right-items">{ rightItems }</div>
      </div>
    );
}