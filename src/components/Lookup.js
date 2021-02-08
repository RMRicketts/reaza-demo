import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = theme => {
  theme.palette.background.default = "#263238";
  theme.palette.text.secondary = "rgba(255, 255, 255, .80)";
  return {
    tall: {
      height: "100vh"
    }
  };
};

class Lookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mlsId: ""
    };

    this.updateMLS = this.updateMLS.bind(this);
    this.forward = this.forward.bind(this);
  }

  updateMLS(e) {
    this.setState({
      mlsId: e.target.value
    });
  }

  forward(e) {
    if (e.keyCode === 13) {
      console.log(this.props)
      this.props.history.push(`/${this.state.mlsId}`);
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            className={this.props.classes.tall}
          >
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <Grow in={true}>
                    <Typography variant="h1" color="textSecondary">
                      R
                    </Typography>
                  </Grow>
                </Grid>
                <Grid item>
                  <Grow in={true} timeout={500}>
                    <Typography variant="h1" color="textSecondary">
                      E
                    </Typography>
                  </Grow>
                </Grid>
                <Grid item>
                  <Grow in={true} timeout={1000}>
                    <Typography variant="h1" color="textSecondary">
                      A
                    </Typography>
                  </Grow>
                </Grid>
                <Grid item>
                  <Grow in={true} timeout={1500}>
                    <Typography variant="h1" color="textSecondary">
                      Z
                    </Typography>
                  </Grow>
                </Grid>
                <Grid item>
                  <Grow in={true} timeout={2000}>
                    <Typography variant="h1" color="textSecondary">
                      A
                    </Typography>
                  </Grow>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                label="MLS ID"
                variant="filled"
                onChange={this.updateMLS}
                onKeyUp={this.forward}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Lookup);
