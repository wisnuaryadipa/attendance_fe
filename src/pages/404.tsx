import react, {FC} from 'react'
import styled from 'styled-components';
import Button from '@components/button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom';



const Page404: FC = styled((props) => {
        let navigate = useNavigate();
        return (
                <div className="mainbar p404" {...props}>
                        
                        <h2 className="title">404</h2>
                        <div className="wrapper">
                                <div className="description">
                                        Sorry, The page you're looking for was not found!
                                </div>
                                <Button 
                                className='btn btn-back' 
                                variant="outlined"
                                onClick={() => (navigate(-1))}>
                                        <ArrowBackIcon style={{margin: "0 10px"}}/>
                                        <div className="btn-text" style={{margin: "0 10px"}}>Go To Homepage</div> 
                                </Button>
                        </div>
                </div>
        )
})`
        flex: 5;
        text-align: center;
        display:flex; 
        flex-direction:column; 
        justify-content:center;
        min-height:100vh;
        line-height: 1;

        .title {
                font-size: 200px;
                margin: 0px;
        }
        .wrapper {
                margin: 0px;
                .btn-back{
                        margin: 20px;
                }
                button {
                        font-size: 20px;
                        margin: 0 40px;
                }
        }
        
`;

export default Page404;