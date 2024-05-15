import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import { Product } from './product_interface';

interface AddProductModelProps {
    isUpdate?: boolean;
    initialProduct?: Product;
    handleCloseModal?: () => void;
}


export default function AddProductModel({ isUpdate = false, initialProduct = {}, handleCloseModal = () => { } }: AddProductModelProps) {
const [product, setProduct] = useState<Product>({
        name: '',
        image: '',
        details: '',
        price: '',
        stock_quantity: ''
    });


    useEffect(() => {   
        setProduct({
            id: initialProduct.id || 0,
            name: initialProduct?.name || '',
            image: initialProduct.image || '',
            details: initialProduct.details || '',
            price: initialProduct.price || '',
            stock_quantity: initialProduct.stock_quantity || ''
        });
    }, [initialProduct, isUpdate]);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleAddProduct = async () => {
        try {
          
            await axios.post('http://localhost:3001/products', {
                name: product.name,
                image: product.image,
                details: product.details,
                price: product.price,
                stock_quantity: product.stock_quantity
            });
            setOpenDialog(true);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

     const handleUpdateProduct = async () => {
        try {
          
            await axios.put(`http://localhost:3001/products/${product.id}`, {
                name: product.name,
                image: product.image,
                details: product.details,
                price: product.price,
                stock_quantity: product.stock_quantity
            });
            setOpenDialog(true);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        handleCloseModal();
        window.location.reload();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange =  (event: React.ChangeEvent<HTMLInputElement>)  => {
        const file = event.target.files?.[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result?.toString() || '';
            const base64Image = await convertImageToBase64(base64String);
            setProduct({ ...product, image: base64Image });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const convertImageToBase64 = (image: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const base64String = canvas.toDataURL('image/jpeg');
                    const base64Image = base64String.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
                    resolve(base64Image);
                } else {
                    reject(new Error('Canvas context is null'));
                }
            };
            img.src = image;
        });
    };

    const validateFields = (): boolean => {
        if (!product.name || !product.details || !product.price || !product.stock_quantity) {
            setError('Please fill out all fields.');
            return false;
        }
        setError('');
        return true;
    };

    

    const handleAddButtonClick = () => {
        if (validateFields()) {
            if (isUpdate) {
                handleUpdateProduct();
            } else{
            handleAddProduct();
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <TextField name="name" value={product.name} onChange={handleChange} id="outlined-name" label="Name" variant="outlined" fullWidth margin='dense' required />
                <TextField name="details" value={product.details} onChange={handleChange} id="outlined-details" label="Details" variant="outlined" fullWidth margin='dense' required />
                <TextField type="number" name="price" value={product.price} onChange={handleChange} id="outlined-price" label="Price" variant="outlined" fullWidth margin='dense' required />
                <TextField type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} id="outlined-quantity" label="Stock Quantity" variant="outlined" fullWidth margin='dense' required />
                <Input
                    type="file"
                    onChange={handleImageChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />
                <br />
                <br />
                <Button variant="contained" fullWidth onClick={handleAddButtonClick}> {isUpdate ? "Update Product" : "Add Product"}</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {isUpdate ? "Product has been update successfully!" : "Product has been added successfully!"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
