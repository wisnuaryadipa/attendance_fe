import Select, {SelectProps} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { capitalize } from '@mui/material/utils';
import { HTMLAttributes } from 'react';

interface Props extends SelectProps {
    dataList: any[]

}

const SelectComponent = (props: Props) => {

    const datas = props.dataList as any[];
    const label = props.label as string;

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{capitalize(label)}</InputLabel>
            <Select 
                defaultValue={props.defaultValue}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard" {...props}>
                {
                    datas.map((data) => (
                        <MenuItem key={data.id} value={data.id} >{capitalize(data.name)}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )

}

export default SelectComponent;