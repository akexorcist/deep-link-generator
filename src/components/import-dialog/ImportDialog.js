import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

export default function ImportDialog(props) {
    const useStyles = makeStyles(theme => ({
        description: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3)
        },
        descriptionIcon: {
            marginRight: theme.spacing(1)
        },
        descriptionText: {},
        container: {
            padding: theme.spacing(2)
        },
        data: {
            margin: theme.spacing(1)
        }
    }))
    const classes = useStyles()
    const [data, setData] = useState(props.data || '')
    const [isDataValid, setDataValid] = useState(false)

    useEffect(() => onDataChanged(props.data || ''), [props.data])

    const onDataChanged = data => {
        setData(data)
        setDataValid(validateImportData(data))
    }
    const validateImportData = data => {
        try {
            const json = JSON.parse(data)
            if (!Array.isArray(json)) {
                return false
            }
            if (
                json.some(
                    item =>
                        item.id == undefined ||
                        item.name == undefined ||
                        item.url == undefined ||
                        item.tag == undefined ||
                        !/^#([0-9a-f]{6})?$/i.test(item.tag)
                )
            ) {
                return false
            }
            return true
        } catch (e) {
            return false
        }
    }
    const onImportDataClicked = () => {
        localStorage.setItem('links', data)
        props.onPositiveButtonClicked()
    }
    return (
        <React.Fragment>
            <Dialog open={props.open} fullWidth={true} maxWidth={'md'}>
                <DialogContent>
                    <Grid
                        className={classes.description}
                        container
                        direction="row">
                        <ErrorOutlineIcon className={classes.descriptionIcon} />
                        <Typography className={classes.descriptionText}>
                            {
                                'To import the data, existing data will be replaced with the new one.'
                            }
                        </Typography>
                    </Grid>
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
                            error={!isDataValid}
                            helperText="Invalid JSON Data"
                            onChange={event =>
                                onDataChanged(event.target.value)
                            }
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onNegativeButtonClicked}>
                        {'Close'}
                    </Button>
                    <Button
                        disabled={!isDataValid}
                        variant="contained"
                        onClick={onImportDataClicked}
                        color="primary">
                        {'Import'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

ImportDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    data: PropTypes.string,
    onPositiveButtonClicked: PropTypes.func,
    onNegativeButtonClicked: PropTypes.func
}
