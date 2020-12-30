import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  });
  

const Person = (props) => {
    const classes = useStyles();
    const {
        name,
        photoUrl,
        country, 
        specialty,
        linkedinUrl = '#'
    } = props;

    return <CardActionArea component="a" href={linkedinUrl}>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                    <Typography component="h2" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {country}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {specialty}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        Linkedin
                    </Typography>
                    </CardContent>
                </div>
                <CardMedia className={classes.cardMedia} image={photoUrl} title={name} />
            </Card>
        </CardActionArea>;
}

export default Person;