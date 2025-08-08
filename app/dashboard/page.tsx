'use client';
import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  AccountCircle,
  Business,
  People,
  Assessment,
  Engineering,
  AccountBalance,
  Inventory,
  LocalShipping,
  ExitToApp,
  Support,
  Build,
  Description,
  Group,
  HomeRepairService,
  Architecture,
  ElectricBolt,
  PrecisionManufacturing,
  Construction,
  Domain,
  Gavel,
  Assignment,
  Handyman,
  Factory,
  Warehouse,
  AdminPanelSettings,
  ManageAccounts,
  Code
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ERPModule {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const erpModules: ERPModule[] = [
    {
      id: 'sales',
      name: 'Sales',
      category: 'Sales',
      description: 'Sales management and tracking',
      icon: <Business sx={{ width: 24, height: 24 }} />,
      color: '#1976d2'
    },
    {
      id: 'crm',
      name: 'CRM',
      category: 'Sales',
      description: 'Customer relationship management',
      icon: <Group sx={{ width: 24, height: 24 }} />,
      color: '#0d47a1'
    },
    {
      id: 'proposal_estimation',
      name: 'P&E',
      category: 'Sales',
      description: 'Proposal creation and estimation',
      icon: <Description sx={{ width: 24, height: 24 }} />,
      color: '#1565c0'
    },
    {
      id: 'bd_marketing',
      name: 'BD&M',
      category: 'Sales',
      description: 'Business development and marketing',
      icon: <Support sx={{ width: 24, height: 24 }} />,
      color: '#1976d2'
    },
    {
      id: 'after_sales',
      name: 'AS',
      category: 'Sales',
      description: 'After sales services and support',
      icon: <Support sx={{ width: 24, height: 24 }} />,
      color: '#5d8bf4'
    },
    {
      id: 'it',
      name: 'IT',
      category: 'Support Functions',
      description: 'Information technology support',
      icon: <Build sx={{ width: 24, height: 24 }} />,
      color: '#455a64'
    },
    {
      id: 'hr',
      name: '	HR',
      category: 'Support Functions',
      description: 'Employee management, payroll, and HR processes',
      icon: <People sx={{ width: 24, height: 24 }} />,
      color: '#388e3c'
    },
    {
      id: 'facility_admin',
      name: 'F&A',
      category: 'Support Functions',
      description: 'Facility and administrative management',
      icon: <HomeRepairService sx={{ width: 24, height: 24 }} />,
      color: '#1b5e20'
    },
    {
      id: 'qms',
      name: 'QMS',
      category: 'Support Functions',
      description: 'Quality control, compliance, and process management',
      icon: <Assessment sx={{ width: 24, height: 24 }} />,
      color: '#5d4037'
    },
    {
      id: 'management',
      name: 'MGT',
      category: 'Management',
      description: 'Overall management of the organization',
      icon: <Group sx={{ width: 24, height: 24 }} />,
      color: '#795548'
    },
    {
      id: 'engineering',
      name: 'Engg',
      category: 'Engineering',
      description: 'Project engineering, design, and technical management',
      icon: <Engineering sx={{ width: 24, height: 24 }} />,
      color: '#7b1fa2'
    },
    {
      id: 'process',
      name: 'PROC',
      category: 'Engineering',
      description: 'Process management and optimization',
      icon: <Build sx={{ width: 24, height: 24 }} />,
      color: '#6a1b9a'
    },
    {
      id: 'pv',
      name: 'PV',
      category: 'Engineering',
      description: 'Pressure vessel design and management',
      icon: <Construction sx={{ width: 24, height: 24 }} />,
      color: '#4527a0'
    },
    {
      id: 'piping',
      name: 'PIP',
      category: 'Engineering',
      description: 'Piping design and management',
      icon: <Domain sx={{ width: 24, height: 24 }} />,
      color: '#283593'
    },
    {
      id: 'electrical_automation',
      name: 'E&A',
      category: 'Engineering',
      description: 'Electrical systems and automation',
      icon: <ElectricBolt sx={{ width: 24, height: 24 }} />,
      color: '#f57c00'
    },
    {
      id: 'instrumentation_control',
      name: 'I&C',
      category: 'Engineering',
      description: 'Instrumentation and control systems',
      icon: <PrecisionManufacturing sx={{ width: 24, height: 24 }} />,
      color: '#ff6f00'
    },
    {
      id: 'structural',
      name: '	STR',
      category: 'Engineering',
      description: 'Structural design and analysis',
      icon: <Architecture sx={{ width: 24, height: 24 }} />,
      color: '#e65100'
    },
    {
      id: 'civil',
      name: 'CIV',
      category: 'Engineering',
      description: 'Civil engineering and construction',
      icon: <Construction sx={{ width: 24, height: 24 }} />,
      color: '#bf360c'
    },
    {
      id: 'finance',
      name: 'FI',
      category: 'Finance',
      description: 'Financial management, accounting, and reporting',
      icon: <AccountBalance sx={{ width: 24, height: 24 }} />,
      color: '#f57c00'
    },
    {
      id: 'accounts',
      name: 'ACC',
      category: 'Finance',
      description: 'Accounting and financial tracking',
      icon: <AccountBalance sx={{ width: 24, height: 24 }} />,
      color: '#ff8f00'
    },
    {
      id: 'contract',
      name: 'CTR',
      category: 'Finance',
      description: 'Contract management and administration',
      icon: <Gavel sx={{ width: 24, height: 24 }} />,
      color: '#ff6f00'
    },
    {
      id: 'asset_management',
      name: 'AM',
      category: 'Finance',
      description: 'Management of organizational assets',
      icon: <Assignment sx={{ width: 24, height: 24 }} />,
      color: '#ff5722'
    },
    {
      id: 'import_export',
      name: 'I&E',
      category: 'Finance',
      description: 'Import and export management',
      icon: <Warehouse sx={{ width: 24, height: 24 }} />,
      color: '#e64a19'
    },
    {
      id: 'execution',
      name: 'Execution',
      category: 'Exc',
      description: 'Project execution and management',
      icon: <Handyman sx={{ width: 24, height: 24 }} />,
      color: '#0288d1'
    },
    {
      id: 'project_management',
      name: 'PM',
      category: 'Execution',
      description: 'Project planning and management',
      icon: <Factory sx={{ width: 24, height: 24 }} />,
      color: '#039be5'
    },
    {
      id: 'production',
      name: 'Production',
      category: 'Execution',
      description: 'Production management and control',
      icon: <Factory sx={{ width: 24, height: 24 }} />,
      color: '#0277bd'
    },
    {
      id: 'logistics_dispatch',
      name: 'L&D',
      category: 'Execution',
      description: 'Supply chain, inventory, and dispatch management',
      icon: <LocalShipping sx={{ width: 24, height: 24 }} />,
      color: '#0288d1'
    },
    {
      id: 'procurement',
      name: 'Procurement',
      category: 'Procurement',
      description: 'Purchase management, vendor relations, and sourcing',
      icon: <Inventory sx={{ width: 24, height: 24 }} />,
      color: '#d32f2f'
    },
    {
      id: 'qc',
      name: 'Quality Control',
      category: 'QC',
      description: 'Quality control and assurance',
      icon: <Assessment sx={{ width: 24, height: 24 }} />,
      color: '#5d4037'
    },
    {
      id: 'store',
      name: 'Store',
      category: 'Store',
      description: 'Material receipt, inspection, and inventory management',
      icon: <Warehouse sx={{ width: 24, height: 24 }} />,
      color: '#455a64'
    },
    {
      id: 'erp_administration',
      name: 'ERP Admin',
      category: 'Administration',
      description: 'ERP system administration and management',
      icon: <AdminPanelSettings sx={{ width: 24, height: 24 }} />,
      color: '#455a64'
    },
    {
      id: 'user_management',
      name: 'UM',
      category: 'Administration',
      description: 'User access and management',
      icon: <ManageAccounts sx={{ width: 24, height: 24 }} />,
      color: '#546e7a'
    },
    {
      id: 'customization',
      name: 'Customization',
      category: 'Administration',
      description: 'System customization and configuration',
      icon: <Code sx={{ width: 24, height: 24 }} />,
      color: '#607d8b'
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token) {
      router.push('/');
      return;
    }
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setOpen(true);
  }, [router]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleModuleClick = (moduleId: string) => {
    router.push(`/modules/${moduleId}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Business sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              Multitex MIS
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Welcome, {user.username}
            </Typography>
            <IconButton size="large" onClick={handleMenuOpen} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Modules
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Typography>
        <Grid container spacing={3}>
          {erpModules.map((module) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={module.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  width: 120,
                  height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleModuleClick(module.id)}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2, height: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 1,
                      p: 1.5,
                      borderRadius: 1,
                      backgroundColor: module.color,
                      color: 'white',
                      width: 48,
                      height: 48
                    }}
                  >
                    {module.icon}
                  </Box>
                  <Typography sx={{ fontSize: '12px', textAlign: 'center', mt: 1 }}>
                    {module.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            handleClose();
          }
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>Message of the Day</DialogTitle>
        <DialogContent>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
