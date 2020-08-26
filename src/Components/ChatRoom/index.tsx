import React, { Fragment, useState, useEffect } from 'react'
import Jitsi from 'react-jitsi'
import {CircularProgress} from "@material-ui/core";
import "./style.scss";
import { CardHeader, CardBody, Form, Label, Card, FormGroup, Input, Button } from 'reactstrap';
import { roomService } from '../../api/roomService';



const ChatRoom = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [roomName, setRoomName] = useState("");
    const [showRoom, setShowRoom] = useState(false);
    const [roomId, setRoomId] = useState("");

    useEffect(()=>{
        const prefetch = async () =>{
            const fetched: any = await roomService.retrieve(props.match.params.id);
            if(fetched){
                setRoomName(fetched.data.room_name);
                setRoomId(fetched.data.id);
                setPassword(fetched.data.password);
                setLoading(false);
                console.log(fetched.data);
            }
            console.log(fetched.data);
        }

        prefetch();
    },[])


    return (
    
        showRoom ? ( /*@ts-ignore*/
            <Jitsi /*password={password}*/ roomName={roomId} displayName={displayName} config={{ prejoinPageEnabled: false }}
            />) : (<div className="room-options-wrap">
                {loading ? <CircularProgress /> : <Card className="room-options-card">
                    <CardHeader>
                        Información de la Sala
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>
                                    Room Name
                                </Label>
                                <Input type="text" disabled value={roomName}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Your Name
                                </Label>
                                <Input type="text" onChange={(e:any)=>{
                                    setDisplayName(e.target.value)
                                }}/>
                            </FormGroup>
                            <Button color="primary" style={{width: "100%", marginTop: 20}} onClick={(e:any)=>{
                                e.preventDefault();
                                setShowRoom(true);
                            }}>Enter Room</Button>
                        </Form>
                    </CardBody>
                </Card>}
               
            </div>)
  )
};

export default ChatRoom;