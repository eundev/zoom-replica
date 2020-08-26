import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody, Label, Form, FormGroup, Input, Button} from "reactstrap";
import {CircularProgress} from "@material-ui/core";
import "./style.scss"
import Swal from "sweetalert2";
import { roomService } from '../../api/roomService';


const RoomCreationPage = (props:any) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        room_name: "My room name",
        //password: "",
    })


    const handleChange = (e: any )=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const createRoom = async () =>{
        setLoading(true);
        let created = await roomService.create(data);
        if(created){
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "¡Sala creada!",
                confirmButtonText: "Proceder a la sala",
            }).then((res: any)=>{
                if(res.value){
                    // @ts-ignore
                    props.history.push(`/rooms/${created.data.id}`)
                }
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear la sala"
            })
            setLoading(false);
        }
    }



    return <div className="room-creation-wrap">
        <Card className="room-creation-modal">
            <CardHeader>
                Opciones de la Sala
            </CardHeader>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label>
                            Room Name
                        </Label>
                        <Input type="text" name="room_name" onChange={handleChange}/>
                    </FormGroup>
                    {/*
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="text" name="password" onChange={handleChange}/>
                    </FormGroup>
                    */}
                  
                    {loading ? <div><CircularProgress /></div>:
                    <Button color="primary" style={{width: "100%", marginTop: 20}} onClick={()=>{
                        createRoom();
                    }}>
                        Create Room
                    </Button>
                }
                </Form>
            </CardBody>
        </Card>
    </div>
}

export default RoomCreationPage;