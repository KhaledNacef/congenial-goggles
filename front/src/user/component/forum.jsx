import { Container, Button, IconButton, Card, CardContent, CardActions, Typography, CardMedia, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';

const Forum = () => {
    const [forums, setForums] = useState([]);

    // Function to handle adding a new forum
    const handleAddForum = () => {
        // Dummy data for a new forum
        const newForum = {
            image: 'forum_image_url.jpg', // Replace 'forum_image_url.jpg' with the actual image URL
            description: 'Description of the forum',
            likes: 0,
            comments: [],
            shares: 0
        };
        // Add the new forum to the forums array
        setForums([...forums, newForum]);
    };

    return (
        <Container sx={{ width: '80%', height: '100vh' }}>
            {/* Button to add a new forum */}
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddForum}
                sx={{ marginBottom: '20px' }}
            >
                Add Forum
            </Button>

            {/* Display forums */}
            <Stack spacing={2}>
                {forums.map((forum) => (
                    <Card key={forum.id}>
                        {/* Forum image */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={forum.image}
                            alt="Forum Image"
                        />
                        <CardContent>
                            {/* Forum description */}
                            <Typography gutterBottom variant="h5" component="div">
                                {forum.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            {/* Like icon */}
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                                {/* Number of likes */}
                                <Typography>{forum.likes}</Typography>
                            </IconButton>
                            {/* Comment icon */}
                            <IconButton aria-label="comment">
                                <CommentIcon />
                                {/* Number of comments */}
                                <Typography>{forum.comments.length}</Typography>
                            </IconButton>
                            {/* Share icon */}
                            <IconButton aria-label="share">
                                <ShareIcon />
                                {/* Number of shares */}
                                <Typography>{forum.shares}</Typography>
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}

export default Forum;
