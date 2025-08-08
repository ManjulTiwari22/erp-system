'use client'
import { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material'
import {
  AccountCircle,
  Business,
  People,
  Assessment,
  Engineering,
  AccountBalance,
  Inventory,
  LocalShipping,
  Settings,
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
  Code,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface ERPModule {
  id: string
  name: string
  category: string
  description: string
  icon: React.ReactNode
  color: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const erpModules: ERPModule[] = [
    {
      id: 'sales',
      name: 'Sales',
      category: 'Sales',
      description: 'Sales management and tracking',
      icon: <Business />,
      color: '#1976d2'
    },
    {
      id: 'crm',
      name: 'CRM',
      category: 'Sales',
      description: 'Customer relationship management',
      icon: <Group />,
      color: '#0d47a1'
    },
    {
      id: 'proposal_estimation',
      name: 'Proposal + Estimation',
      category: 'Sales',
      description: 'Proposal creation and estimation',
      icon: <Description />,
      color: '#1565c0'
    },
    {
      id: 'bd_marketing',
      name: 'BD + Marketing',
      category: 'Sales',
      description: 'Business development and marketing',
      icon: <Support />,
      color: '#1976d2'
    },
    {
      id: 'after_sales',
      name: 'After Sales',
      category: 'Sales',
      description: 'After sales services and support',
      icon: <Support />,
      color: '#5d8bf4'
    },
    {
      id: 'it',
      name: 'IT',
      category: 'Support Functions',
      description: 'Information technology support',
      icon: <Build />,
      color: '#455a64'
    },
    {
      id: 'hr',
      name: 'Human Resources',
      category: 'Support Functions',
      description: 'Employee management, payroll, and HR processes',
      icon: <People />,
      color: '#388e3c'
    },
    {
      id: 'facility_admin',
      name: 'Facility/Admin',
      category: 'Support Functions',
      description: 'Facility and administrative management',
      icon: <HomeRepairService />,
      color: '#1b5e20'
    },
    {
      id: 'qms',
      name: 'Quality Management',
      category: 'Support Functions',
      description: 'Quality control, compliance, and process management',
      icon: <Assessment />,
      color: '#5d4037'
    },
    {
      id: 'management',
      name: 'Management',
      category: 'Management',
      description: 'Overall management of the organization',
      icon: <Group />,
      color: '#795548'
    },
    {
      id: 'engineering',
      name: 'Engineering',
      category: 'Engineering',
      description: 'Project engineering, design, and technical management',
      icon: <Engineering />,
      color: '#7b1fa2'
    },
    {
      id: 'process',
      name: 'Process',
      category: 'Engineering',
      description: 'Process management and optimization',
      icon: <Build />,
      color: '#6a1b9a'
    },
    {
      id: 'pv',
      name: 'PV',
      category: 'Engineering',
      description: 'Pressure vessel design and management',
      icon: <Construction />,
      color: '#4527a0'
    },
    {
      id: 'piping',
      name: 'Piping',
      category: 'Engineering',
      description: 'Piping design and management',
      icon: <Domain />,
      color: '#283593'
    },
    {
      id: 'electrical_automation',
      name: 'Electrical & Automation',
      category: 'Engineering',
      description: 'Electrical systems and automation',
      icon: <ElectricBolt />,
      color: '#f57c00'
    },
    {
      id: 'instrumentation_control',
      name: 'Instrumentation & Control',
      category: 'Engineering',
      description: 'Instrumentation and control systems',
      icon: <PrecisionManufacturing />,
      color: '#ff6f00'
    },
    {
      id: 'structural',
      name: 'Structural',
      category: 'Engineering',
      description: 'Structural design and analysis',
      icon: <Architecture />,
      color: '#e65100'
    },
    {
      id: 'civil',
      name: 'Civil',
      category: 'Engineering',
      description: 'Civil engineering and construction',
      icon: <Construction />,
      color: '#bf360c'
    },
    {
      id: 'finance',
      name: 'Finance',
      category: 'Finance',
      description: 'Financial management, accounting, and reporting',
      icon: <AccountBalance />,
      color: '#f57c00'
    },
    {
      id: 'accounts',
      name: 'Accounts',
      category: 'Finance',
      description: 'Accounting and financial tracking',
      icon: <AccountBalance />,
      color: '#ff8f00'
    },
    {
      id: 'contract',
      name: 'Contract',
      category: 'Finance',
      description: 'Contract management and administration',
      icon: <Gavel />,
      color: '#ff6f00'
    },
    {
      id: 'asset_management',
      name: 'Asset Management',
      category: 'Finance',
      description: 'Management of organizational assets',
      icon: <Assignment />,
      color: '#ff5722'
    },
    {
      id: 'import_export',
      name: 'Import + Export',
      category: 'Finance',
      description: 'Import and export management',
      icon: <Warehouse />,
      color: '#e64a19'
    },
    {
      id: 'execution',
      name: 'Execution',
      category: 'Execution',
      description: 'Project execution and management',
      icon: <Handyman />,
      color: '#0288d1'
    },
    {
      id: 'project_management',
      name: 'Project Management',
      category: 'Execution',
      description: 'Project planning and management',
      icon: <Factory />,
      color: '#039be5'
    },
    {
      id: 'production',
      name: 'Production',
      category: 'Execution',
      description: 'Production management and control',
      icon: <Factory />,
      color: '#0277bd'
    },
    {
      id: 'logistics_dispatch',
      name: 'Logistics and Dispatch',
      category: 'Execution',
      description: 'Supply chain, inventory, and dispatch management',
      icon: <LocalShipping />,
      color: '#0288d1'
    },
    {
      id: 'procurement',
      name: 'Procurement',
      category: 'Procurement',
      description: 'Purchase management, vendor relations, and sourcing',
      icon: <Inventory />,
      color: '#d32f2f'
    },
    {
      id: 'proc_metal',
      name: 'Proc-Metal',
      category: 'Procurement',
      description: 'Metal procurement and management',
      icon: <Inventory />,
      color: '#b71c1c'
    },
    {
      id: 'proc_boi',
      name: 'Proc-BOI',
      category: 'Procurement',
      description: 'BOI procurement and management',
      icon: <Inventory />,
      color: '#c62828'
    },
    {
      id: 'proc_works',
      name: 'Proc-Works',
      category: 'Procurement',
      description: 'Works procurement and management',
      icon: <Inventory />,
      color: '#b71c1c'
    },
    {
      id: 'qc',
      name: 'Quality Control',
      category: 'QC',
      description: 'Quality control and assurance',
      icon: <Assessment />,
      color: '#5d4037'
    },
    {
      id: 'store',
      name: 'Store',
      category: 'Store',
      description: 'Material receipt, inspection, and inventory management',
      icon: <Warehouse />,
      color: '#455a64'
    },
    {
      id: 'erp_administration',
      name: 'ERP Administration',
      category: 'Administration',
      description: 'ERP system administration and management',
      icon: <AdminPanelSettings />,
      color: '#455a64'
    },
    {
      id: 'user_management',
      name: 'User Management',
      category: 'Administration',
      description: 'User access and management',
      icon: <ManageAccounts />,
      color: '#546e7a'
    },
    {
      id: 'customization',
      name: 'Customization',
      category: 'Administration',
      description: 'System customization and configuration',
      icon: <Code />,
      color: '#607d8b'
    }
  ]

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token) {
      router.push('/')
      return
    }
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleModuleClick = (moduleId: string) => {
    router.push(`/modules/${moduleId}`)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Business sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Multitex MIS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Welcome, {user.username}
            </Typography>
            <IconButton
              size="large"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Modules
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Typography>
        <Grid container spacing={3}>
          {erpModules.map((module) => (
            <Grid item xs={12} sm={6} md={4} key={module.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  width: 250, // Fixed width
                  height: 250, // Fixed height, same as width to make it square
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
                <CardContent sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%', // Ensure CardContent takes full height of Card
                }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: module.color,
                        color: 'white',
                        mr: 2,
                      }}
                    >
                      {module.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" component="h2">
                        {module.name}
                      </Typography>
                      <Chip
                        label={module.category}
                        size="small"
                        sx={{ backgroundColor: module.color, color: 'white' }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ overflow: 'auto' }}>
                    {module.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
