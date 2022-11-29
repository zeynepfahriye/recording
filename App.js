import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon  from 'react-native-vector-icons/FontAwesome'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

const audioRecorderPlayer = new AudioRecorderPlayer()
const App = () => {
  const [time,setTime] = useState('00:00:00')
  const [start,setStart] = useState(false)
  const [playTime,setPlayTime] = useState('00:00:00')
  const [playDuration,setPlayDuration] = useState('00:00:00')
  const [play,setPlay] = useState(false)
  const [url,setUrl] = useState('')
 const onStart = async ()=>{
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e)=>{
      setTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
      setStart(true)
    })
    console.log(result)
  }

  const onStop = async () => {
    const result = await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    setStart(false)
    setUrl({url:result})
  }
  const playRecord = async () => {
    const result = await audioRecorderPlayer.startPlayer()
    console.log(result)
    audioRecorderPlayer.addPlayBackListener((e)=>{
       if(e.currentPosition == e.duration) {
         audioRecorderPlayer.stopPlayer()
       }
      setPlay(true)
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
      setPlayDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
      
    })
  }
  const pauseRecord = async () => {
    setPlay(false)
    await audioRecorderPlayer.pausePlayer()
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=> {
          !start ? onStart() : onStop()
        }}>
          <Icon color={(!start ? 'black': 'red')} name={(!start ? 'microphone' : "microphone-slash")} size={50}/>
        </TouchableOpacity>
        <Text>{time}</Text>
        {
          url !== '' &&
          <View>
          <Text>{playTime}-{playDuration}</Text>
          <TouchableOpacity onPress={()=> {
            !play ? playRecord() : pauseRecord()
          }}>
          <Text>{!play ? 'Dinle' :'Durdur'}</Text>
          </TouchableOpacity>
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default App