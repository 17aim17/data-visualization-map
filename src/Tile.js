import { Card, Typography } from '@material-ui/core'
export default ({ title, value }) => {
    return (
        <Card style={{ height: '150px', width: '350px', backgroundColor: '#0984e3' }}>
            <Typography variant="subtitle1" component="p">
                {title}
            </Typography>
            <Typography variant="h5" component="h2">
                {value}
            </Typography>
        </Card>
    )
}