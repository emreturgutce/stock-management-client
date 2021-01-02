import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '600px',
    },
    table: {
        '& thead th': {
            fontWeight: '600',
            color: '#FFF',
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& tbody tr td': {
            height: 100,
        },
    },
}));

const CustomTable = ({ columns, rows, filterFn }) => {
    const classes = useStyles();
    const pages = [4, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '15px  auto 0',
                width: '100%',
                border: '1px solid #666',
            }}
        >
            <div style={{ width: '100%' }}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {columns &&
                                    columns.map((column) => (
                                        <TableCell key={column}>
                                            {column}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows &&
                                rows.map((row) => (
                                    <TableRow key={row.car_id}>
                                        <TableCell>
                                            <RouterLink to={`/${row.car_id}`}>
                                                <img
                                                    src={
                                                        row.image_url ||
                                                        '/araba2.jpg'
                                                    }
                                                    height={100}
                                                    alt={`${row.title}`}
                                                />
                                            </RouterLink>
                                        </TableCell>
                                        <TableCell>{row.model}</TableCell>
                                        <TableCell>
                                            <RouterLink to={`/${row.car_id}`}>
                                                {row.title}
                                            </RouterLink>
                                        </TableCell>
                                        <TableCell>{row.year}</TableCell>
                                        <TableCell>{row.car_color}</TableCell>
                                        <TableCell>{row.sale_price}</TableCell>
                                        <TableCell>
                                            {row.is_new === 'NEW'
                                                ? 'Sıfır'
                                                : 'İkinci El'}
                                        </TableCell>
                                        <TableCell>
                                            {row.is_sold === 'SOLD'
                                                ? 'Satıldı'
                                                : 'Satılmadı'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component='div'
                    page={page}
                    rowsPerPageOptions={pages}
                    rowsPerPage={rowsPerPage}
                    count={rows.length}
                    onChangePage={(event, newPage) => setPage(newPage)}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};

export default CustomTable;
