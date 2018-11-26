import React from "react";
import { Grid, Header, Container, Segment } from "semantic-ui-react";

import "./Footer.css";

export default () => {
  return (
    // <!-- Footer -->
    <div className="Footer">
      <Grid style={{ marginTop: 5 }}>
        <Grid.Column>
          <Segment
            // inverted
            vertical
            style={{ padding: "3em 0em", backgroundColor: "#616774" }}
          >
            <Container textAlign="center">
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Header as="h4" color="teal">
                      Copyright &copy; {new Date().getFullYear()} Dev Profile
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};
