import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDYyZ-gtSa7NzX7o_1qy4Idu06ClZg3bE0';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selVideo: null
    };

    this.videoSearch('surfboard');
  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selVideo: videos[0]
      });
    });
  }


  render() {

    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 600);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selVideo}/>
        <VideoList
          onVideoSelect={selVideo => this.setState({selVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}


// Display component in HTML
ReactDOM.render(<App/>, document.querySelector('.container'));
