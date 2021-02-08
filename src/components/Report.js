import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MemberProfile from "./MemberProfile";
import SalesTable from "./SalesTable";
import SalesFigs from "./SalesFigs";
import Listings from "./Listings";
const st = "f85196cc518722564bb5f8093ac7aa02";

const useStyles = theme => {
  return {
    spacer: {
      marginTop: "2vh"
    },
    blackBackground: {
      background: "black",
      padding: theme.spacing(1)
    },
    whiteText: {
      color: "white"
    },
    divider: {
      background: "black"
    }
  };
};

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberProfile: {},
      memberOffice: {},
      properties: []
    };
    this.getMember = this.getMember.bind(this);
    this.getAssociatedProperties = this.getAssociatedProperties.bind(this);
    this.getMemberOffice = this.getMemberOffice.bind(this);
  }

  componentDidMount() {
    this.getMember();
  }

  getMember() {
    axios
      .get(
        `https://api.bridgedataoutput.com/api/v2/OData/onekey/Member?access_token=${st}&$filter=MemberNationalAssociationId eq '${this.props.match.params.mid}' or MemberMlsId eq '${this.props.match.params.mid}'`
      )
      .then(res => {
        if (res.data.value.length === 0) {
          this.props.history.push("/");
          return;
        }
        this.getMemberOffice(res.data.value[0].OfficeKey);
        this.getAssociatedProperties(res.data.value[0].MemberKey);
        this.setState({
          memberProfile: res.data.value[0]
        });
      })
      .catch(console.log);
  }

  getAssociatedProperties(id) {
    axios
      .get(
        `https://api.bridgedataoutput.com/api/v2/OData/onekey/Property?access_token=${st}&$filter=CoListAgentKey eq '${id}' or ListAgentKey eq '${id}' or BuyerAgentKey eq '${id}' or CoBuyerAgentKey eq '${id}'`
      )
      .then(res => {
        this.setState({
          properties: res.data.value
        });
      })
      .catch(console.log);
  }

  getMemberOffice(id) {
    axios
      .get(
        `https://api.bridgedataoutput.com/api/v2/OData/onekey/Office?access_token=${st}&$filter=OfficeKey eq '${id}'`
      )
      .then(res => {
        this.setState({
          memberOffice: res.data.value[0]
        });
      })
      .catch(console.log);
  }

  render() {
    let { classes } = this.props;
    let { state } = this;
    return (
      <Container maxWidth="lg">
        {Object.keys(state.memberProfile).length === 0 ||
        Object.keys(state.memberOffice).length === 0 ? (
          <div>loading...</div>
        ) : (
          <div>
            <div className={classes.spacer} />
            <div>
              <Typography>Reaza.com</Typography>
              <Typography>Realstats • Realagents • Realresults</Typography>
            </div>
            <MemberProfile
              member={state.memberProfile}
              office={state.memberOffice}
            />
            <Divider classes={{ root: classes.divider }} />
            <div className={classes.spacer} />
          </div>
        )}
        {Object.keys(state.properties).length === 0 ? (
          <div />
        ) : (
          <div>
            <SalesTable
              properties={state.properties}
              memberKey={state.memberProfile.MemberKey}
            />
            <div className={classes.spacer} />
            <Divider classes={{ root: classes.divider }} />
            <div className={classes.spacer} />
            <SalesFigs
              properties={state.properties}
              memberKey={state.memberProfile.MemberKey}
            />
            <div className={classes.spacer} />
            <Divider classes={{ root: classes.divider }} />
            <div className={classes.spacer} />
            <div className={classes.blackBackground}>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <Typography className={classes.whiteText}>
                    MOST RECENT ACTIVE LISTINGS
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Listings properties={state.properties} />
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(withStyles(useStyles)(Report));
