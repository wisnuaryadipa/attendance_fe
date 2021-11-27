import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import buttonStyles from '@components/button/buttonStyles'

const StyledButton = styled((props, child) => (
    <Button componentsProps= {{ thumb: {className: 'buttonThumb'} }} {...props} ></Button>
))`
    ${buttonStyles};
`;

export default StyledButton;

