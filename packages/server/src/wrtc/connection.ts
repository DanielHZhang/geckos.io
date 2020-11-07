// @ts-nocheck
import {EventEmitter} from 'events';
import {ChannelId} from '@rtcweb/common/lib/types';

export default class Connection extends EventEmitter {
  id: ChannelId;
  state: 'open' | 'closed';

  constructor(id: ChannelId) {
    super();
    this.id = id;
    this.state = 'open';
  }

  close() {
    this.state = 'closed';
    this.emit('closed');
  }

  toJSON() {
    return {
      id: this.id,
      state: this.state,
    };
  }
}
