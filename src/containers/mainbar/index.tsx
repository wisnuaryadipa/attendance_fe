import react, {FC} from 'react'
import styled from 'styled-components';

const mainBar: FC = styled((props) => (
        <div className="mainBar" {...props}>
                MainBar
        </div>
))`
        flex: 5;
`;

export default mainBar;