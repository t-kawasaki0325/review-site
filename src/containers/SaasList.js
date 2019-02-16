import React, { Component } from 'react';
import { Saas } from '../modules';

class SaasList extends Component {
  state = { snapshot: '' };

  async componentDidMount() {
    const snapshot = await Saas.getAllSaas();
    this.setState({ snapshot: snapshot });
  }

  render() {
    const snapshot = this.state.snapshot;
    return (
      <React.Fragment>
        {snapshot &&
          snapshot.docs.map(doc => {
            const saas = doc.data();
            return (
              <p key={doc.id}>
                {saas.name} {saas.category}
              </p>
            );
          })}
      </React.Fragment>
    );
  }
}

export default SaasList;
