import React from "react";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
/* import { StylesProvider } from '@material-ui/styles'; */

const productSizes = [
    {
        value: 'XS',
        label: 'XS',
    },
    {
        value: 'S',
        label: 'S',
    },
    {
        value: 'M',
        label: 'M',
    },
    {
        value: 'L',
        label: 'L',
    },
    {
        value: 'XL',
        label: 'XL',
    },
    {
        value: 'XXL',
        label: 'XXL',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '50%',
        minWidth: '450px',
        padding: '24px',
    },
    textField: {
        padding: '0',
        marginTop: '8px',
        marginBottom: '8px',
        width: '60%',
        minWidth: '170px',
    },
    donateButton: {
        width: '30%',
        marginTop: '24px'
    },
    input: {
        display: 'none',
        margin: '8px'
    },
    sliderContainer: {
        width: '60%',
        display: 'flex',
        flexWrap: 'wrap',

        margin: '8px'
    },
    slider: {
        width: '100%'
    },
    typography: {
        margin: '0'
    }
}));

function valuetext(value) {
    return `${value}`;
}

const ProductUpload = () => {
    const classes = useStyles();
    const [productSize, setSize] = React.useState('M');

    const handleChange = (event) => {
        setSize(event.target.value);
    }
    return (
        <Paper elevation={3} component="form" className={classes.root}>
            {/* <StylesProvider injectFirst> */}
            <TextField className={classes.textField} required id="standard-required" label="Obligatorio" defaultValue="Título" />

            <TextField
                className={classes.textField}
                id="standard-select-productSize"
                select
                label="Tamaño"
                value={productSize}
                onChange={handleChange}
                helperText="Por favor seleccione un tamaño"
            >
                {productSizes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <div className={classes.sliderContainer}>
                <Typography className={classes.typography} id="discrete-slider" gutterBottom>
                    Cantidad
                </Typography>
                <Slider className={classes.slider}
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </div>

            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="outlined" component="span">
                    Subir imagen
                </Button>
            </label>

            <Button className={classes.donateButton} variant="contained" color="primary">Donar</Button>
            {/* </StylesProvider> */}
        </Paper>
    )
};

/* const ProductName = styled.input.attrs(props => ({
    type: "text"
}))`

`; */

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    padding: 24px;
`;

const StyledPaper = styled(Paper)`
    max-width: 50%;
    min-width: 450px;
`;

const StyledTextField = styled(TextField)`
    padding: 0;
    margin-top: 8px;
    margin-bottom: 8px;
    width: 50%;
    min-width: 170px;
`;

const StyledButton = styled(Button)`
    max-width: 50%;
    min-width: 170px;
`;

export default ProductUpload;