import React from 'react';
import Box from '3box';
import SVG from 'react-inlinesvg';

import ChatBox from '../src/index';
import Logo from '../src/assets/3BoxLogoWhite.svg';

import './index.scss';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // box: {},
      myProfile: {},
      myAddress: '',
      isReady: false,
    }
  }

  componentDidMount() {
    this.handleLogin();
  }

  handleLogin = async () => {
    const addresses = await window.ethereum.enable();
    const myAddress = addresses[0];

    const box = await Box.openBox(myAddress, window.ethereum, {});
    const myProfile = await Box.getProfile(myAddress);
    await box.syncDone;
    this.setState({ box, myProfile, myAddress, isReady: true });
  }

  render() {
    const {
      box,
      myAddress,
      myProfile,
      isReady
    } = this.state;

    return (
      <div className="App">
        <div className="example_page">
          <div className="example_page_header">
            <SVG src={Logo} alt="Logo" className="example_page_header_logo" />
            <h2>Chatbox <br /> Demo</h2>
          </div>
          <div className="userscontainer">
            {isReady && (
              <ChatBox
                // required
                // spaceName='3boxtestcomments'
                // threadName='ghostChatTest5'
                spaceName='MyFollowingTest'
                // spaceName='MyFollowing'
                threadName='chatbox'

                // case A & B
                box={box}
                currentUserAddr={myAddress}

                // case B
                // loginFunction={this.handleLogin}

                // case C
                // ethereum={window.ethereum}

                // optional
                // mute
                openOnMount
                popupChat
              // colorTheme="#1168df"
              // spaceOpts={{}}
              // useHovers={true}
              // currentUser3BoxProfile={myProfile}
              // userProfileURL={(address) => `https://userprofiles.co/user/${address}`}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Example;