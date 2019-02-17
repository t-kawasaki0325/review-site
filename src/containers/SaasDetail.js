import React, { Component } from 'react';
import { Header } from '../components';
import { Saas } from '../modules';
import { UrlUtil } from '../utils';

class SaasDetail extends Component {
  state = {
    saas: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const snapshot = await Saas.sassInfoById(
      UrlUtil.baseUrl(history.location.pathname)
    );
    this.setState({ saas: snapshot.data() });
  }

  render() {
    const { history } = this.props;

    return <Header history={history} />;
  }
}

export default SaasDetail;
