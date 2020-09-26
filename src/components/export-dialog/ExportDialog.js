import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function ExportDialog(props) {
    const useStyles = makeStyles(theme => ({
        container: {
            padding: theme.spacing(2)
        },
        data: {
            margin: theme.spacing(1)
        }
    }))
    const classes = useStyles()
    const [data, setData] = useState(props.data || '')
    useEffect(() => setData(props.data || ''), [props.data])
    return (
        <React.Fragment>
            <Dialog open={props.open} fullWidth={true} maxWidth={'md'}>
                <DialogContent>
                    <Grid
                        className={classes.container}
                        container
                        direction="column">
                        <TextField
                            className={classes.data}
                            label={props.title}
                            variant="outlined"
                            value={data}
                            multiline
                            rows={8}
                            rowsMax={16}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onNegativeButtonClicked}>
                        {'Close'}
                    </Button>
                    <CopyToClipboard text={props.export}>
                        <Button
                            variant="contained"
                            onClick={props.onPositiveButtonClicked}
                            color="primary">
                            {'Copy'}
                        </Button>
                    </CopyToClipboard>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

ExportDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    data: PropTypes.string,
    onPositiveButtonClicked: PropTypes.func,
    onNegativeButtonClicked: PropTypes.func
}
