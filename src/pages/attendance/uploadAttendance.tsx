import react, {FC, useRef, useState} from 'react';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import {postAxios} from '@services/axios';
import {Nullable} from '@src/types/common';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { Panel, PanelBody, PanelFooter, PanelHeader } from '@src/components/panel';
import axios, {AxiosRequestConfig} from 'axios';

const Render = (): JSX.Element => {
    const [selectedFile, setSelectedFile] = useState<Partial<File>>({name: ''});
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isLoadingUpload, setIsLoadingUpload] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const ref = useRef(false);
    const { enqueueSnackbar } = useSnackbar();
    const handlePickFile = () => {
        /*Collecting node-element and performing click*/
        ref.current = true;
        if (inputFileRef.current) { inputFileRef.current.click()}
      }
    const onFileChange = (e: react.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) {
            setIsFilePicked(true); 
            setSelectedFile({name: ''}); 
            return;
        }
        setSelectedFile(e.target.files[0])
    }

    const handleUploadFile = async () => {
        if(selectedFile.size) {

            let file = selectedFile as File;
            let formData = new FormData();
            formData.append('file', file, file.name);
    
            const option = {
                url: `${process.env.REACT_APP_URL_API}/api/status`,
                data: formData,
                onUploadProgress: progressEvent => activeLoading(progressEvent),
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } as AxiosRequestConfig
    
            await postAxios(option).then(res => {
                setIsLoadingUpload(false);
                enqueueSnackbar(`File has been uploaded! - ${res.data.data.length} rows`, { variant: 'success' });
            }).then(res => {
            })
        }
    }

    const activeLoading = (progressEvent:any) => {
        setIsLoadingUpload(true);
        console.log(progressEvent);
        console.log("start");
    }
    
    const result = (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoadingUpload}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Panel>
                <PanelHeader>
                    <Typography className="titleForm" variant='h5'>Upload attendance exported file from attendance machines</Typography>
                </PanelHeader>
                <PanelBody style={{minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, minHeight: 56, maxHeight: '60px' }}
                        >
                            <input
                                style={{ display: "none" }}
                                id="contained-button-file"
                                type="file"
                                ref={inputFileRef}
                                onChange={onFileChange}
                            />
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder={"No Selected File"}
                                inputProps={{ 'aria-label': 'No Selected File' }}
                                onClick={handlePickFile}
                                value={selectedFile ? selectedFile.name : ""}
                                
                            />
                            <Divider sx={{ height: 35, m: 0.5 }} orientation="vertical" />
                            <Button
                            sx={{ p: '10px', height: '34px' }} 
                            aria-label="menu" 
                            onClick={handlePickFile}> Choose File </Button>
                            
                        </Paper>
                        <Button  
                        sx={{ p: '10px', height: '60px', minHeight: 56, marginLeft: "20px" }} 
                        aria-label="menu" 
                        variant='contained'
                        onClick={handleUploadFile}> Upload </Button>
                    </div>
                    <div>
                        <Typography>{isFilePicked && selectedFile.size }</Typography>
                    </div>
                </PanelBody>
            </Panel>
        </>
        
    )

    return result
}

const SnackBarRender = () => {
    const result = (

        <SnackbarProvider maxSnack={3}>
            <Render/>
        </SnackbarProvider>
    )

    return result;
}


export default SnackBarRender