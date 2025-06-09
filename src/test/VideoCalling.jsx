import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoCalling = () => {
  const [roomName, setRoomName] = useState('');
  const [jitsiToken, setJitsiToken] = useState('');

  const sectionId = '683c6e6fcb47804121e75e4d';
  const accessToken = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('userName') || 'Langzy Student';

  // Step 1: Fetch room name and generate Jitsi token
  useEffect(() => {
    const fetchRoomAndToken = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/call/session/${sectionId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        );

        if (res.data?.data?.roomName) {
          const fetchedRoomName = res.data.data.roomName;
          setRoomName(fetchedRoomName);

          const tokenRes = await axios.post(
            `http://localhost:3000/api/jitsi/get-token`,
            { room: fetchedRoomName },
            {
              headers: { Authorization: `Bearer ${accessToken}` }
            }
          );

          setJitsiToken(tokenRes.data.token);
        }
      } catch (err) {
        console.error('Failed to fetch session or token:', err);
      }
    };

    fetchRoomAndToken();
  }, []);

  // Step 2: Inject Jitsi iframe after room and token are ready
  useEffect(() => {
    if (!roomName || !jitsiToken) return;

    const initializeJitsi = () => {
      // NOTE: domain must be host only—no port here
      const domain = 'localhost';

      // Build the complete iframe URL for debugging
      const finalURL = `http://localhost:8000/${roomName}?jwt=${jitsiToken}`;
      console.log('[🔗 Jitsi IFRAME URL]', finalURL);
      // For example you will see: 
      // [🔗 Jitsi IFRAME URL] http://localhost:8000/LANGZY-GER-EVE-A1-abc123?jwt=eyJh...

      const options = {
        roomName,
        jwt: jitsiToken,
        width: '100%',
        height: 600,
        parentNode: document.getElementById('jitsi-container'),
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone',
            'camera',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            'hangup',
            'profile',
            'chat',
            'etherpad',
            'sharedvideo',
            'settings',
            'raisehand',
            'videoquality',
            'tileview',
            'download',
            'mute-everyone',
            'security'
          ],
          SHOW_JITSI_WATERMARK: false
        },
        userInfo: {
          displayName: userName
        },
        // Only override serviceUrl—do NOT include port in domain or hosts.domain
        serviceUrl: 'http://localhost:8000/http-bind'
      };

      new window.JitsiMeetExternalAPI(domain, options);
    };

    if (window.JitsiMeetExternalAPI) {
      initializeJitsi();
    } else {
      const script = document.createElement('script');
      script.src = 'http://localhost:8000/external_api.js'; // Self-hosted Jitsi
      script.async = true;
      script.onload = initializeJitsi;
      document.body.appendChild(script);
    }
  }, [roomName, jitsiToken]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Langzy Video Room</h2>
      <div
        id="jitsi-container"
        className="w-full border rounded-lg overflow-hidden shadow-md"
        style={{ height: '600px' }}
      />
    </div>
  );
};

export default VideoCalling;
