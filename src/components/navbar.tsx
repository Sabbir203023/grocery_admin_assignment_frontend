import Button from '@mui/material/Button';
import { AppBar, IconButton, Modal, TextField, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useState } from 'react';
import AddProductModel from './addproductpopup';
import ProductTable from './producttable';


export default function NavBar() {

    const [openModal, setOpenModal] = useState(false);

    const handleAddProductClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDashboardClick = () => {
        window.location.reload(); 
    };

    return <> <AppBar position="static">
        <Toolbar variant="dense" sx={{ justifyContent: 'flex-end' }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button key="Dashboard" sx={{ color: '#fff' }} onClick={handleDashboardClick}>
                            Dashboard
                        </Button>
                <Button key="Add Product" onClick={handleAddProductClick} sx={{ color: '#fff' }}>
                    Add Product
                </Button>
                <Button key="Logout" sx={{ color: '#fff' }}>
                    Logout
                </Button>
            </Box>
        </Toolbar>
    </AppBar>
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <AddProductModel isUpdate={false} handleCloseModal={handleCloseModal} />
        </Modal>

        <div style={{ padding: 20 }}>
            <ProductTable />
        </div>

    </>;
}