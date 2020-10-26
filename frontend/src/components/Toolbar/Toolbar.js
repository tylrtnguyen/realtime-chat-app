import React from 'react'
import Typography from '@material-ui/core/Typography'
import './Toolbar.css'
import { StyledButton } from './UseStyles'

const Toolbar = (props) => {
    const { title, leftItems, rightItems } = props;
    return (
      <div className="toolbar">
        <div className="left-items">{ leftItems }</div>
        <StyledButton><Typography variant="h5" className="toolbar-title">{title}</Typography></StyledButton>
        <div className="right-items">{ rightItems }</div>
      </div>
    );
}

export default Toolbar;