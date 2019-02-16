import React, { Component } from 'react';
import { Saas } from '../modules';
import { SAAS } from '../config';

class SaasList extends Component {
  state = { snapshot: '', sortBy: '', sortList: '' };

  async componentDidMount() {
    await this.setState({ sortList: Object.keys(SAAS.SORT) });
    await this.setState({ sortBy: this.state.sortList[0] });
    await this.sortBySelectedKey();
  }

  sortBySelectedKey = async (sortBy = this.state.sortBy) => {
    const snapshot = await Saas.sortedData(sortBy);
    this.setState({ snapshot: snapshot });
  };

  render() {
    const snapshot = this.state.snapshot;
    const sortList = this.state.sortList;
    return (
      <React.Fragment>
        <select
          value={this.state.sortBy}
          onChange={e => {
            this.setState({ sortBy: e.target.value });
            this.sortBySelectedKey(e.target.value);
          }}
        >
          {sortList &&
            sortList.map(sortBy => {
              return (
                <option key={sortBy} value={sortBy}>
                  {SAAS.SORT[sortBy]}
                </option>
              );
            })}
        </select>
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
