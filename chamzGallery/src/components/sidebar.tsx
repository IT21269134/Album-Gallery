import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import logo from '../assets/logo3.svg';
import GridView from './gridview';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import CreateAlbum from './createalbum';
import UploadPhoto from './uploadphoto';
import SliderView from './sliderview';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function Sidebar() {
    const [albums, setAlbums] = React.useState<string[]>([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState<'album' | 'photo' | null>(null);
    const [selectedAlbum, setSelectedAlbum] = React.useState<string | null>(null);
    const [albumImages, setAlbumImages] = React.useState<Record<string, { title: string; file: File }[]>>({});

    const openAlbumModal = () => {
        setModalType('album');
        setModalOpen(true);
    };

    const openPhotoModal = () => {
        setModalType('photo');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalType(null);
    };

    const handleUpload = ({ title, album, file }: { title: string, album: string, file: File }) => {
        setAlbumImages(prev => ({
            ...prev,
            [album]: [...(prev[album] || []), { title, file }]
        }));
    };

    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue);

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    React.useEffect(() => {
        const savedAlbums = localStorage.getItem('albums');
        if (savedAlbums) {
            setAlbums(JSON.parse(savedAlbums));
        }
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Dialog open={modalOpen} onClose={closeModal} maxWidth="xs" fullWidth>
                {modalType === 'album' && (
                    <CreateAlbum
                        onClose={closeModal}
                        onCreate={(title: string) => {
                            setAlbums(prev => {
                                const updated = [...prev, title];
                                localStorage.setItem('albums', JSON.stringify(updated));
                                return updated;
                            });
                        }}
                    />
                )}
                {modalType === 'photo' && (
                    <UploadPhoto
                        onClose={closeModal}
                        albums={albums}
                        selectedAlbum={selectedAlbum}
                        onUpload={handleUpload}
                    />
                )}
            </Dialog>

            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Chamz Gallery
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%' }}
                        borderRadius="50"
                    >
                        <Avatar
                            alt="Chamz gallery"
                            src={logo} // use imported image
                            sx={{ width: 65, height: 65 }}
                        />
                    </Stack>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Stack direction="row" justifyContent={open ? 'flex-start' : 'center'} sx={{ px: 2, mt: 2, mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddToPhotosIcon />}
                        fullWidth={open}
                        onClick={openAlbumModal}
                        sx={{
                            minHeight: 48,
                            textTransform: 'none',
                            justifyContent: open ? 'flex-start' : 'center',
                            px: open ? 2 : 1,
                        }}
                    >
                        {open && 'Create Album'}
                    </Button>
                </Stack>
                <List>
                    {albums.map((albumTitle, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                selected={selectedAlbum === albumTitle}
                                onClick={() => setSelectedAlbum(albumTitle)}
                                sx={{
                                    minHeight: 48,
                                    px: 2.5,
                                    justifyContent: open ? 'initial' : 'center',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        mr: open ? 3 : 'auto',
                                    }}
                                >
                                    <PermMediaIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${albumTitle} (${albumImages[albumTitle]?.length || 0})`}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />

                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>


            <Box component="main" sx={{ flexGrow: 1, p: 3, border: "divider" }}>
                <DrawerHeader />
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box >
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="GRID VIEW" value="1" />
                                <Tab label="SLIDE SHOW" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <GridView albumImages={albumImages} selectedAlbum={selectedAlbum} />
                        </TabPanel>
                        <TabPanel value="2"><SliderView selectedAlbum={selectedAlbum} albumImages={albumImages} /></TabPanel>
                    </TabContext>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 24,
                            right: 24,
                            zIndex: 1300, // Make sure it's above other content
                        }}
                    >
                        <Fab color="primary" aria-label="add" onClick={openPhotoModal}

                        >
                            <AddIcon />
                        </Fab>
                    </Box>

                </Box>
            </Box>

        </Box>
    );
}

