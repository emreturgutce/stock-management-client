import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';
import CarForm from '../components/car-form';
import { getManufacturers } from '../actions/cars/get-manufacturers';
import { getSuppliers } from '../actions/cars/get-suppliers';
import { getColors } from '../actions/cars/get-colors';

const CarEdit = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const getManufacturersCb = useCallback(() => dispatch(getManufacturers()), [
        dispatch,
    ]);
    const getSuppliersCb = useCallback(() => dispatch(getSuppliers()), [
        dispatch,
    ]);
    const getColorsCb = useCallback(() => dispatch(getColors()), [dispatch]);

    useEffect(() => {
        getManufacturersCb();
        getSuppliersCb();
        getColorsCb();
    });

    return (
        <>
            <Helmet>
                <title>Araba Güncelleme - Stock Management System</title>
            </Helmet>
            <CarForm car={location.state.car} />
        </>
    );
};
export default CarEdit;
