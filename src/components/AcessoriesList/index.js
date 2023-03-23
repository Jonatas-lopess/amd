import { Checkbox, List, ListItem, ListItemText } from "@mui/material";

const AcessoriesList = ({ data, handleToggle }) => <List>
    {
        data.map(element =>
            <ListItem
                key={element.id}
                secondaryAction={ <Checkbox edge="end" id={element.id} onChange={value => handleToggle(value)} checked={element.check === 1} /> }
            >
                <ListItemText id={`label_${element.id}`} primary={element.name} />
            </ListItem>
        )
    }
</List>

export default AcessoriesList;