
type WithDefaultProps<C, D> = C & { defaultProps: D };

function withDefaultProps<C, D>(component: C, defaultProps: D): WithDefaultProps<C, D> {
    (component as WithDefaultProps<C, D>).defaultProps = defaultProps;
    return component as WithDefaultProps<C, D>;
}

export default withDefaultProps;