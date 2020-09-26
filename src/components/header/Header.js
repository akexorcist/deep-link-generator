import React from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button, TextField, Typography } from '@material-ui/core'

export default function Header(props) {
    const useStyles = makeStyles(theme => ({
        title: {
            marginBottom: theme.spacing(2)
        },
        header: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(1)
        },
        search: {
            width: '100%'
        },
        button: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(2)
        }
    }))
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid className={classes.header} container>
                <Grid item xs={1} />
                <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    item
                    xs={11}>
                    <Typography
                        className={classes.title}
                        variant="h5"
                        gutterBottom>
                        <b>{'Deep Link Generator'}</b>
                    </Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item md={6} sm={10} xs={10}>
                    <TextField
                        className={classes.search}
                        label="Search"
                        variant="outlined"
                        onChange={event =>
                            props.onSearchKeyworkChanged(event.target.value)
                        }
                    />
                </Grid>
                <Grid item sm={'auto'} xs={1} />
                <Grid item md={'auto'} xs={1} />
                <Grid container item md={4} sm={11} xs={10} justify="flex-end">
                    <Button
                        title={'Export to JSON'}
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={props.onExportClicked}>
                        {'Export'}
                    </Button>
                    <Button
                        title={'Import from JSON'}
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={props.onImportClicked}>
                        {'Import'}
                    </Button>
                    <Button
                        title={'Add the new one'}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={props.onAddNewLinkFormClicked}>
                        {'Add'}
                    </Button>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </React.Fragment>
    )
}

Header.propTypes = {
    onSearchKeyworkChanged: PropTypes.func,
    onAddNewLinkFormClicked: PropTypes.func,
    onExportClicked: PropTypes.func,
    onImportClicked: PropTypes.func
}
