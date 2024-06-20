import { useEffect, useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { BsFillFloppyFill } from "react-icons/bs";
import uploadAudio from '../../services/saveAudio';

export default function VoiceRecorder(props: any) {
  const { value } = props;
  const [recordings, setRecordings] = useState<any>([]); // Array to store audio recordings
  const [recaudio,setRecAudio] = useState('')

  const loadAttachment = (audioLink: string) => {
    console.log(value, 'its working ');
    if (audioLink?.length) {
      const audio = document.createElement('audio');
      audio.src = audioLink; // Use audioLink directly instead of value
      audio.controls = true;
      setRecordings([{ audio }]); // Assuming you only need to set the audio element
    }
  };

  useEffect(() => {
    loadAttachment(value);
  }, [props.value]);


  useEffect(() => {
    saveAudio();
  }, [recordings]);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const handleRecordComplete = (blob: any) => {
    console.clear()

    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    const newRecording = { audio, blob };
    setRecordings((prevRecordings: any) => [...prevRecordings, newRecording]); // Add recording to state with blob for upload
    
    
  };

  const saveAudio = async () => {
    
    const recording = recordings[0]; // Assuming you want to upload the first recording only
    if (!recording) return;  
   
    const audioBlob = recording.blob;
    const audioUrl = await uploadAudio(audioBlob); // Upload the blob
    const e = {
      target: {
        name: 'audioLink',
        value: audioUrl,
      },
    };
    props.onChange(e);
    setRecAudio(audioUrl)
  };
useEffect(()=>{
  console.log(recaudio,'recaudiorecaudio')
},[recaudio])
  return (
    <div className="flex align-middle p-1  border-blue-600 "  id="audio">
      {recordings.map((recording:any, index:any) => (
        <div key={index} className="recording-item me-1 flex h-[50px] overflow-hidden shadow-gray-100 rounded-full ">
          <audio src={recording.audio.src} controls />
        </div>
      ))}
      <div className='h-10  flex '>
        {!value ? <AudioRecorder   onRecordingComplete={handleRecordComplete} recorderControls={recorderControls} showVisualizer={true} />:""}
        {recaudio?.length ? (
          <button onClick={() => props.onSaveClick()} className="h-10 w-10   ms-1 flex justify-evenly rounded-full shadow-md shadow-gray-100 items-center border bg-gray-300 text-black  w-30 hover:border hover:border-blue-400 hover:text-blue-500 " >
            <BsFillFloppyFill className='text-green-800'/>
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
