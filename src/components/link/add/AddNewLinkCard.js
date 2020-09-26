import React from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

export default function AddNewLinkCard(props) {
    const useStyles = makeStyles(theme => ({
        container: {
            opacity: '0.4',
            padding: theme.spacing(1),
            minHeight: theme.spacing(16),
            display: 'grid'
        },
        addButton: {
            opacity: '0.6',
            width: '100%',
            height: '100%'
        }
    }))
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid
                className={classes.container}
                item
                xl={3}
                lg={4}
                md={6}
                xs={12}>
                <Card>
                    <Button
                        title={'Add the new one'}
                        className={classes.addButton}
                        color="default"
                        size={'large'}
                        startIcon={<AddIcon />}
                        onClick={props.onClicked}>
                        {'Add the new one'}
                    </Button>
                </Card>
            </Grid>
        </React.Fragment>
    )
}

AddNewLinkCard.propTypes = {
    onClicked: PropTypes.func
}
