import React, {Children, FC} from 'react';
import { css } from 'styled-components';
import StyledButton from '@components/button/StyledButton'
import Wrapper from './Wrapper';


interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
    
  handleRoute: Function,
  href: string,
  onClick: React.MouseEventHandler,
  children: React.ReactNode,

}

const Button: FC<IButton> = (props) => {

    let button = (
        <StyledButton>
            {Children.toArray(props.children)}
        </StyledButton>
    )

    return <Wrapper>{button}</Wrapper>
}

export default Button;