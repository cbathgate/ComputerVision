import React, { cloneElement } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/main.css';
import {getAllTeachersClasses} from './helpers/viewHelpers.js';

// setting a key with the index is an anti-pattern
// https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
// used to generate a unique key for react mapped components
import shortid from 'shortid';

// components
import PostIt from './PostIts.jsx';

class HomeView extends React.Component {
  
  render() {
    return (
      <div className="col-sm-10 mainContent">
        <h3>My Classes</h3>
          <div className="postIts">
            {this.props.classes.map((course, key) => {
              return <PostIt class={course} key={shortid.generate()} handlePostItClick={this.props.handlePostItClick}/>
            })}
          </div>
        <h3>Most Recent Test Results</h3>
        <div className="testTitle">
          <div className="titleText">
            <h4>Test Title</h4>
          </div>
          <img className="graphFake"src="../assets/graph-sample.jpg"></img>
        </div>
      </div>
    );
  }
}

export default HomeView;

