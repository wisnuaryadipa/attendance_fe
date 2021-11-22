import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import buttonStyles from '@components/button/buttonStyles'

const StyledButton = styled((props) => (
    <Button componentsProps= {{ thumb: {className: 'buttonThumb'} }} {...props} />
))`
    ${buttonStyles};
`;

export default StyledButton;

