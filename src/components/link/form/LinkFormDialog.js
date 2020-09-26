import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TagPicker from '../../tag/picker/TagPicker'
import { grey } from '@material-ui/core/colors'

export default function LinkFormDialog(props) {
    const useStyles = makeStyles(theme => ({
        container: {
            padding: theme.spacing(2)
        },
        input: {
            margin: theme.spacing(1)
        },
        section: {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    }))
    const classes = useStyles()
    const [id, setId] = useState(props.id || '')
    const [name, setName] = useState(props.name || '')
    const [url, setUrl] = useState(props.url || '')
    const [tag, setTag] = useState(props.tag || grey[500])
    useEffect(() => setId(props.id || ''), [props.id])
    useEffect(() => setName(props.name || ''), [props.name])
    useEffect(() => setUrl(props.url || ''), [props.url])
    useEffect(() => setTag(props.tag || grey[500]), [props.tag])

    const onNameChanged = name => {
        setName(name)
    }

    const onUrlChanged = url => {
        setUrl(url)
    }

    const onTagChanged = tag => {
        setTag(tag)
    }
    return (
        <React.Fragment>
            <Dialog open={props.open} fullWidth={true} maxWidth={'xs'}>
                <DialogContent>
                    <Grid
                        className={classes.container}
                        container
                        direction="column">
                        <TextField
                            className={classes.input}
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={event => {
                                onNameChanged(event.target.value)
                            }}
                        />
                        <TextField
                            className={classes.input}
                            label="URL"
                            variant="outlined"
                            value={url}
                            onChange={event => {
                                onUrlChanged(event.target.value)
                            }}
                        />
                        <Typography
                            className={classes.section}
                            variant="subtitle1">
                            <b>{'Tag Color'}</b>
                        </Typography>
                        <TagPicker
                            selectedColor={tag}
                            onChanged={onTagChanged}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onNegativeButtonClicked}>
                        {props.negativeButton}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            props.onPositiveButtonClicked({
                                id: id || Date.now().toString(),
                                name,
                                url,
                                tag
                            })
                        }}
                        color="primary">
                        {props.positiveButton}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

LinkFormDialog.propTypes = {
    open: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    tag: PropTypes.string,
    positiveButton: PropTypes.string,
    onPositiveButtonClicked: PropTypes.func,
    negativeButton: PropTypes.string,
    onNegativeButtonClicked: PropTypes.func
}
