import Select, {SelectProps} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { capitalize } from '@mui/material/utils';
import { HTMLAttributes } from 'react';
import { stringify } from 'qs';

interface Props extends SelectProps {
    dataList: any[]
    argsLabel?: string[] | string

}


const SelectComponent = (props: Props) => {

    const datas = props.dataList as any[];
    const label = props.label as string;


    
    const MenuItems = () => {
        return datas.map((data) => {

            let name = "";
            if (props.argsLabel){
                if (Array.isArray(props.argsLabel)){
                    for (const key in props.argsLabel) {
                        if(props.argsLabel[key].substring(0,1) === "!") {
                            const _remDesign = props.argsLabel[key].substring(1, props.argsLabel[key].length);
                            const _splited = _remDesign.split('.');
                            let _name = data;
                                for (const key in _splited) {
                                    _name = _name[_splited[key]]
                                }
                            name = name + `${_name}`
                        } else (
                            name = name + ` ${props.argsLabel[key]} `
                        )
                    }
                } else {
                    
                }
            } else {
                name = data.name
            }

            return (
                <MenuItem key={data.id} value={data.id} >{capitalize(name)}</MenuItem>
            )
        })
    }
    

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{capitalize(label)}</InputLabel>
            <Select 
                defaultValue={props.defaultValue}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard" {...props}>
                {MenuItems()}
            </Select>
        </FormControl>
    )

}

export default SelectComponent;