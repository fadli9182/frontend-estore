// Websocket dependency
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// pemakaian dev
export const WS_HOST = '192.168.99.14';

// pemakaian saat akan build
// export const WS_HOST = '36.89.114.246';
export const WS_KEY = 'app-key';
export const WS_PORT = '6001';

// Websocket init
const ws_host = WS_HOST;
const ws_key = WS_KEY;
const ws_port = WS_PORT;

export const f_initWebsocket = () => {
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: ws_key,
    wsHost: ws_host,
    wsPort: ws_port,
    // forceTLS: false,
    encrypted: false,
    disableStats: true,
    enabledTransports: ['ws'],
    cluster: 'ap1'
  });
};
