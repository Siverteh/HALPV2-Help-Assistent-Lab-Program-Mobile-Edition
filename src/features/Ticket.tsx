import { Ticket } from "../types/ticket"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import { useState } from "react"
import isEmpty from "lodash/isEmpty"
import v from "lodash/values"
import every from "lodash/every"


type Props = {
    rooms: Array<string> // can also be a hook
    ticket?: Ticket
    onSubmit: (ticket: Ticket) => {}
}

const Ticket = ({
    onSubmit,
    ticket,
    rooms
}: Props) => {

    const [value, setValue] = useState<Ticket | null>(ticket ?? null)

    const handleChange = (name: string) =>  (event: any) =>{
        setValue(prev => {return {...prev, [name]: event.target.value} as any})
    }

    const isValidValue =  value && v(value).every(isEmpty)

    return (
        <Box>
            <TextField
                label='Name'
                onChange={handleChange('name')}
                value={value?.name}
            />

            <TextField
                label="Description"
                onChange={handleChange('description')}
                value={value?.description}
            />

            <Select
                label='Room'
                value={value?.room}
                onChange={handleChange('room')}
            >
                {rooms.map(r => 
                    <MenuItem value={r}>{r}</MenuItem>
                )}
            </Select>

            <Button
                variant="contained"
                disabled={!isValidValue}
                onClick={() => onSubmit(value!)}
            >
                Save
            </Button>

        </Box>
    )

}

export default Ticket