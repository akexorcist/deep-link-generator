import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { Grid } from '@material-ui/core'
import LinkCard from '../item/LinkCard'
import AddNewLinkCard from '../add/AddNewLinkCard'

export default function LinkGroup(props) {
    const useStyles = makeStyles(theme => ({
        container: {
            padding: theme.spacing(1)
        }
    }))
    const sortById = (a, b) => {
        if (a.id < b.id) {
            return 1
        } else if (a.id > b.id) {
            return -1
        } else {
            return 0
        }
    }
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid className={classes.container} container>
                {props.data.sort(sortById).map(link => {
                    return (
                        <LinkCard
                            key={link.id}
                            link={link}
                            onEditLinkClicked={props.onEditLinkClicked}
                            onDeleteLinkClicked={props.onDeleteLinkClicked}
                            onCopyToClipboardClicked={
                                props.onCopyToClipboardClicked
                            }
                        />
                    )
                })}
                <AddNewLinkCard onClicked={props.onAddNewLinkClicked} />
            </Grid>
        </React.Fragment>
    )
}

LinkGroup.propTypes = {
    data: PropTypes.array,
    onAddNewLinkClicked: PropTypes.func,
    onEditLinkClicked: PropTypes.func,
    onDeleteLinkClicked: PropTypes.func,
    onCopyToClipboardClicked: PropTypes.func
}
