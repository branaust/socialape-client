import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

const ToolTipButton = ({ children, onClick, tip, btnClassName, tipClassName, placement }) => (
    <Tooltip title={tip} className={tipClassName} placement={placement}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)

export default ToolTipButton