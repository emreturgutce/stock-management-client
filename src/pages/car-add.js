import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AddressForm from '../components/address-form';
import { getManufacturers } from '../actions/cars/get-manufacturers';
import { getSuppliers } from '../actions/cars/get-suppliers';

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

    useEffect(() => {
        getManufacturersCb();
        getSuppliersCb();
    });

    return <AddressForm />;
};
export default CarAdd;
