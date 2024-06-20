import   { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { faStop } from '@fortawesome/free-solid-svg-icons';
import { BsFillFloppyFill } from 'react-icons/bs';
import uploadVideo from '../../services/saveVideo';
 

const VideoRecorder = (props:any) => {
  const webcamRef = useRef<any>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(props.value);
  const [rec, setRec] = useState(false);

  useEffect(() => {
    if (capturedVideo) {
      const e = {
        target: {
          name: 'videolink',
          value: capturedVideo,
        },
      };
      props.onChange(e);
    }

    return () => {
      if (capturedVideo) {
        URL.revokeObjectURL(capturedVideo);
      }
    };
  }, [capturedVideo, props]);

  const handleStartRecording = async () => {
    const stream = webcamRef.current.stream;
    const options = { mimeType: 'video/webm; codecs=vp9' };
    const recorder = new MediaRecorder(stream, options);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setVideoChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = async () => {
      console.log(videoChunks,'videoChunksvideoChunks')
      const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(videoBlob);
      setCapturedVideo(videoUrl);
      setVideoChunks([]);
    };

    setMediaRecorder(recorder);
    setVideoChunks([]);
    recorder.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    console.log(videoChunks,'videoChunksvideoChunks')
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setRecording(false);
    saveVideo()
  };

  const saveVideo = async () => {
    try {
      if (capturedVideo) {
        const videoBlob = await fetch(capturedVideo).then((r) => r.blob());
        const video = await uploadVideo(videoBlob); // Assume uploadVideo is a function to upload the video
        setCapturedVideo(video);
        // const e:any = {
        //   target: {
        //     name: 'videolink',
        //     value: video,
        //   },
        // };
        setRec(true);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    setCapturedVideo(props.value);
  }, [props.value]);

  return (
    <div className="h-full w-full border-4 border-green-600 rounded-xl overflow-hidden">
      <div className="h-full w-full bg-transparent border-red-600 overflow-hidden relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          className="absolute top-0 left-0 h-full w-full object-cover"
        />

        <div className="flex justify-center absolute bottom-4 w-full">
          {recording ? (
            <button
              className="h-[100px] w-30 bg-transparent rounded-full text-red-600"
              onClick={handleStopRecording}
            >
              <FontAwesomeIcon
                icon={faStop}
                style={{ height: '40px', width: '40px' }}
              />
            </button>
          ) : (
            <button
              className="h-[100px] w-30 bg-transparent rounded-full text-blue-600"
              onClick={handleStartRecording}
            >
              <FontAwesomeIcon
                icon={faCircleDot}
                style={{ height: '40px', width: '40px' }}
              />
            </button>
          )}
        </div>

        {capturedVideo && (
          <div className="absolute top-4 left-4">
            <video src={capturedVideo} controls className="h-40 w-40 rounded" />
            {rec && (
              <button
                onClick={() => props.onSaveClick()}
                className="rounded shadow-sm m-2 p-4 w-20 h-full text-blue-500 hover:border-blue-400"
              >
                <BsFillFloppyFill style={{ height: '40px', width: '40px' }} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
