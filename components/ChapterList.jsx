import React from 'react';
import fetch from 'isomorphic-unfetch';
import { withRouter } from 'next/router';

// import { Container } from './styles';

export class ChapterList extends React.Component {
  constructor(props) {
    super(props);
    if (props.id === undefined) throw '需要传输ComicID';

    this.state = {
      desc: true
    };
  }

  componentDidMount() {
    (async () => {
      const res = await fetch(
        'http://192.168.1.82:3000/api/getChapterList?id=' + this.props.id
      );
      const data = await res.json();
      this.setState({ chapters: data });
    })();
  }

  handleChapter(cid) {
    this.props.router.push('/[id]/[cid]', `/${this.props.id}/${cid}`);
  }

  render() {
    return (
      (this.state.chapters && (
        <div>
          {/* {'上次更新：' &&
          new Date(state.chapters[0].create_time).toLocaleString()} */}
          <div className='px-3 mt-2 flex justify-between w-full'>
            <button
              className='text-gray-600'
              onClick={() =>
                this.setState({
                  desc: !this.state.desc,
                  chapters: this.state.chapters.reverse()
                })
              }
            >
              {(this.state.desc && '降序') || '升序'}
            </button>
          </div>
          <div className='grid grid-cols-4'>
            {this.state.chapters.map(c => (
              <button
                key={c.chapter_id}
                className='m-2 py-1 rounded border text-center'
                onClick={this.handleChapter.bind(this, c.chapter_id)}
              >
                {c.chapter_name}
              </button>
            ))}
          </div>
        </div>
      )) || (
        <h1 className='text-center py-2 text-gray-400'> 加载中，请稍等...</h1>
      )
    );
  }
}

export default withRouter(ChapterList);
