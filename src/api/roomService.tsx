import axios from "axios";
import {API_URL} from "../env";



class RoomService{
    create(data:any){
        const http = axios.create({baseURL: API_URL});
        return http.post("rooms/", data).catch((error:any)=>{
            console.log(error);
            return false;
        })
    }

    retrieve(roomId:string){
        const http = axios.create({baseURL: API_URL});
        return http.get(`rooms/${roomId}/`).catch((error:any)=>{
            console.log(error);
            return false;
        })
    }
}

export const roomService = new RoomService();