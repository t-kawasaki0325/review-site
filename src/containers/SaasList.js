import React, { Component } from 'react';
import { Saas } from '../modules';
import { SAAS, COMPANY } from '../config';

class SaasList extends Component {
  state = {
    snapshot: '',
    sortBy: '',
    sortList: '',
    name: '',
    category: 0,
    serviceType: 0,
    scale: 0,
    region: 0,
  };

  async componentDidMount() {
    await this.setState({ sortList: Object.keys(SAAS.SORT) });
    await this.setState({ sortBy: this.state.sortList[0] });
    await this.searchSaas();
  }

  searchSaas = async (sortBy = this.state.sortBy) => {
    const query = {
      name: this.state.name,
      category: this.state.category,
      companyServiceType: this.state.serviceType,
      companyScale: this.state.scale,
      companyRegion: this.state.region,
    };

    const snapshot = await Saas.searchSaas(sortBy, query);
    this.setState({ snapshot: snapshot });
  };

  render() {
    const snapshot = this.state.snapshot;
    const sortList = this.state.sortList;

    return (
      <React.Fragment>
        <select
          value={this.state.category}
          onChange={e => this.setState({ category: parseInt(e.target.value) })}
        >
          {SAAS.CATEGORY.map((element, index) => {
            return (
              <option key={index} value={index}>
                {element}
              </option>
            );
          })}
        </select>
        <select
          value={this.state.companyServiceType}
          onChange={e =>
            this.setState({ companyServiceType: parseInt(e.target.value) })
          }
        >
          {COMPANY.SERVICE_TYPE.map((element, index) => {
            return (
              <option key={index} value={index}>
                {element}
              </option>
            );
          })}
        </select>
        <select
          value={this.state.companyScale}
          onChange={e =>
            this.setState({ companyScale: parseInt(e.target.value) })
          }
        >
          {COMPANY.SCALE.map((element, index) => {
            return (
              <option key={index} value={index}>
                {element}
              </option>
            );
          })}
        </select>
        <select
          value={this.state.companyRegion}
          onChange={e =>
            this.setState({ companyRegion: parseInt(e.target.value) })
          }
        >
          {COMPANY.REGION.map((element, index) => {
            return (
              <option key={index} value={index}>
                {element}
              </option>
            );
          })}
        </select>
        <button onClick={() => this.searchSaas()}>submit</button>
        <select
          value={this.state.sortBy}
          onChange={e => {
            this.setState({ sortBy: e.target.value });
            this.searchSaas(e.target.value);
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
