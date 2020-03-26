import { withRouter } from 'next/router';
import React from 'react';

export class ChapterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: true
    };
  }

  handleChapter(cid) {
    this.props.router.push('/[id]/[cid]', `/${this.props.id}/${cid}`);
  }

  render() {
    return (
      (this.props.chapters && (
        <div>
          {/* {'上次更新：' &&
          new Date(state.chapters[0].create_time).toLocaleString()} */}
          <div className='px-3 mt-2 flex justify-between w-full'>
            <button
              className='text-gray-600'
              onClick={() =>
                this.setState({
                  desc: !this.state.desc
                })
              }
            >
              {(this.state.desc && '降序') || '升序'}
            </button>
          </div>
          <div className='grid grid-cols-4'>
            {(
              (this.state.desc && this.props.chapters) ||
              this.props.chapters.reverse()
            ).map(c => (
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
