import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ListItem from '../components/list-item';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Delete, Refresh, Edit } from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import { BASE_URL } from '../constants/index';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

const CarDetail = () => {
    const { cars } = useSelector((state) => state.car);
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openStock, setOpenStock] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();
    const [car, setCar] = useState(cars.find((car) => car.car_id === id));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStockClickOpen = () => {
        setOpenStock(true);
    };

    const handleStockClose = () => {
        setOpenStock(false);
    };

    const handleRefresh = () => {
        setCar(cars.find((car) => car.car_id === id));
    };

    const onSubmit = async () => {
        const customerBody = {
            first_name: firstName,
            last_name: lastName,
            birth_date: new Date(Date.now()),
        };

        const customerRes = await fetch(`${BASE_URL}/api/customers`, {
            method: 'POST',
            body: JSON.stringify(customerBody),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const customerResJson = await customerRes.json();

        const invoiceBody = {
            serial_number: Math.floor(Math.random() * 10000),
            price: car.sale_price,
        };
        const invoiceRes = await fetch(`${BASE_URL}/api/sales/invoices`, {
            method: 'POST',
            body: JSON.stringify(invoiceBody),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const invoiceResJson = await invoiceRes.json();

        const saleBody = {
            customer_id: customerResJson.data[0].id,
            personel_id: user.id,
            car_id: car.car_id,
            invoice_id: invoiceResJson.data[0].id,
            sale_date: new Date(Date.now()),
        };

        const saleRes = await fetch(`${BASE_URL}/api/sales`, {
            method: 'POST',
            body: JSON.stringify(saleBody),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        await saleRes.json();

        handleClose();

        setIsSuccess(true);

        setTimeout(() => {
            history.push(`/${car.car_id}`);
        }, 2000);
    };

    const handleRemoveStock = async () => {
        await fetch(`${BASE_URL}/api/cars/${car.car_id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        handleStockClose();
        history.push('/');
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
        }).format(price);

    const renderSuccessAlert = () => {
        return (
            <Collapse in={isSuccess}>
                <Alert
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={() => setIsSuccess(false)}
                        >
                            <CloseIcon fontSize='inherit' />
                        </IconButton>
                    }
                >
                    Başarılı !
                </Alert>
            </Collapse>
        );
    };

    const handleEditClick = () => {
        history.push(`/${car.id}/edit`, { car });
    };

    return (
        <>
            <Helmet>
                <title>{car.title} - Stock Management System</title>
            </Helmet>
            <Container maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {isSuccess && renderSuccessAlert()}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h5' component='h5'>
                                {car.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <img
                                src={car.image_url || '/araba2.jpg'}
                                alt='araba'
                                width='85%'
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='h6' component='h6'>
                                        {formatPrice(car.sale_price)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid
                                        container
                                        justify='flex-end'
                                        alignItems='center'
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Button
                                                variant='outlined'
                                                size='small'
                                                children={<Edit />}
                                                onClick={handleEditClick}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant='outlined'
                                                size='small'
                                                children={<Refresh />}
                                                onClick={handleRefresh}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={handleStockClickOpen}
                                                children={<Delete />}
                                                disabled={
                                                    car.is_sold === 'SOLD'
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </Grid>
                                        <Dialog
                                            open={openStock}
                                            onClose={handleStockClose}
                                            aria-labelledby='alert-dialog-title'
                                            aria-describedby='alert-dialog-description'
                                        >
                                            <DialogTitle id='alert-dialog-title'>
                                                {'Emin misiniz?'}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id='alert-dialog-description'>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Ea tenetur temporibus
                                                    voluptatem aperiam est
                                                    voluptate enim ut explicabo
                                                    quis? Beatae, deserunt
                                                    aperiam! Veniam, accusantium
                                                    alias in iusto non nostrum
                                                    esse.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button
                                                    onClick={handleStockClose}
                                                    color='primary'
                                                >
                                                    Reddet
                                                </Button>
                                                <Button
                                                    onClick={handleRemoveStock}
                                                    color='primary'
                                                    autoFocus
                                                >
                                                    Kabul et
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        {/* SELL BUTTON */}
                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={handleClickOpen}
                                                disabled={
                                                    car.is_sold === 'SOLD'
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {car.is_sold === 'SOLD'
                                                    ? 'Satıldı'
                                                    : 'Sat'}
                                            </Button>
                                        </Grid>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby='form-dialog-title'
                                        >
                                            <DialogTitle id='form-dialog-title'>
                                                Müşteri Bilgileri
                                            </DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    autoFocus
                                                    margin='dense'
                                                    id='first_name'
                                                    label='Ad'
                                                    fullWidth
                                                    value={firstName}
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <TextField
                                                    autoFocus
                                                    margin='dense'
                                                    id='last_name'
                                                    label='Soyad'
                                                    fullWidth
                                                    value={lastName}
                                                    onChange={(e) =>
                                                        setLastName(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button
                                                    onClick={handleClose}
                                                    color='primary'
                                                >
                                                    İptal
                                                </Button>
                                                <Button
                                                    onClick={onSubmit}
                                                    color='primary'
                                                >
                                                    Kaydet
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <hr />
                            <Grid container spacing={2}>
                                <ListItem name='Model' val={car.model} />
                                <ListItem name='Yıl' val={car.year} />
                                <ListItem
                                    name='Yeni mi'
                                    val={
                                        car.is_new === 'NEW'
                                            ? 'Sıfır'
                                            : 'İkinci el'
                                    }
                                />
                                <ListItem
                                    name='Giriş tarihi'
                                    val={new Date(
                                        car.enter_date,
                                    ).toLocaleDateString('tr-TR')}
                                />
                                <ListItem
                                    name='Alış fiyatı'
                                    val={formatPrice(car.purchase_price)}
                                />
                                <ListItem
                                    name='Satıldı mı'
                                    val={
                                        car.is_sold === 'SOLD'
                                            ? 'Satıldı'
                                            : 'Satılmadı'
                                    }
                                />
                                <ListItem name='Marka' val={car.car_brand} />
                                <ListItem name='Renk' val={car.car_color} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <strong>Açıklama</strong>
                        </Grid>
                        <Grid item xs={12}>
                            {car.car_description}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
};

export default CarDetail;
