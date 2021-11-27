import React, {Children, FC} from 'react';
import { css } from 'styled-components';
import StyledButton from '@components/button/StyledButton'
import {ButtonProps} from '@material-ui/core'
import Wrapper from './Wrapper';


interface IButton extends ButtonProps {
    
  handleRoute?: Function,
  href?: string,
  onClick?: React.MouseEventHandler,
  children: React.ReactNode,

}

const Button: FC<IButton> = (props) => {

    let button = (
        <StyledButton {...props}>
            {Children.toArray(props.children)}
        </StyledButton>
    )

    return button
}

export default Button;