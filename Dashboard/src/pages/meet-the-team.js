import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Person from '../components/person';

  

const MeetTheTeam = () => {
    return <>
        <Container maxWidth="xl" component="main">
            <Grid container justify='center' style={{padding: '10px', paddingTop: '30px'}}>
                <Grid item xs={12} md={10}>
                    <Paper>
                    <Typography component="h4" variant="h4" align="center" color="textPrimary">
                        Meet the Team
                    </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Grid item xs={12} md={5} style={{padding: '10px'}}>
                    <Person 
                        name='Taarak Rapolu'
                        country='India'
                        specialty='Modeling and Analysis'
                        photoUrl='/team/Taarak-Rapolu.jpg'
                        linkedinUrl='https://www.linkedin.com/in/taarak-rapolu/'
                        />
                </Grid>
                <Grid item xs={12} md={5} style={{padding: '10px'}}>
                    <Person 
                        name='Brahmani Nutakki'
                        country='India'
                        specialty='Modeling and Analysis'
                        photoUrl='/team/Brahmani-Nutakki.jpg'
                        linkedinUrl='https://www.linkedin.com/in/brahmani-nutakki/'
                        /> 
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Grid item xs={12} md={4} style={{padding: '10px'}}>
                    <Person 
                        name='Raakhal Rapolu'
                        country='India'
                        specialty='Modeling and Analysis'
                        photoUrl='/team/Raakhal-Rapolu.jpg'
                        linkedinUrl='https://www.linkedin.com/in/raakhal-rapolu/'
                        />  
                </Grid>
                <Grid item xs={12} md={4} style={{padding: '10px'}}>
                    <Person 
                        name='Alfonso Prado'
                        country='Chile'
                        specialty='Front-End Developer'
                        photoUrl='/team/Alfonso-Prado.jpg'
                        linkedinUrl='https://www.linkedin.com/in/alfonsoprado/'
                        />
                </Grid>
                <Grid item xs={12} md={4} style={{padding: '10px'}}>
                    <Person 
                        name='Subhash Sarangi'
                        country='India'
                        specialty='Back-End Developer'
                        photoUrl='/team/Subhash-Sarangi.jpg'
                        linkedinUrl='https://www.linkedin.com/in/subhash-sarangi-568765163/'
                        /> 
                </Grid>
            </Grid>
        </Container>
    </>;
}

export default MeetTheTeam;
