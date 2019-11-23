import React from 'react';

import './style.css';
import logo from '../../img/logo_ipueira.png';

export default function ToolBar() {
  return (
    <div className="ToolBar">
      <img src={logo} alt="Ipueira" className="logo"/>
      <span>IPUEIRA - SIG Saneamento</span>
    </div>
  );
}
