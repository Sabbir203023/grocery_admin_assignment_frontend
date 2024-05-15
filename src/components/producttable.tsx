import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import {   Modal  } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product } from './product_interface';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProductModel from './addproductpopup';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

   

    useEffect(() => {
        fetch('http://localhost:3001/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));
    }, []);

    
    const [openModal, setOpenModal] = useState(false);

    const handleUpdateProductClick = (p:Product) => {
        setProduct(p);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    return (
      <>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Details</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Stock Quantity</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product: Product) => (
                        <TableRow key={product.id}>
                            <TableCell>             
                                <img src={`data:image/png;base64,${product.image}`} alt={product.name} style={{ width: 50, height: 50 }} />
                            </TableCell>                            <TableCell align="right">{product.name}</TableCell>
                            <TableCell align="right">{product.details}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right">{product.stock_quantity}</TableCell>
                            <TableCell align="right"><IconButton onClick={handleUpdateProductClick.bind(null, product)}><EditIcon /></IconButton></TableCell>
                            <TableCell align="right"> <IconButton><DeleteIcon /></IconButton></TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <AddProductModel isUpdate={true} initialProduct={product} handleCloseModal={handleCloseModal} />
        </Modal>

        </>
    );
}
