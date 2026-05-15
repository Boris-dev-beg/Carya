import Mongoose_connection from '@/src/lib/mongoDB';
import { userModel } from '@/src/models/User';
import { NextResponse } from 'next/server';

export const runtime = "nodejs";

// ! Route pour recuperer un utilisateur par son ID
export async function GET(
    req: Request,
  context: { params: Promise<{ id: string }> },
){
  const { id } = await context.params;
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

// ! Route pour recuperer un utilisateur par son ID
export async function POST(
    req: Request,
){
  const { ownerId } = await req.json();
    try{
        await Mongoose_connection()

        const user = await userModel.findById(ownerId)

        if(!user)
            return NextResponse.json({error: "User not found"}, {status: 500})

        return NextResponse.json({user}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }
}