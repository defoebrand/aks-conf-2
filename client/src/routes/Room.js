import React, {
  useEffect,
  useRef,
  useState
} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div `

    position: fixed;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;

    /* height: 100vh; */

    /* width: 90%; */

    /* margin: auto; */
    border-radius: 25px;
    border: 10px solid #462305;
    background: rgb(11, 167, 87);

    /* background-image: url("..client/public/chalkboard.png"); */

    /* background-color: greenrgb(); */
`;

const StyledVideo = styled.video `

    height: 40%;
    width: 25%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, [props.peer]);

  return ( <
    StyledVideo autoPictureInPicture controls playsInline autoPlay ref = {
      ref
    }
    />
  );
}

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const peersRef = useRef([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const roomID = props.match.params.roomID;


    useEffect(() => {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(stream => {
        userVideo.current.srcObject = stream;
        // userStream.current = stream;

        socketRef.current = io.connect("/");
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", users => {
          const peers = [];
          users.forEach(userID => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            })
            peers.push(peer);
          })
          setPeers(peers);
        })

        socketRef.current.on("user joined", payload => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          setPeers(users => [...users, peer]);
        });
        socketRef.current.on("receiving returned signal", payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });


      })
    }, [roomID]);


    function createPeer(userToSignal, callerID, stream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });


      peer.on("signal", signal => {
        socketRef.current.emit("sending signal", {
          userToSignal,
          callerID,
          signal
        })
      })

      return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      })

      peer.on("signal", signal => {
        socketRef.current.emit("returning signal", {
          signal,
          callerID
        })
      })

      peer.signal(incomingSignal);

      return peer;
    }


    // return ( < div >
    //   <
    //   video autoPlay ref = {
    //     userVideo
    //   }
    //   id = "video1"
    //   muted = "muted" / >
    //
    //   <
    //   / div >
    // );
    // document.querySelector('.sc-bdfBwQ').style.border = "1px solid black";
    // .backgroundImage = "url(chalkboard.png)"
    return ( < Container >
        <
        StyledVideo ref = {
          userVideo
        }
        muted autoPlay playsInline autoPictureInPicture controls / > {
          peers.map((peer, index) => {
              return ( < Video key = {
                  index
                }
                peer = {
                  peer
                }
                />   );
              })
          } <
          /Container > );
        };

        export default Room;