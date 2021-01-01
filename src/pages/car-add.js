import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AddressForm from '../components/address-form';
import { getManufacturers } from '../actions/cars/get-manufacturers';
import { getSuppliers } from '../actions/cars/get-suppliers';
import { getColors } from '../actions/cars/get-colors';

const CarAdd = () => {
    const dispatch = useDispatch();

    const getManufacturersCb = useCallback(() => dispatch(getManufacturers()), [
        dispatch,
        getManufacturers,
    ]);
    const getSuppliersCb = useCallback(() => dispatch(getSuppliers()), [
        dispatch,
        getSuppliers,
    ]);
    const getColorsCb = useCallback(() => dispatch(getColors()), [
        dispatch,
        getColors,
    ]);

    useEffect(() => {
        getManufacturersCb();
        getSuppliersCb();
        getColorsCb();
    });

    return <AddressForm />;
};
export default CarAdd;
