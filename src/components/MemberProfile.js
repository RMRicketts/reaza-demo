import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => {
  return {
    spacer: {
      marginTop: "2vh"
    },
    avatar: {
      height: theme.spacing(20),
      width: theme.spacing(20)
    },
    blackBackground2: {
      background: "black",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(2)
    },
    blackBackground: {
      background: "black",
      padding: theme.spacing(1)
    },
    whiteText: {
      color: "white"
    }
  };
};

class MemberProfile extends React.Component {
  render() {
    let { classes, member, office } = this.props;
    return (
      <Grid container direction="column">
        <Grid item>
          <div className={classes.blackBackground}>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h6" className={classes.whiteText}>
                  REAL ESTATE AGENT HISTORY REPORT
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-evenly">
            <Grid item>
              <Grid container direction="column" justify="space-evenly">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">Report For:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{member.MemberFullName}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">Phone Number:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{member.MemberDirectPhone}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" justify="space-evenly">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">License Type:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>State</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">License Number:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{member.MemberStateLicense}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" justify="space-evenly">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">Brokerage:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{office.OfficeName}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">Brokerage Address:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{office.OfficeAddress1}</Typography>
                      <Typography>
                        {office.OfficeCity}, {office.OfficeStateOrProvince}{" "}
                        {office.OfficePostalCode}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" justify="space-evenly">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">Report Generated:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{new Date().toLocaleString()}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">Report Expires:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{new Date().toLocaleString()}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.spacer} />
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Grid container direction="row" spacing={4}>
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    src={member.ONEKEY_AgentPhotoURL}
                    variant="square"
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="body1">
                        {member.MemberFullName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        Years Experience:{" "}
                        {Math.ceil(
                          (new Date() -
                            new Date(member.OriginalEntryTimestamp)) /
                            (365 * 24 * 60 * 60 * 1000)
                        )}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        Languages: English{" "}
                        {member.MemberLanguages.filter(l => {
                          return l.toLowerCase() !== "english";
                        }).join(" ")}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        Reaza Index: {Math.round(Math.random() * 50) + 50}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        Properties Score: {Math.round(Math.random() * 50) + 50}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.spacer} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(MemberProfile);
