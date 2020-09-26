import React from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function ConfirmDialog(props) {
    return (
        <React.Fragment>
            <Dialog open={props.open} fullWidth={true} maxWidth={'xs'}>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{props.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onNegativeButtonClicked}>
                        {props.negativeButton}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={props.onPositiveButtonClicked}
                        color="primary">
                        {props.positiveButton}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

ConfirmDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    positiveButton: PropTypes.string,
    onPositiveButtonClicked: PropTypes.func,
    negativeButton: PropTypes.string,
    onNegativeButtonClicked: PropTypes.func
}
