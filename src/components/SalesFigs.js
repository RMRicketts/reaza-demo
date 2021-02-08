import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => {
  return {};
};

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

class SalesFigs extends React.Component {
  render() {
    let { properties, memberKey } = this.props;
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={9}>
            <Grid item>
              <Typography>TOTAL PAST SALES</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {formatter.format(
                  properties.reduce((prev, next) => {
                    return prev.ListPrice + next.ListPrice;
                  })
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={3}>
            <Grid item>
              <Typography>REPRESENTED</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>SELLER</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {Math.round(
                      (properties.filter(p => {
                        return (
                          (p.ListAgentKey === memberKey ||
                            p.CoListAgentKey === memberKey) &&
                          p.BuyerAgentKey !== memberKey &&
                          p.CoBuyerAgentKey !== memberKey
                        );
                      }).length /
                        properties.length) *
                        100
                    )}
                    %
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>BUYER</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {Math.round(
                      (properties.filter(p => {
                        return (
                          p.ListAgentKey !== memberKey &&
                          p.CoListAgentKey !== memberKey &&
                          (p.BuyerAgentKey === memberKey ||
                            p.CoBuyerAgentKey === memberKey)
                        );
                      }).length /
                        properties.length) *
                        100
                    )}
                    %
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>BOTH</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {Math.round(
                      (properties.filter(p => {
                        return (
                          (p.ListAgentKey === memberKey ||
                            p.CoListAgentKey === memberKey) &&
                          (p.BuyerAgentKey === memberKey ||
                            p.CoBuyerAgentKey === memberKey)
                        );
                      }).length /
                        properties.length) *
                        100
                    )}
                    %
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={6}>
            <Grid item>
              <Typography>TOTAL ACTIVE LISTING</Typography>
            </Grid>
            <Grid item>
              <Typography>
                {formatter.format(
                  properties.reduce((prev, next) => {
                    return prev.ListPrice + next.ListPrice;
                  })
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(SalesFigs);
