import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    grey
} from '@material-ui/core/colors'
import { Grid } from '@material-ui/core'
import ColoredRadio from '../radio/ColoredRadio'

export default function TagPicker(props) {
    const colors = [
        grey[500],
        red[500],
        pink[500],
        purple[500],
        deepPurple[500],
        indigo[500],
        blue[500],
        lightBlue[500],
        cyan[500],
        teal[500],
        green[500],
        lightGreen[500],
        lime[500],
        yellow[500],
        amber[500],
        orange[500]
    ]
    const [selectedColor, setSelectedColor] = useState(
        props.selectedColor || colors[0]
    )
    const onColorSelected = event => {
        const selectedColor = event.target.value
        setSelectedColor(selectedColor)
        props.onChanged(selectedColor)
    }
    return (
        <React.Fragment>
            <Grid container>
                {colors.map(color => {
                    return (
                        <ColoredRadio
                            key={color}
                            color={color}
                            selectedColor={selectedColor}
                            onChanged={onColorSelected}
                        />
                    )
                })}
            </Grid>
        </React.Fragment>
    )
}

TagPicker.propTypes = {
    selectedColor: PropTypes.string,
    onChanged: PropTypes.func
}
