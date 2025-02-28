// app/api/create-party/route.ts

import { neon } from "@neondatabase/serverless";
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);


export async function POST() {
    const data = await sql`INSERT INTO parties; VALUES ('test', 13)`;

}