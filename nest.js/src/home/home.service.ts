import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { randomThings } from './array';
@Injectable()
export class HomeService {
 
      r =  () => {
        return Math.floor(Math.random() * (79 + 1));
      }
      
    async getHome () {
        try {
            const {data} = await axios.get(`https://api.unsplash.com/search/photos?query=${randomThings[this.r()].split(' ')[1]}&client_id=${process.env.UNPLASH}`)
            return data.results
        } catch (error) {
            return error
        }
    }
}
