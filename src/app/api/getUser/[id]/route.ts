import Mongoose_connection from '@/src/lib/mongoDB';
import { userModel } from '@/src/models/User';
import { NextResponse } from 'next/server';
export async function GET(
    req: Request,
    {params}:{params: {id: string}}
){
    const {id} = await params
    try{
        await Mongoose_connection()

        const user = await userModel.findById(id)

        if(!user)
            return NextResponse.json({error: "User not found"}, {status: 500})

        return NextResponse.json({user}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }
}