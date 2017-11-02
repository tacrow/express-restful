'use strict';

import React from 'react';

export default class LoadingIndicator extends React.Component {
  render() {
    return(
      <div>
        <img src="./public/img/loading.gif" width="64" alt="loading-indicator" />
      </div>
    );
  }
}