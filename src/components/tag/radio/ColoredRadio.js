import React from 'react'
import PropTypes from 'prop-types'
import 'fontsource-roboto'
import { withStyles } from '@material-ui/core/styles'
import { Radio } from '@material-ui/core'

export default function ColoredRadio(props) {
    const CustomRadio = withStyles({
        root: {
            color: props.color,
            '&$checked': {
                color: props.color
            }
        },
        checked: {}
    })(props => <Radio color="default" {...props} />)
    return (
        <CustomRadio
            title={props.color}
            checked={
                props.selectedColor.toLowerCase() === props.color.toLowerCase()
            }
            value={props.color}
            key={props.color}
            onChange={props.onChanged}
        />
    )
}

ColoredRadio.propTypes = {
    color: PropTypes.string,
    selectedColor: PropTypes.string,
    onChanged: PropTypes.func
}
