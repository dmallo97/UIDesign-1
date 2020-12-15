import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import PublishIcon from '@material-ui/icons/Publish';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { gql, useMutation } from '@apollo/client';

const UPLOAD_PRODUCT_MUTATION = gql`
  mutation UploadProduct($input: UploadProductInput!){
    uploadProduct(input: $input){
        title
        size
        quantity
        productImage
    }
  }
`;

const IMAGE_UPLOAD_MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;

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
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    textField: {
        padding: '0',
        marginTop: '8px',
        marginBottom: '8px',
        width: '100%',
        minWidth: '170px',
    },
    donateButton: {
        width: '50%',
        marginTop: '32px',
        minWidth: '150px',
    },
    input: {
        display: 'none',
        margin: '8px',
        minWidth: '150px',
    },
    uploadButton: {
        width: '40%',
        minWidth: '150px',
    },
    sliderContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '170px',
        marginTop: '8px',
        marginBottom: '8px',
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProductUpload = () => {
    const classes = useStyles();
    const [productSize, setSize] = React.useState('M');
    const [productTitle, setTitle] = React.useState("Sin definir");
    const [productQuantity, setQuantity] = React.useState(1);
    const [productImage, setProductImage] = React.useState({
        preview: "",
        raw:""
    });
    const [open, setOpen] = React.useState(false);
    const [uploadProductMutation] = useMutation(UPLOAD_PRODUCT_MUTATION);
    const [uploadImageMutation] = useMutation(IMAGE_UPLOAD_MUTATION); //Puede que no haga falta

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const handleImageUploadedBtnClick = (event) => {
        /*event.preventDefault();
        const formData = new FormData();
        formData.append("productImage", productImage.raw);*/


    }

    const handleImageChange = ({
        target: {
          validity,
          files: [file],
        },
      }) => {
        /*if(event.target.files.length){
            setProductImage({
                preview: URL.createObjectURL(event.target.files[0]),
                raw: event.target.files[0]
            })
        }
        if (validity.valid) uploadImageMutation({ variables: { file } });*/
    }

    const handleClick = async (event) => {
        try {
            if (document.forms["uploadForm"]["title"].value !== "") {
                setOpen(true);
            } else {
                return false;
            }
            event.preventDefault();
            event.stopPropagation();
            const { data } = await uploadProductMutation({ //que se deberia hacer con el producto devuelto? mostrar otra pagina? redireccionar?
                variables: {
                  input: { //Falta imagen
                    productTitle,
                    productSize,
                    productQuantity,
                  }
                }
              });
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Container className={classes.root} component="main" maxWidth="xs">
            <Avatar className={classes.avatar}>
                <PublishIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
                Sube una prenda
            </Typography>
            <form name="uploadForm" className={classes.formContainer} component="form" onSubmit={handleClick}>
                <TextField name="title" className={classes.textField} onChange={handleTitleChange} required id="standard-required" label="Obligatorio" placeholder="Título" />

                <TextField
                    className={classes.textField}
                    id="standard-select-productSize"
                    select
                    label="Tamaño"
                    value={productSize}
                    onChange={handleSizeChange}
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
                        onChange={handleQuantityChange}
                    />
                </div>

                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="contained-button-file">
                    <Button className={classes.uploadButton} variant="outlined" component="span" onClick={handleImageUploadedBtnClick}>
                        Subir imagen
                </Button>
                </label>

                <Button type="submit" className={classes.donateButton} variant="contained" color="primary">Donar</Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Prenda subida correctamente!
                </Alert>
            </Snackbar>
        </Container>
    )
};

export default ProductUpload;