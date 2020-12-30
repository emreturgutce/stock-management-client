import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ListItem from '../components/list-item';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

const CarDetail = () => {
    const { cars } = useSelector((state) => state.car);
    const { id } = useParams();
    const classes = useStyles();

    const car = cars.find((car) => car.id === id);
    console.log(car);

    return (
        <Container maxWidth='lg'>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5' component='h5'>
                            {car.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <img src='/araba.jpg' alt='araba' width='85%' />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='h6' component='h6'>
                            {car.sale_price}₺
                        </Typography>
                        <hr />
                        <Grid container spacing={2}>
                            <ListItem name='Model' val={car.model} />
                            <ListItem name='Year' val={car.year} />
                            <ListItem name='Is new' val={car.is_new} />
                            <ListItem name='Enter Date' val={car.enter_date} />
                            <ListItem
                                name='Purchase Price'
                                val={car.purchase_price}
                            />
                            <ListItem name='Is sold' val={car.is_sold} />
                            <ListItem name='Brand' val={car.car_brand} />
                            <ListItem name='Color' val={car.car_color} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <strong>Description</strong>
                    </Grid>
                    <Grid item xs={12}>
                        {car.car_description}
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default CarDetail;
