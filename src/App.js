import React, { useState, useEffect } from 'react'
import 'fontsource-roboto'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { teal } from '@material-ui/core/colors'
import Header from './components/header/Header'
import ConfirmDialog from './components/confirm-dialog/ConfirmDialog'
import AlertSnackbar from './components/alert-snackbar/AlertSnackbar'
import LinkGroup from './components/link/group/LinkGroup'
import LinkFormDialog from './components/link/form/LinkFormDialog'
import ExportDialog from './components/export-dialog/ExportDialog'
import ImportDialog from './components/import-dialog/ImportDialog'

export default function App() {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: teal[500]
            }
        }
    })

    const [links, setLinks] = useState(
        JSON.parse(
            localStorage.getItem('links') ||
                JSON.stringify([
                    {
                        id: '1601142258869',
                        name: '[Sample] Facebook Page on Android',
                        url: 'fb://page/577361412281379',
                        tag: '#2196f3'
                    },
                    {
                        id: '1601142258870',
                        name: '[Sample] Facebook Page on iOS',
                        url: 'fb://profile/577361412281379',
                        tag: '#2196f3'
                    }
                ])
        )
    )

    const [searchKeyword, setSearchKeyword] = useState('')

    const [showCopiedToClipboard, setShowCopiedToClipboard] = useState(false)

    const [showConfirmDeleteLink, setShowConfirmDeleteLink] = useState({
        open: false,
        selectedLink: null
    })

    const [showLinkForm, setShowLinkForm] = useState({
        open: false,
        id: null,
        name: null,
        url: null,
        tag: null,
        positiveButton: null,
        negativeButton: null
    })

    const [showExport, setShowExport] = useState({
        open: false,
        title: null,
        data: null,
        positiveButton: null,
        negativeButton: null
    })

    const [showImport, setShowImport] = useState({
        open: false,
        title: null,
        data: null,
        positiveButton: null,
        negativeButton: null
    })

    useEffect(() => {
        localStorage.setItem('links', JSON.stringify(links))
    }, [links])

    const onSearchKeyworkChanged = keyword => {
        setSearchKeyword(keyword)
    }

    const onCopyToClipboardClicked = () => {
        setShowCopiedToClipboard(true)
    }

    const onDismissCopyToClipboardMessage = () => {
        setShowCopiedToClipboard(false)
    }

    const onDeleteLinkClicked = selectedLink => {
        setShowConfirmDeleteLink({
            open: true,
            selectedLink: selectedLink
        })
    }

    const onDeleteLinkConfirmed = selectedLink => {
        setLinks(links.filter(link => link !== selectedLink))
        setShowConfirmDeleteLink({
            open: false,
            selectedLink: null
        })
    }

    const onDeleteLinkCanceled = () => {
        setShowConfirmDeleteLink({
            open: false,
            selectedLink: null
        })
    }

    const onAddNewLinkFormClicked = () => {
        setShowLinkForm({
            open: true,
            id: null,
            name: null,
            url: null,
            tag: null,
            positiveButton: 'Add',
            negativeButton: 'Close'
        })
    }

    const onEditLinkFormClicked = link => {
        setShowLinkForm({
            open: true,
            ...link,
            positiveButton: 'Update',
            negativeButton: 'Close'
        })
    }

    const onUpdateLinkFormClicked = updatedLink => {
        if (links.find(link => link.id === updatedLink.id)) {
            setLinks(
                links.map(link => {
                    if (link.id === updatedLink.id) {
                        return updatedLink
                    } else {
                        return link
                    }
                })
            )
        } else {
            setLinks([...links, updatedLink])
        }
        setShowLinkForm({
            open: false,
            id: '',
            name: '',
            url: '',
            tag: ''
        })
    }

    const onCloseLinkFormClicked = () => {
        setShowLinkForm({
            ...showLinkForm,
            open: false
        })
    }

    const onExportClicked = () => {
        setShowExport({
            open: true,
            title: 'Export Data',
            data: JSON.stringify(links, null, 4) || '[]'
        })
    }

    const onImportClicked = () => {
        setShowImport({
            open: true,
            title: 'Import Data',
            data: ''
        })
    }

    const onCopyExportDataClicked = () => {
        setShowCopiedToClipboard(true)
    }

    const onCloseExportClicked = () => {
        setShowExport({
            open: false,
            title: null,
            json: null
        })
    }

    const onImportDataClicked = () => {
        setLinks(JSON.parse(localStorage.getItem('links') || '[]'))
        setShowImport({
            open: false,
            title: null,
            json: null
        })
    }

    const onCloseImportClicked = () => {
        setShowImport({
            open: false,
            title: null,
            json: null
        })
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <Header
                    onSearchKeyworkChanged={onSearchKeyworkChanged}
                    onAddNewLinkFormClicked={onAddNewLinkFormClicked}
                    onExportClicked={onExportClicked}
                    onImportClicked={onImportClicked}
                />
                <LinkGroup
                    data={links.filter(link => {
                        return (
                            link.name.includes(searchKeyword) ||
                            link.url.includes(searchKeyword)
                        )
                    })}
                    onAddNewLinkClicked={onAddNewLinkFormClicked}
                    onEditLinkClicked={link => onEditLinkFormClicked(link)}
                    onDeleteLinkClicked={link => onDeleteLinkClicked(link)}
                    onCopyToClipboardClicked={link =>
                        onCopyToClipboardClicked()
                    }
                />
                <LinkFormDialog
                    open={showLinkForm.open}
                    id={showLinkForm.id}
                    name={showLinkForm.name}
                    url={showLinkForm.url}
                    tag={showLinkForm.tag}
                    positiveButton={showLinkForm.positiveButton}
                    onPositiveButtonClicked={link =>
                        onUpdateLinkFormClicked(link)
                    }
                    negativeButton={showLinkForm.negativeButton}
                    onNegativeButtonClicked={onCloseLinkFormClicked}
                />
                <AlertSnackbar
                    open={showCopiedToClipboard}
                    onClose={onDismissCopyToClipboardMessage}
                    message={'Copied URL to clipboard'}
                />
                <ConfirmDialog
                    open={showConfirmDeleteLink.open}
                    title={'Delete this link?'}
                    message={"This action can't undo"}
                    positiveButton={'Confirm'}
                    onPositiveButtonClicked={() =>
                        onDeleteLinkConfirmed(
                            showConfirmDeleteLink.selectedLink
                        )
                    }
                    negativeButton={'Cancel'}
                    onNegativeButtonClicked={onDeleteLinkCanceled}
                />
                <ExportDialog
                    open={showExport.open}
                    title={showExport.title}
                    data={showExport.data}
                    onPositiveButtonClicked={onCopyExportDataClicked}
                    onNegativeButtonClicked={onCloseExportClicked}
                />
                <ImportDialog
                    open={showImport.open}
                    title={showImport.title}
                    data={showImport.data}
                    onPositiveButtonClicked={onImportDataClicked}
                    onNegativeButtonClicked={onCloseImportClicked}
                />
            </ThemeProvider>
        </div>
    )
}
