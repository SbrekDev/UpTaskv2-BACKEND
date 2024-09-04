import mongoose from "mongoose";
import colors from 'colors';
import { exit } from 'node:process';


export const connectDB = async ()=> {
    try {
        const connection = await mongoose.connect(process.env.DB_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.bgCyan(`Mongo db Conectado en ${url}`));
        
    } catch (error) {
        console.log(colors.bgRed('error al conectar a mogodb'));
        exit(1)
    }
}