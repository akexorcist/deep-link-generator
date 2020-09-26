import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { Card, Grid, IconButton, Typography, Box } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function LinkCard(props) {
    const useStyles = makeStyles(theme => ({
        link: {
            padding: theme.spacing(1),
            display: 'grid'
        },
        card: {
            padding: theme.spacing(3)
        },
        name: {
            wordBreak: 'break-word'
        },
        url: {
            wordBreak: 'break-all'
        },
        tag: {
            marginTop: theme.spacing(2),
            backgroundColor: props.link.tag,
            width: theme.spacing(5),
            height: theme.spacing(0.5)
        }
    }))
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid
                className={classes.link}
                key={props.link.name}
                item
                xl={3}
                lg={4}
                md={6}
                xs={12}>
                <Card className={classes.card}>
                    <Grid container direction="column">
                        <Grid
                            justify="flex-end"
                            container
                            alignItems="center"
                            direction="row">
                            <div className={classes.tag} />
                            <Box flexGrow={1} />
                            <IconButton
                                onClick={() =>
                                    props.onDeleteLinkClicked(props.link)
                                }>
                                <DeleteOutlineIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    props.onEditLinkClicked(props.link)
                                }}>
                                <EditOutlinedIcon />
                            </IconButton>
                            <CopyToClipboard text={props.link.url}>
                                <IconButton
                                    onClick={() =>
                                        props.onCopyToClipboardClicked(
                                            props.link
                                        )
                                    }>
                                    <FileCopyOutlinedIcon />
                                </IconButton>
                            </CopyToClipboard>
                            <a
                                href={props.link.url}
                                target={'_blank'}
                                rel="noopener noreferrer">
                                <IconButton>
                                    <LaunchIcon />
                                </IconButton>
                            </a>
                        </Grid>
                        <Typography
                            className={classes.name}
                            variant="subtitle1"
                            component="h6">
                            <b>{props.link.name}</b>
                        </Typography>
                        <Typography
                            className={classes.url}
                            variant="body2"
                            component="p">
                            {props.link.url}
                        </Typography>
                    </Grid>
                </Card>
            </Grid>
        </React.Fragment>
    )
}

LinkCard.propTypes = {
    link: PropTypes.object,
    onEditLinkClicked: PropTypes.func,
    onDeleteLinkClicked: PropTypes.func,
    onCopyToClipboardClicked: PropTypes.func
}
