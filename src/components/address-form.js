import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function AddressForm() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salePrice, setSalePrice] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [year, setYear] = useState(2020);
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [is_new, setIs_new] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [supplier, setSupplier] = useState('');
    const [files, setFiles] = useState([]);
    const { manufacturers, suppliers } = useSelector((state) => state.car);
    const {
        user: { id },
    } = useSelector((state) => state.auth);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const history = useHistory();

    const onSubmit = async () => {
        const data = {
            title,
            sale_price: salePrice,
            purchase_price: purchasePrice,
            is_sold: 'NOT SOLD',
            description,
            model: '123456',
            year,
            is_new: is_new ? 'NEW' : 'NOT NEW',
            enter_date: selectedDate,
            supplier_id: supplier,
            personel_id: id,
            car_manufacturer_id: manufacturer,
            car_color_code: color,
        };

        await fetch('http://localhost:8080/api/cars', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
            method: 'POST',
        });

        history.push('/');
    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h4' align='center'>
                        Araba Ekle
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Typography variant='h6' gutterBottom>
                            Car Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id='title'
                                    name='title'
                                    label='Title'
                                    fullWidth
                                    autoComplete='title'
                                    variant='outlined'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id='outlined-description-static'
                                    label='Description'
                                    multiline
                                    required
                                    rows={4}
                                    variant='outlined'
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-amount'>
                                        Sale Price
                                    </InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-amount'
                                        value={salePrice}
                                        required
                                        onChange={(e) =>
                                            setSalePrice(e.target.value)
                                        }
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                ₺
                                            </InputAdornment>
                                        }
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-amount'>
                                        Purchase Price
                                    </InputLabel>
                                    <OutlinedInput
                                        required
                                        id='outlined-adornment-amount'
                                        value={purchasePrice}
                                        onChange={(e) =>
                                            setPurchasePrice(e.target.value)
                                        }
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                ₺
                                            </InputAdornment>
                                        }
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <KeyboardDatePicker
                                    fullWidth
                                    required
                                    disableToolbar
                                    inputVariant='outlined'
                                    format='MM/dd/yyyy'
                                    margin='normal'
                                    id='enter_date'
                                    label='Enter Date'
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id='outlined-basic'
                                    label='Year'
                                    variant='outlined'
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id='outlined-basic'
                                    label='Model'
                                    variant='outlined'
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant='outlined' fullWidth>
                                    <InputLabel htmlFor='filled-age-native-simple'>
                                        Is New ?
                                    </InputLabel>
                                    <Select
                                        native
                                        required
                                        value={is_new}
                                        onChange={(e) =>
                                            setIs_new(e.target.value)
                                        }
                                        inputProps={{
                                            name: 'is_new',
                                            id: 'filled-is_new-native-simple',
                                        }}
                                    >
                                        <option aria-label='None' value='' />
                                        <option value={true}>New</option>
                                        <option value={false}>Not New</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant='outlined' fullWidth>
                                    <InputLabel htmlFor='filled-age-native-simple'>
                                        Color
                                    </InputLabel>
                                    <Select
                                        native
                                        required
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                        inputProps={{
                                            name: 'color',
                                            id: 'filled-color-native-simple',
                                        }}
                                    >
                                        <option aria-label='None' value='' />
                                        <option value={true}>Bej</option>
                                        <option value={false}>Beyaz</option>
                                        <option value={false}>Bordo</option>
                                        <option value={false}>Füme</option>
                                        <option value={false}>Gri</option>
                                        <option value={false}>Gümüş Gri</option>
                                        <option value={false}>
                                            Kahverengi
                                        </option>
                                        <option value='dbfae870-f0c4-42d3-8c66-17d56d2928f4'>
                                            Kırmızı
                                        </option>
                                        <option value={false}>Lacivert</option>
                                        <option value={false}>Mavi</option>
                                        <option value='51d96ebf-3c5f-41b7-937d-ab12649eca8e'>
                                            Mor
                                        </option>
                                        <option value={false}>Pembe</option>
                                        <option value={false}>Sarı</option>
                                        <option value={false}>Siyah</option>
                                        <option value={false}>Şampanya</option>
                                        <option value={false}>Turkuaz</option>
                                        <option value={false}>Turuncu</option>
                                        <option value={false}>Yeşil</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant='outlined' fullWidth>
                                    <InputLabel htmlFor='filled-age-native-simple'>
                                        Manufacturer
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        native
                                        required
                                        value={manufacturer}
                                        onChange={(e) =>
                                            setManufacturer(e.target.value)
                                        }
                                        inputProps={{
                                            name: 'manufacturer',
                                            id:
                                                'filled-manufacturer-native-simple',
                                        }}
                                    >
                                        <option aria-label='None' value='' />
                                        {manufacturers &&
                                            manufacturers.map(
                                                (manufacturer) => (
                                                    <option
                                                        key={manufacturer.id}
                                                        value={manufacturer.id}
                                                    >
                                                        {manufacturer.name}
                                                    </option>
                                                ),
                                            )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant='outlined' fullWidth>
                                    <InputLabel htmlFor='filled-supplier-native-simple'>
                                        Supplier
                                    </InputLabel>
                                    <Select
                                        variant='outlined'
                                        native
                                        required
                                        value={supplier}
                                        onChange={(e) =>
                                            setSupplier(e.target.value)
                                        }
                                        inputProps={{
                                            name: 'supplier',
                                            id: 'filled-supplier-native-simple',
                                        }}
                                    >
                                        <option aria-label='None' value='' />
                                        {suppliers &&
                                            suppliers.map((supplier) => (
                                                <option
                                                    key={supplier.id}
                                                    value={supplier.id}
                                                >
                                                    {supplier.first_name}
                                                </option>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    onChange={(files) => setFiles(files)}
                                    showFileNames
                                    dropzoneText='Resimleri buraya sürükleyin veya seçmek için tıklayın'
                                    showAlerts={false}
                                    filesLimit={20}
                                />
                            </Grid>
                        </Grid>

                        <div className={classes.buttons}>
                            <Button
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                onClick={onSubmit}
                            >
                                Save
                            </Button>
                        </div>
                    </MuiPickersUtilsProvider>
                </Paper>
            </main>
        </React.Fragment>
    );
}
