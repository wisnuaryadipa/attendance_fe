import react, {FC} from 'react'
import styled from 'styled-components';

const Page404: FC = styled((props) => (
        <div className="mainBar" {...props}>
                404
        </div>
))`
        flex: 5;
`;

export default Page404;