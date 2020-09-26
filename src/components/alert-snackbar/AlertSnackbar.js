import React from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function AlertSnackbar(props) {
    return (
        <React.Fragment>
            <Snackbar
                open={props.open}
                autoHideDuration={2000}
                onClose={props.onClose}
                message={props.message}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={props.onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </React.Fragment>
    )
}

AlertSnackbar.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string,
    onClose: PropTypes.func
}
