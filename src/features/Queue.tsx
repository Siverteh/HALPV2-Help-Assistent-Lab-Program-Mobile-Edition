import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const Queue = () => {

    const handleEdit = () => {
        
    }

    const handleCancel = () => {

    }

    return (
        <Box sx={{ borderRadius: 1 }} alignItems='center'>
            <Typography mt={2} variant="h4">
                Hi
            </Typography>

            <Typography mt={2} variant="h6">
                You are number
            </Typography>

            <Typography mt={1} variant="h1">
                838
            </Typography>

            <Typography mt={1} variant="h6">
                in the queue
            </Typography>

            <Button onClick={handleEdit}>
                Edit ticket
            </Button>
            <Button onClick={handleCancel}>
                Cancel ticket
            </Button>
        </Box>
    )
}

export default Queue