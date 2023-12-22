import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Actions from './Actions';
import moment from "moment";



 function PostCard(props) {
  const {user , _id, title, content, image, createdOn} = props.post;

  return (
    <Card sx={{ maxWidth: "100%", borderRadiu:"10px" }} id={_id} elevation={10}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name.slice(0,1)}
          </Avatar>
        }
        action={
          <Actions id={_id} />
        }
        title={title}
        subheader={moment(createdOn).fromNow()}
      />
      <CardMedia
        component="img"
        height="550"
        image={image}
        alt={user}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;