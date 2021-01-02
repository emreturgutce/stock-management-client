import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import AddressForm from '../components/address-form';
import { getManufacturers } from '../actions/cars/get-manufacturers';
import { getSuppliers } from '../actions/cars/get-suppliers';
import { getColors } from '../actions/cars/get-colors';

const CarAdd = () => {
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
                <title>Araba Ekleme - Stock Management System</title>
            </Helmet>
            <AddressForm />
        </>
    );
};
export default CarAdd;
