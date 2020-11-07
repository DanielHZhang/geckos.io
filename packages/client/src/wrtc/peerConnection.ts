import ConnectionsManagerClient from './connectionsManager';
import {ERRORS} from '@rtcweb/common/lib/constants';
import {ChannelId} from '@rtcweb/common/lib/types';

export default class PeerConnection {
  localPeerConnection: RTCPeerConnection;
  dataChannel: RTCDataChannel;
  id: ChannelId;

  async connect(connectionsManager: ConnectionsManagerClient) {
    let webRTCPcSupported =
      RTCPeerConnection ||
      webkitRTCPeerConnection ||
      // @ts-ignore
      mozRTCPeerConnection;

    if (webRTCPcSupported) {
      const {
        localPeerConnection,
        dataChannel,
        id,
        userData,
        error,
      } = await connectionsManager.connect();

      if (error) return {error};

      if (!localPeerConnection || !dataChannel || !id || !userData)
        return {error: new Error('Something went wrong in "await connectionsManager.connect()"')};

      this.localPeerConnection = localPeerConnection;
      this.dataChannel = dataChannel;
      this.id = id;

      return {userData};
    } else {
      let error = new Error(ERRORS.BROWSER_NOT_SUPPORTED);
      console.error(error.message);
      return {error};
    }
  }
}
