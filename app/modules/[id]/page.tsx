'use client'
import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Fab
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ShoppingCart,
  PendingActions,
  CheckCircle,
  Cancel
} from '@mui/icons-material'

interface LineItem {
  lineItemId: string;
  quantity: string;
  uom: string;
  rate: string;
  total: string;
}

interface PurchaseOrder {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: string;
  requestedBy: string;
  requestedDate: string;
  category: string;
  lineItems?: LineItem[];
}

interface POFormData {
  poId: string;
  vendorId: string;
  poDate: string;
  remarks: string;
  createdBy: string;
  createdOn: string;
  category: string;
  lineItems: LineItem[];
}

const initialFormData: POFormData = {
  poId: "",
  vendorId: "",
  poDate: "",
  remarks: "",
  createdBy: "",
  createdOn: "",
  category: "",
  lineItems: [{
    lineItemId: "",
    quantity: "",
    uom: "",
    rate: "",
    total: ""
  }],
};

const mockPOs: PurchaseOrder[] = [
  {
    id: 'PO-001',
    title: 'Dell Laptops (10 units)',
    description: 'Dell XPS 13 laptops for development team',
    amount: 15000,
    status: 'pending',
    requestedBy: 'John Doe',
    requestedDate: '2024-01-15',
    category: 'Hardware'
  },
  {
    id: 'PO-002',
    title: 'Microsoft Office Licenses',
    description: 'Office 365 licenses for 50 users',
    amount: 2500,
    status: 'approved',
    requestedBy: 'Jane Smith',
    requestedDate: '2024-01-14',
    category: 'Software'
  },
  {
    id: 'PO-003',
    title: 'Network Equipment',
    description: 'Cisco switches and routers',
    amount: 8000,
    status: 'completed',
    requestedBy: 'Mike Johnson',
    requestedDate: '2024-01-10',
    category: 'Network'
  }
]

// Mock user object
const user = {
  name: 'Unknown User',
  role: 'user'
};

export default function DashboardPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPOs);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [formData, setFormData] = useState<POFormData>({ ...initialFormData });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusCounts = () => {
    return {
      total: purchaseOrders.length,
      pending: purchaseOrders.filter(po => po.status === 'pending').length,
      approved: purchaseOrders.filter(po => po.status === 'approved').length,
      completed: purchaseOrders.filter(po => po.status === 'completed').length
    };
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: string) => {
    const newLineItems = [...formData.lineItems];
    newLineItems[index][field] = value;
    if (field === 'quantity' || field === 'rate') {
      const quantity = parseFloat(newLineItems[index].quantity) || 0;
      const rate = parseFloat(newLineItems[index].rate) || 0;
      newLineItems[index].total = (quantity * rate).toString();
    }
    setFormData({ ...formData, lineItems: newLineItems });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, { lineItemId: "", quantity: "", uom: "", rate: "", total: "" }],
    });
  };

  const removeLineItem = (index: number) => {
    const newLineItems = formData.lineItems.filter((_, i) => i !== index);
    setFormData({ ...formData, lineItems: newLineItems });
  };

  const handleCreatePO = () => {
    setSelectedPO(null);
    setFormData({ ...initialFormData });
    setOpenDialog(true);
  };

  const handleEditPO = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setFormData({
      ...po,
      lineItems: po.lineItems || [{ lineItemId: "", quantity: "", uom: "", rate: "", total: "" }]
    });
    setOpenDialog(true);
  };

  const handleSavePO = () => {
    if (selectedPO) {
      setPurchaseOrders(prev => prev.map(po =>
        po.id === selectedPO.id
          ? { ...po, ...formData, amount: formData.lineItems.reduce((sum, item) => sum + parseFloat(item.total || "0"), 0) }
          : po
      ));
    } else {
      const newPO: PurchaseOrder = {
        id: `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
        title: formData.poId,
        description: formData.remarks,
        amount: formData.lineItems.reduce((sum, item) => sum + parseFloat(item.total || "0"), 0),
        status: 'pending',
        requestedBy: user.name,
        requestedDate: new Date().toISOString().split('T')[0],
        category: formData.category,
        lineItems: formData.lineItems
      };
      setPurchaseOrders(prev => [...prev, newPO]);
    }
    setOpenDialog(false);
  };

  const handleStatusChange = (poId: string, newStatus: PurchaseOrder['status']) => {
    setPurchaseOrders(prev => prev.map(po =>
      po.id === poId ? { ...po, status: newStatus } : po
    ));
  };

  const canEdit = user.role === 'admin' || user.role === 'manager';
  const canApprove = user.role === 'admin' || user.role === 'manager';
  const canCreate = true;
  const statusCounts = getStatusCounts();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Purchase Orders Dashboard
        </Typography>
        {canCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreatePO}
          >
            Create PO
          </Button>
        )}
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingCart sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total POs
                  </Typography>
                  <Typography variant="h5">
                    {statusCounts.total}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PendingActions sx={{ mr: 2, color: 'warning.main' }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Pending
                  </Typography>
                  <Typography variant="h5">
                    {statusCounts.pending}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 2, color: 'info.main' }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Approved
                  </Typography>
                  <Typography variant="h5">
                    {statusCounts.approved}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 2, color: 'success.main' }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Completed
                  </Typography>
                  <Typography variant="h5">
                    {statusCounts.completed}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Purchase Orders
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PO ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Requested By</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell>{po.id}</TableCell>
                    <TableCell>{po.title}</TableCell>
                    <TableCell>{po.category}</TableCell>
                    <TableCell>${po.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={po.status.toUpperCase()}
                        color={getStatusColor(po.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{po.requestedBy}</TableCell>
                    <TableCell>{po.requestedDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <ViewIcon />
                        </IconButton>
                        {canEdit && (
                          <IconButton size="small" color="secondary" onClick={() => handleEditPO(po)}>
                            <EditIcon />
                          </IconButton>
                        )}
                        {canApprove && po.status === 'pending' && (
                          <>
                            <Button
                              size="small"
                              variant="outlined"
                              color="success"
                              onClick={() => handleStatusChange(po.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => handleStatusChange(po.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPO ? 'Edit Purchase Order' : 'Create New Purchase Order'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="PO ID"
              fullWidth
              value={formData.poId}
              onChange={(e) => setFormData({ ...formData, poId: e.target.value })}
            />
            <TextField
              label="Vendor ID"
              fullWidth
              value={formData.vendorId}
              onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
            />
            <TextField
              label="PO Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.poDate}
              onChange={(e) => setFormData({ ...formData, poDate: e.target.value })}
            />
            <TextField
              label="Remarks"
              fullWidth
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Hardware">Hardware</MenuItem>
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="Network">Network</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Created By"
              fullWidth
              value={formData.createdBy}
              onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
            />
            <TextField
              label="Created On"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.createdOn}
              onChange={(e) => setFormData({ ...formData, createdOn: e.target.value })}
            />
            <Divider>Line Items</Divider>
            {formData.lineItems.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  label="Line Item ID"
                  value={item.lineItemId}
                  onChange={(e) => handleLineItemChange(index, 'lineItemId', e.target.value)}
                />
                <TextField
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)}
                />
                <TextField
                  label="UOM"
                  value={item.uom}
                  onChange={(e) => handleLineItemChange(index, 'uom', e.target.value)}
                />
                <TextField
                  label="Rate"
                  type="number"
                  value={item.rate}
                  onChange={(e) => handleLineItemChange(index, 'rate', e.target.value)}
                />
                <TextField
                  label="Total"
                  type="number"
                  value={item.total}
                  InputProps={{ readOnly: true }}
                />
                <IconButton onClick={() => removeLineItem(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Box textAlign="left">
              <Fab size="small" color="primary" onClick={addLineItem}>
                <AddIcon />
              </Fab>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSavePO} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenDialog(true)}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
