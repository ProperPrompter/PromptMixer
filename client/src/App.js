import React from 'react';
import './App.css';
import './Gallery/Gallery.css';
import Gallery from './Gallery/Gallery';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLock,
  faUnlockAlt,
  faSync,
  faPlus,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';

library.add(faUnlockAlt, faSync, faPlus, faCopy, faLock);

function App() {
  return (
    <div className="App">
      <Gallery />
    </div>
  );
}

export default App;
