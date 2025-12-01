import {
    Container,
    Typography,
    Switch,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { RigContext, UserDetails } from '../context/RigContext';

export interface FetchSettings {
    method: string
    headers?: any
    body?: string
};

export interface FetchPayload {
    id: number;
    admin?: boolean;
    password?: string;
};

export interface ApiData {
    receivedPacket: UserDetails[];
    error: string;
    fetchReady: boolean;
};

const ControlUsers: React.FC = (): React.ReactElement => {
    const {
        token,
        userDetails,
        loading,
        setLoading,
        setMode,
        logUserOut
    } = useContext(RigContext);

    // Local state for password inputs
    const [passwords, setPasswords] = useState<{ [key: string]: string }>({});
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [createNewUser, setCreateNewUser] = useState<boolean>(false);
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [idOfSelectedUser, setIdOfSelectedUser] = useState<number>(); // for use that is set to be deleted
    const [message, setMessage] = useState<string>('');
    const [apiData, setApiData] = useState<ApiData>({
        receivedPacket: [],
        error: "",
        fetchReady: true
    });
    const messageCleanUpTime: number = 3000;

    const apiCall = async (
        action?: string,
        method?: string,
        payload?: FetchPayload,
        importToken?: string,
        id?: number): Promise<void> => {

        setApiData({
            ...apiData,
            fetchReady: false,
            error: ""
        });

        const baseUrl: string = `http://localhost:5509/api/`;
        let urlTarget: string = 'auth';
        let url: string = `${baseUrl}${urlTarget}`;
        let authToken: string = token;
        //let url: string = "http://localhost:5509/api/auth";

        //if (action.includes('product')) { urlTarget = 'products'; }
        //if (action.includes('message')) { urlTarget = 'messages'; }
        // here also rest of the categories: orders, web page, messages

        console.log('api call: ', action, method, payload, importToken, id, url);

        // needs to update url to get latest urltarget
        //url = `/.netlify/functions/api/${urlTarget}`;

        // if it is PUT or DELETE, url needs the id:
        if (method === "PUT" || method === "DELETE") {
            url = `${baseUrl}${urlTarget}/${id}`;
        }

        // in some cases token statevariable is empty, so then user needs to send it by importToken
        if (importToken) { authToken = importToken }

        let settings: FetchSettings = {
            method: method || "GET",
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        if (method === "POST" || method === "PUT") {
            settings = {
                ...settings,
                headers: {
                    ...settings.headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        }

        try {
            const connection: Response = await fetch(url, settings);

            if (connection.status === 200) {
                if (action === 'pswchange') {

                    setMessage('password is now changed');
                    setApiData({
                        ...apiData,
                        fetchReady: true
                    });

                    setTimeout(() => {
                        setMessage('')
                    }, messageCleanUpTime)

                }

                if (action === 'delete user') {

                    setMessage('user is now deleted');
                    setApiData({
                        ...apiData,
                        fetchReady: true
                    });

                } else {
                    setApiData({
                        ...apiData,
                        //   receivedPacket: await connection.json(),
                        fetchReady: true
                    });

                    if (action?.includes('fetch')) {
                        const receivedPack = await connection.json();
                        console.log('received pack: ', receivedPack);
                        switch (action) {
                            //  case 'fetch users': setUsers(await connection.json()); break;
                            //  case 'fetch products': setProducts(await connection.json()); break;
                            case 'fetch users': setUsers(await receivedPack.users); break;
                            //case 'fetch products': setProducts(await receivedPack); break;
                            //case 'fetch messages': setMessages(await receivedPack); break;
                        }
                        //if (action === 'fetch users') {
                        //  setUsers(await connection.json());

                        setMessage('data fetched');

                        setTimeout(() => {
                            setMessage('')
                        }, messageCleanUpTime)
                    }

                    // if it was POST or PUT, confirm, that credentials are now saved
                    if (method === 'POST' || method === 'PUT') {

                        setMessage('changes saved');
                        setTimeout(() => {
                            setMessage('')
                        }, messageCleanUpTime)
                    }
                }
            } else {

                let errorText: string = "";

                switch (connection.status) {
                    case 401:
                        errorText = "No permission";
                        if (action !== 'pswchange') {
                            // if this is not password change fail, log user out
                            logUserOut();
                        }
                        break;
                    case 400: errorText = "Virhe pyynnön tiedoissa"; break;
                    default: errorText = "Palvelimella tapahtui odottamaton virhe"; break;
                }

                setApiData({
                    ...apiData,
                    error: errorText,
                    fetchReady: true
                });
                setTimeout(() => {
                    setApiData({
                        ...apiData,
                        error: ''
                    });
                }, messageCleanUpTime)
            }
            //}
        } catch (e: any) {
            setApiData({
                ...apiData,
                error: "can't connect to server",
                fetchReady: true
            });
        }
    }

    // to change if is admin
    const handleToggle = async (id: number, current: boolean) => { 
        await apiCall('update user', 'PUT', { id, admin: !current }, token, id);
        await apiCall('fetch users', 'GET');
    };

    const handlePasswordChange = (id: number) => {
        const newPassword = passwords[id];
        if (newPassword?.length > 0) {
            apiCall('pswchange', 'PUT', { id, password: newPassword }, token, id);
            setPasswords(prev => ({ ...prev, [id]: '' })); // Clear input
        }
    };

    const handleConfirmDelete = async () => {
        console.log('deleting: ', idOfSelectedUser);
        setDeleteDialog(false);
        await apiCall('delete user', 'DELETE', undefined, token, idOfSelectedUser);
        await apiCall('fetch users', 'GET');
    };


    useEffect(() => {
        // http://localhost:5509/api/auth
        console.log('loaded control users');
        apiCall('fetch users', 'GET');
    }, []); // when loaded

    useEffect( () => {
        console.log('users: ', users);
    });

    return (
        <Container sx={{ color: 'rgb(200,200,200)' }}>
            
            <Typography variant="h4" sx={{ color: 'rgb(200,200,200)' }}>
                {
                    (userDetails.admin) ? <>users</> : <>your settings</>
                }
            </Typography>
            <Typography>
                {
                (!apiData.fetchReady) ?
                <>loading</>:<></>
                }

                {message}
                <Button 
                    onClick={ () => {setMode('main')}}
                >back to main page</Button>
            </Typography>  
            {
                (userDetails.admin) ?
                    <>
                        {/* delete dialog that shows only when confirming user deletion */}
                        <Dialog open={deleteDialog} onClose={() => { setDeleteDialog(false); }}>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this user?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { setDeleteDialog(false); }}>Cancel</Button>
                                <Button onClick={handleConfirmDelete} color="error" variant="contained">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {/* 
                        <Button onClick={() => { setCreateNewUser(true); }}>
                            create new user
                        </Button>

                        <Backdrop open={createNewUser}>
                            <Paper sx={{ padding: 2 }}>
                                <Box
                                    component="form"
                                    onSubmit={submitNewUser}
                                    ref={createUserRef}
                                    style={{
                                        width: 300,
                                        backgroundColor: "#fff",
                                        padding: 20
                                    }}
                                >
                                    <Stack spacing={2}>
                                        <Typography variant="h6">add new user</Typography>
                                        <TextField
                                            label="Username"
                                            name="username"
                                        />
                                        <TextField
                                            label="Password"
                                            name="password"
                                            type="password"
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                        >
                                            submit
                                        </Button>

                                    </Stack>

                                    <Button onClick={() => { setCreateNewUser(false); }}>Cancel</Button>
                                </Box>
                            </Paper>
                        </Backdrop>
                        */}
                    </> :
                    <></>
            }
            <Container>
                {
                    users.map((u: UserDetails, i: number) => {
                        if (u.username === userDetails.username || userDetails.admin) {
                            return (
                                <Container
                                    key={`uzrs-${u.id}-${i}`}
                                    sx={{
                                        background: (u.username === userDetails.username) ? "rgb(180,180,180)" : "rgb(200,200,200)",
                                        color: 'black',
                                        margin: 1,
                                        borderRadius: 2,
                                        p: 2
                                    }}
                                >
                                    <Typography>{`id: ${u.id}`}</Typography>
                                    <Typography>{`username: ${u.username}`}</Typography>
                                    {
                                        (apiData.fetchReady) ?
                                            <>
                                                {
                                                    (userDetails.admin) ?
                                                        <>
                                                            <Typography component="div">
                                                                admin:
                                                                <Switch
                                                                    checked={u.admin}
                                                                    onChange={() => handleToggle(u.id, u.admin)}
                                                                    color="primary"
                                                                />
                                                            </Typography>
                                                        </> :
                                                        <></>
                                                }

                                                <Typography>change password:</Typography>
                                                <TextField
                                                    size="small"
                                                    type="password"
                                                    value={passwords[u.id] || ''}
                                                    onChange={(e) =>
                                                        setPasswords(prev => ({ ...prev, [u.id]: e.target.value }))
                                                    }
                                                    sx={{ mr: 1 }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handlePasswordChange(u.id)}
                                                >
                                                    Save
                                                </Button>
                                                <br />
                                                {
                                                    (userDetails.admin) ?
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                sx={{ margin: 1 }}
                                                                onClick={() => {
                                                                    setDeleteDialog(true);
                                                                    setIdOfSelectedUser(u.id);
                                                                }}>
                                                                Delete User
                                                            </Button>
                                                        </> :
                                                        <></>
                                                }
                                            </> :
                                            <>updating, wait.</>
                                    }
                                </Container>
                            )
                        }
                    })
                }
            </Container>
        </Container>
    );
};

export default ControlUsers;